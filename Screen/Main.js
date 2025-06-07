import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView, StatusBar, ActivityIndicator
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';
import SearchBar from '../Components/SearchBar';
import { supabase } from '../supabase'; // Import the supabase client

// CampingSpotCard Component remains the same...
const CampingSpotCard = ({ spot, size = 'large' }) => {
    const isRecommended = spot.is_hot_deal; // Use the column name from your database
    const imageUrl = spot.image_url || 'https://placehold.co/600x400/EEE/31343C?text=Spot%20Image';

    return (
        <TouchableOpacity style={[styles.campingCard, size === 'small' && styles.campingCardSmall]}>
            <Image style={styles.cardImage} resizeMode="cover" source={{ uri: imageUrl }} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{spot.name}</Text>
                {!isRecommended ? (
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{spot.rating}</Text>
                    </View>
                ) : (
                    <View style={styles.hotDealContainer}>
                        <MaterialIcons name="local-fire-department" size={16} color="#FF6347" />
                        <Text style={styles.hotDealText}>Hot Deal</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const Main = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Main');
  const [popularSpots, setPopularSpots] = useState([]);
  const [recommendedSpots, setRecommendedSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      // Fetch popular spots
      const { data: popularData, error: popularError } = await supabase
        .from('spots')
        .select('*')
        .eq('is_popular', true)
        .limit(5);

      // Fetch recommended (hot deal) spots
      const { data: recommendedData, error: recommendedError } = await supabase
        .from('spots')
        .select('*')
        .eq('is_hot_deal', true)
        .limit(4);

      if (popularError || recommendedError) {
        console.error(popularError || recommendedError);
      } else {
        setPopularSpots(popularData);
        setRecommendedSpots(recommendedData);
      }
      setLoading(false);
    };

    fetchSpots();
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };
  
  if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: 'center'}}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
          <View>
              <Text style={styles.headerTitle}>Explore</Text>
              <Text style={styles.headerSubtitle}>Camping spots</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
      </View>

      <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search camping spots"
          style={{ marginHorizontal: 20, marginBottom: 10}}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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

      <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

export default Main;

// Styles (many are similar to before, ensure they match your design)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 28, fontWeight: 'bold' },
    headerSubtitle: { fontSize: 16, color: '#888' },
    notificationButton: { padding: 8 },
    sectionContainer: { marginBottom: 24, paddingHorizontal: 20 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 20, fontWeight: '600' },
    seeAllText: { fontSize: 14, color: '#3498db' },
    horizontalScroll: { paddingBottom: 8 },
    campingCard: { width: 180, marginRight: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f8f8f8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 2 },
    campingCardSmall: { width: '48%', marginBottom: 16 },
    cardImage: { width: '100%', height: 120 },
    cardContent: { padding: 12 },
    cardTitle: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center' },
    ratingText: { marginLeft: 5, fontSize: 14, color: '#444' },
    hotDealContainer: { flexDirection: 'row', alignItems: 'center' },
    hotDealText: { marginLeft: 5, fontSize: 14, color: '#FF6347', fontWeight: '600' },
    recommendedGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});