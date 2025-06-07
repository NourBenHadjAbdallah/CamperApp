import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    StatusBar,
    Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NavBar from '../Components/navBar';
import SearchBar from '../Components/SearchBar'; // Import the new component

// Sample data for camping spots (remains the same)
const popularSpots = [
    { id: '1', name: 'Cap Angela', rating: 4.1, coordinate: { latitude: 37.3496, longitude: 9.8536 } },
    { id: '2', name: 'Galite', rating: 4.1, coordinate: { latitude: 37.5255, longitude: 8.9406 } },
];
const recommendedSpots = [
    { id: '3', name: 'Hammam Ghezeze', isHotDeal: true, coordinate: { latitude: 37.1069, longitude: 11.1114 } },
    { id: '4', name: 'Oued El Ksab', isHotDeal: true, coordinate: { latitude: 36.8322, longitude: 11.0521 } },
];
const allSpots = [...popularSpots, ...recommendedSpots];

export default function MapScreen() {
    const [activeTab, setActiveTab] = useState('Map');
    const [searchQuery, setSearchQuery] = useState('');

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 34.8869,
                    longitude: 9.5375,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}
            >
                {allSpots.map(spot => (
                    <Marker
                        key={spot.id}
                        coordinate={spot.coordinate}
                        title={spot.name}
                        description={spot.rating ? `Rating: ${spot.rating}` : 'Hot Deal!'}
                    />
                ))}
            </MapView>

            {/* Use the reusable SearchBar component */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search for spots..."
                style={styles.searchBarPosition} 
            />
            
            <View style={styles.navBarContainer}>
                <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    // Style to position the SearchBar on this specific screen
    searchBarPosition: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50, 
        left: 20,
        right: 20,
    },
    navBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});