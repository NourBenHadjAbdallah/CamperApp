import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';

const { width } = Dimensions.get('window');



const Profile = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const handleTabPress = (tabName) => {
        setActiveTab(tabName);};

    const [userStats, setUserStats] = useState({
        name: "Nour Ben Hadj Abdallah",
        email: "nourbenhadjabdallah@gmail.com",
        pic: "",
        posts: 54,
        followers: 120,
        following: 235,
        level: 50,
        rank: "Platinum Rank"
    });


  return (
    <SafeAreaView style={styles.container}>
      {/* Header with settings icon */}
      <View style={styles.header}>
        <View style={styles.profileHeaderBackground}>
          {/* Settings icon */}
          <TouchableOpacity 
            style={styles.settingsButton}

            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Profile info section */}
        <View style={styles.profileInfoContainer}>
          {/* Profile picture */}
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://ui-avatars.com/api/?name=Nour+Ben+Hadj+Abdallah&background=4A90E2&color=fff&size=200' }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          
          {/* Name and email */}
          <Text style={styles.profileName}>{userStats.name}</Text>
          <Text style={styles.profileEmail}>{userStats.email}</Text>
          

          

        </View>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
                {/* Trophy section */}
          <TouchableOpacity 
            style={styles.trophyContainer}
            onPress={() => Alert.alert("Rank Info", `You are currently ${userStats.rank} at Level ${userStats.level}!`)}
            activeOpacity={0.8}
          >
            <View style={styles.trophyIconContainer}>
              <Ionicons name="trophy" size={30} color="#fff" style={styles.trophyIcon} />
            </View>
            <Text style={styles.rankText}>{userStats.rank}</Text>
            <Text style={styles.levelText}>Level {userStats.level}</Text>
          </TouchableOpacity>
          
          {/* Stats section */}
          <View style={styles.statsContainer}>
            <TouchableOpacity 
              style={styles.statItem}
              activeOpacity={0.7}
            >
              <Text style={styles.statNumber}>{userStats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statItem}

              activeOpacity={0.7}
            >
              <Text style={styles.statNumber}>{userStats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statItem}

              activeOpacity={0.7}
            >
              <Text style={styles.statNumber}>{userStats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

        {/* Spots section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spots</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.mapContainer}
            activeOpacity={0.8}
          >
            <View style={styles.mapPlaceholder}>

              
              {/* Add a subtle grid pattern */}
              <View style={styles.mapGrid} />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Gallery section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://picsum.photos/400/200?random=1' }}
              style={styles.galleryImage}
            />
          </TouchableOpacity>
          
          {/* Additional gallery images */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.galleryScrollView}
          >
            {[2, 3, 4, 5].map((num) => (
              <TouchableOpacity 
                key={num}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: `https://picsum.photos/120/120?random=${num}` }}
                  style={styles.galleryThumbnail}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Add some bottom padding for better scrolling */}
        <View style={styles.bottomPadding} />
      </ScrollView>

        {/* Bottom Navigation */}
      <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
  },
  profileHeaderBackground: {
    height: 140,
    backgroundColor: '#7BC4E6',
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    marginTop: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
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
  trophyContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  trophyIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#4A90E2',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  trophyIcon: {
    textAlign: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  levelText: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 30,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
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
  achievementsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    width: '90%',
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  achievementsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  mapContainer: {
    height: 180,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d6e8f5',
    position: 'relative',
  },
  mapMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  mapGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
    backgroundColor: 'transparent',
  },
  galleryImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  galleryScrollView: {
    marginTop: 15,
  },
  galleryThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  bottomPadding: {
    height: 20,
  },
});

export default Profile;