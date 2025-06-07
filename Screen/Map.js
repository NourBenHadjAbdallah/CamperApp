import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    StatusBar,
    Platform,
    ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NavBar from '../Components/navBar';
import SearchBar from '../Components/SearchBar';
import { supabase } from '../supabase'; // Import the supabase client

export default function MapScreen() {
    const [activeTab, setActiveTab] = useState('Map');
    const [searchQuery, setSearchQuery] = useState('');
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpotsForMap = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('spots')
                .select('id, name, latitude, longitude, rating');
            
            if (error) {
                console.error('Error fetching spots for map:', error);
            } else {
                setSpots(data);
            }
            setLoading(false);
        };
        fetchSpotsForMap();
    }, []);

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
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
                    {spots.map(spot => (
                        <Marker
                            key={spot.id}
                            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                            title={spot.name}
                            description={spot.rating ? `Rating: ${spot.rating}` : ''}
                        />
                    ))}
                </MapView>
            )}

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
    container: { flex: 1 },
    map: { ...StyleSheet.absoluteFillObject },
    loader: { flex: 1, justifyContent: 'center' },
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