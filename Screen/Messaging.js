import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';
import { supabase } from '../supabase';
import SearchBar from '../Components/SearchBar';

// Avatar component
const ContactAvatar = ({ initials, size = 60 }) => (
    <View style={[styles.avatar, { width: size, height: size }]}>
        <Text style={[styles.avatarText, { fontSize: size * 0.25 }]}>{initials}</Text>
    </View>
);

// MessageItem component
const MessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
        <ContactAvatar initials={item.channel_name ? item.channel_name.substring(0, 2).toUpperCase() : '??'} size={50} />
        <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
                <Text style={styles.contactName}>{item.channel_name || 'Unknown Channel'}</Text>
                {item.last_message_time && (
                    <Text style={styles.messageTime}>{new Date(item.last_message_time).toLocaleTimeString()}</Text>
                )}
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
    const channelsListener = useRef(null); // Use a ref to hold the listener

    useEffect(() => {
        // Fetch initial data on mount
        fetchChannels();

        // --- FIX FOR MULTIPLE SUBSCRIPTIONS ---
        // Ensure we only subscribe once
        if (!channelsListener.current) {
            channelsListener.current = supabase
                .channel('public:messages')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'messages' },
                    () => {
                        console.log('New message detected, refetching channels...');
                        fetchChannels();
                    }
                )
                .subscribe();
        }

        // Cleanup on unmount
        return () => {
            if (channelsListener.current) {
                supabase.removeChannel(channelsListener.current);
                channelsListener.current = null;
            }
        };
    }, []);

    const fetchChannels = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

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

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
        }
        if (channels.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="chatbubbles-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>No conversations yet</Text>
                    <Text style={styles.emptySubText}>Start a new chat to see it here.</Text>
                </View>
            );
        }
        return (
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>All messages</Text>
                    {channels.map((channel) => (
                        <MessageItem key={channel.channel_id} item={channel} />
                    ))}
                </View>
            </ScrollView>
        );
    };

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

            {renderContent()}

            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
    );
};

export default Messaging;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#888',
        marginTop: 16,
    },
    emptySubText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 8,
        textAlign: 'center',
    },
});
