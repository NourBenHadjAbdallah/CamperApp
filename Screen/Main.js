import { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  TextInput, StyleSheet, ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';

// Sample data for camping spots (include image reference)
const popularSpots = [
  {
    id: '1',
    name: 'Cap Angela',
    rating: 4.1,
    image: require('../assets/camping.png'),
  },
  {
    id: '2',
    name: 'Galite',
    rating: 4.1,
    image: require('../assets/camping.png'),
  },
];

const recommendedSpots = [
  {
    id: '3',
    name: 'Hammam Ghezeze',
    isHotDeal: true,
    image: require('../assets/camping.png'),
  },
  {
    id: '4',
    name: 'Oued El Ksab',
    isHotDeal: true,
    image: require('../assets/camping.png'),
  },
];

// CampingSpotCard Component
const CampingSpotCard = ({ spot, size = 'large' }) => {
  const isRecommended = 'isHotDeal' in spot;

  return (
    <TouchableOpacity
      style={[
        styles.campingCard,
        size === 'small' && styles.campingCardSmall,
      ]}
    >
      <Image
        style={styles.cardImage}
        resizeMode="cover"
        source={spot.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{spot.name}</Text>

        {!isRecommended && (
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{spot.rating}</Text>
          </View>
        )}

        {isRecommended && (
          <View style={styles.hotDealContainer}>
            <MaterialIcons name="local-fire-department" size={16} color="#FF6347" />
            <Text style={styles.hotDealText}>Hot Deal</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const Main = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Main');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Camping spots</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search camping spots"
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <Image
            style={styles.mapImage}
            resizeMode="cover"
            source={require('../assets/camping.png')}
          />
        </View>

        {/* Popular Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popularSpots.map(spot => (
              <CampingSpotCard key={spot.id} spot={spot} />
            ))}
          </ScrollView>
        </View>

        {/* Recommended Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
          </View>

          <View style={styles.recommendedGrid}>
            {recommendedSpots.map(spot => (
              <CampingSpotCard key={spot.id} spot={spot} size="small" />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

export default Main;

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  mapContainer: {
    height: 180,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
  },
  horizontalScroll: {
    paddingBottom: 8,
  },
  campingCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  campingCardSmall: {
    width: '48%',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#444',
  },
  hotDealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotDealText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FF6347',
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
