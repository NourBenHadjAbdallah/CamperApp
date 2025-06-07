import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../Components/SearchBar';
import NavBar from '../Components/navBar';

// Sample data for demonstration
const recentSearches = ['Cap Angela', 'Oued El Ksab', 'Hammamet', 'Camping gear'];
const suggestedTopics = ['Beach camping', 'Forest trails', 'Family friendly', 'Hot deals'];

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState('Search');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const Section = ({ title, items }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Ionicons name="time-outline" size={20} color="#888" style={styles.itemIcon} />
          <Text style={styles.itemText}>{item}</Text>
          <Ionicons name="arrow-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header and Search Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for spots or articles..."
        />
      </View>
      
      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="Recent Searches" items={recentSearches} />
        <Section title="Suggestions" items={suggestedTopics} />
      </ScrollView>

      {/* Bottom Navigation */}
      <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});