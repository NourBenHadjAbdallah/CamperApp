import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet, View, SafeAreaView, StatusBar, Platform,
    ActivityIndicator, Animated, PanResponder, Dimensions, Alert, TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import NavBar from '../Components/navBar';
import SearchBar from '../Components/SearchBar';
import DetailSlide from '../Components/DetailSlide'; 
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_VISIBLE_HEIGHT = SCREEN_HEIGHT * 0.7;
const PANEL_SNAP_THRESHOLD = SCREEN_HEIGHT * 0.1;

// --- Main Map Screen Component ---
export default function MapScreen() {
    const [activeTab, setActiveTab] = useState('Map');
    const [searchQuery, setSearchQuery] = useState('');
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const mapRef = useRef(null);
    const pan = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const slideUp = () => {
        Animated.timing(pan, { toValue: SCREEN_HEIGHT - PANEL_VISIBLE_HEIGHT, duration: 300, useNativeDriver: true }).start();
    };

    const slideDown = useCallback(() => {
        Animated.timing(pan, { toValue: SCREEN_HEIGHT, duration: 300, useNativeDriver: true }).start(() => {
            setSelectedSpot(null);
        });
    }, [pan]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => pan.setOffset(pan._value),
            onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gesture) => {
                pan.flattenOffset();
                if (gesture.dy > PANEL_SNAP_THRESHOLD) {
                    slideDown();
                } else {
                    slideUp();
                }
            },
        })
    ).current;

    useEffect(() => {
        const fetchSpotsForMap = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('spots').select('id, name, latitude, longitude, rating, description, images');
            if (error) console.error('Error fetching spots for map:', error);
            else setSpots(data);
            setLoading(false);
        };
        fetchSpotsForMap();
    }, []);

    const handleMarkerPress = (spot) => {
        setSelectedSpot(spot);
        slideUp();
        if(mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: spot.latitude,
                longitude: spot.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 500);
        }
    };

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access location was denied.');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setUserLocation(coords);

        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...coords,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{ latitude: 34.8869, longitude: 9.5375, latitudeDelta: 5, longitudeDelta: 5 }}
                onPress={slideDown}
            >
                {spots.map(spot => (
                    <Marker
                        key={spot.id}
                        coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                        title={spot.name}
                        onPress={() => handleMarkerPress(spot)}
                    />
                ))}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="Your Location"
                        pinColor="blue"
                    />
                )}
            </MapView>

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search for spots..."
                style={styles.searchBarPosition} 
            />
            
            <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
                <Ionicons name="location-outline" size={32} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={[styles.panelContainer, { transform: [{ translateY: pan }] }]}>
                <DetailSlide spot={selectedSpot} panHandlers={panResponder.panHandlers}/>
            </Animated.View>

            <View style={styles.navBarContainer}>
                <NavBar activeTab={activeTab} onTabPress={(tab) => {}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    map: { ...StyleSheet.absoluteFillObject },
    searchBarPosition: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50, 
        left: 15,
        right: 15,
        borderRadius: 50,
    },
    locationButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 85 : 130,
        right: 15,
        backgroundColor: '#4A90E2',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    navBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: PANEL_VISIBLE_HEIGHT,
    },
});
