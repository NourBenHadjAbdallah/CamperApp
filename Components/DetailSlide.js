import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NAV_BAR_HEIGHT = 60; // Estimated height of the NavBar

// --- Mock Data for Reviews (Can be replaced with a real API call) ---
const mockReviews = [
    { id: 1, user: { name: 'Nour Ben Hadj Abdallah', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }, rating: 5, comment: 'Absolutely stunning views and very peaceful. Highly recommend!', created_at: '2 weeks ago' },
    { id: 2, user: { name: 'Samer Mange', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' }, rating: 4, comment: 'Great spot, but can get a bit crowded on weekends. The water is crystal clear.', created_at: '1 month ago' },
];

const DetailSlide = ({ spot, panHandlers }) => {
    if (!spot) {
        return null;
    }

    const images = spot.images || [];

    return (
        <View style={styles.panelDraggableContainer}>
            <View style={styles.panelHeader} {...panHandlers}>
                <View style={styles.panelHandle} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.panelContent, { paddingBottom: NAV_BAR_HEIGHT + 20 }]}
            >
                <View style={styles.spotTitleContainer}>
                    <Text style={styles.spotName}>{spot.name}</Text>
                    <TouchableOpacity>
                        <Ionicons name="share-social-outline" size={24} color="#555" />
                    </TouchableOpacity>
                </View>

                <View style={styles.spotMetaContainer}>
                    <Ionicons name="location-sharp" size={16} color="#888" />
                    <Text style={styles.spotLocation}>Nabeul, Tunisie</Text>
                </View>
                <View style={styles.spotMetaContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.spotRating}>{spot.rating} ({spot.reviews_count || 355} Reviews)</Text>
                </View>

                <Text style={styles.spotDescription}>{spot.description || 'No description available.'}</Text>
                
                {images.length > 0 && (
                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                        {images.map((img, index) => (
                            <Image key={index} source={{ uri: img }} style={styles.spotImage} />
                        ))}
                     </ScrollView>
                )}
                
                <View style={styles.separator} />

                <Text style={styles.sectionTitle}>Rate and review</Text>
                {/* Rating component would go here */}

                <View style={styles.separator} />

                <View style={styles.reviewHeader}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    <TouchableOpacity>
                        <Text style={styles.addReviewText}>Add a review</Text>
                    </TouchableOpacity>
                </View>

                {mockReviews.map(review => (
                    <View key={review.id} style={styles.reviewContainer}>
                        <Image source={{uri: review.user.avatar}} style={styles.reviewAvatar} />
                        <View style={styles.reviewTextContainer}>
                            <View style={styles.reviewUserHeader}>
                                <Text style={styles.reviewUserName}>{review.user.name}</Text>
                                <Text style={styles.reviewDate}>{review.created_at}</Text>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    panelDraggableContainer: {
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    panelHeader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panelHandle: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#ccc',
    },
    panelContent: {
        paddingHorizontal: 20,
    },
    spotTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    spotName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    spotMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    spotLocation: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    spotRating: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    spotDescription: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginTop: 16,
        marginBottom: 16,
    },
    imageScroll: {
        marginBottom: 16,
    },
    spotImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addReviewText: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '600',
    },
    reviewContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    reviewTextContainer: {
        flex: 1,
    },
    reviewUserHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewUserName: {
        fontWeight: 'bold',
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
    },
    reviewComment: {
        marginTop: 4,
        color: '#333',
    },
});

export default DetailSlide;
