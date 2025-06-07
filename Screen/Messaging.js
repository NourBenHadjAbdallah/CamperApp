import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';
import { supabase } from '../supabase'; // Import the Supabase client
import SearchBar from '../Components/SearchBar';

// Avatar component remains the same
const ContactAvatar = ({ initials, size = 60 }) => (
    <View style={[styles.avatar, { width: size, height: size }]}>
        <Text style={[styles.avatarText, { fontSize: size * 0.25 }]}>{initials}</Text>
    </View>
);

// MessageItem now uses data from the database
const MessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
        <ContactAvatar initials={item.channel_name ? item.channel_name.substring(0, 2).toUpperCase() : '??'} size={50} />
        <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
                <Text style={styles.contactName}>{item.channel_name || 'Unknown Channel'}</Text>
                <Text style={styles.messageTime}>{new Date(item.last_message_time).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.messageBottom}>
                <Text style={styles.messageText} numberOfLines={1}>
                    {item.last_message_content || 'No messages yet'}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const Messaging = () => {
    const [activeTab, setActiveTab] = useState('Messaging');
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch initial channel data
        fetchChannels();

        // Set up a real-time subscription to the messages table
        const subscription = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    console.log('New message received!', payload.new);
                    // When a new message comes in, re-fetch channels to update the "last message"
                    fetchChannels();
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchChannels = async () => {
        // Get the current logged-in user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch all channels that the user is a participant in, along with the last message for each.
        // NOTE: This query can be complex. A database function (RPC) is often best for this in production.
        const { data, error } = await supabase.rpc('get_user_channels_with_last_message', { p_user_id: user.id });

        if (error) {
            console.error('Error fetching channels:', error);
        } else {
            setChannels(data);
        }
        setLoading(false);
    };
    
    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity>
                    <Ionicons name="create-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search messages..."
              style={styles.searchBar}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>All messages</Text>
                    {channels.map((channel) => (
                        <MessageItem key={channel.channel_id} item={channel} />
                    ))}
                </View>
            </ScrollView>

            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
    );
};

export default Messaging;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 28, fontWeight: 'bold' },
    searchBar: { marginHorizontal: 20, marginBottom: 10 },
    content: { flex: 1, paddingHorizontal: 20 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#000', marginBottom: 15 },
    messageItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    messageContent: { flex: 1, marginLeft: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 12 },
    messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    contactName: { fontSize: 16, fontWeight: '500' },
    messageTime: { fontSize: 12, color: '#999' },
    messageBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    messageText: { fontSize: 14, color: '#666', flex: 1 },
    avatar: { backgroundColor: '#ddd', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#666', fontWeight: '500' },
});