import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, 
  SafeAreaView, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';
import { supabase } from '../supabase'; // Import the Supabase client

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Fetch profile information
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError) console.error('Error fetching profile:', profileError);
            else setProfile(profileData);

            // Fetch stats in parallel
            const [postsCount, followersCount, followingCount] = await Promise.all([
                supabase.from('posts').select('id', { count: 'exact' }).eq('user_id', user.id),
                supabase.from('followers').select('*', { count: 'exact' }).eq('following_id', user.id),
                supabase.from('followers').select('*', { count: 'exact' }).eq('follower_id', user.id)
            ]);

            setStats({
                posts: postsCount.count || 0,
                followers: followersCount.count || 0,
                following: followingCount.count || 0,
            });
        }
        setLoading(false);
    };

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (!profile) {
        return <View style={styles.container}><Text>Could not load profile.</Text></View>
    }

    const avatarUrl = profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=4A90E2&color=fff&size=200`;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileHeaderBackground}>
                    <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileInfoContainer}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image source={{ uri: avatarUrl }} style={styles.profilePicture} />
                    </TouchableOpacity>
                    <Text style={styles.profileName}>{profile.full_name || 'No Name'}</Text>
                    <Text style={styles.profileEmail}>{profile.email}</Text>
                </View>
            </View>
            
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.statsContainer}>
                    <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
                        <Text style={styles.statNumber}>{stats.posts}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
                        <Text style={styles.statNumber}>{stats.followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
                        <Text style={styles.statNumber}>{stats.following}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </TouchableOpacity>
                </View>

                {/* Other sections like Spots and Gallery can be populated similarly */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>My Spots</Text>
                    {/* You can fetch and display user-specific spots here */}
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>My Gallery</Text>
                    {/* You can fetch and display user's gallery images here */}
                </View>

            </ScrollView>

            <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
    );
};

export default Profile;

// Add loader style and keep other styles from your original file
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    marginBottom: 20,
  },
  profileHeaderBackground: {
    height: 140,
    backgroundColor: '#7BC4E6',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    marginTop: -50,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: -45,
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10
  }
});