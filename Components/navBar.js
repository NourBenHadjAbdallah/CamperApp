import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => handleTabPress('Main')}
      >
        <Ionicons 
          name="home-outline" 
          size={24} 
          color={activeTab === 'Main' ? "#4A90E2" : "#888"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleTabPress('Map')}
      >
        <Ionicons 
          name="map-outline" 
          size={24} 
          color={activeTab === 'Map' ? "#4A90E2" : "#888"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleTabPress('Search')}
      >
        <Ionicons 
          name="search-outline" 
          size={24} 
          color={activeTab === 'Search' ? "#4A90E2" : "#888"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleTabPress('Messaging')}
      >
        <Ionicons 
          name="chatbubble-outline" 
          size={24} 
          color={activeTab === 'Chat' ? "#4A90E2" : "#888"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleTabPress('Profile')}
      >
        <Ionicons 
          name="person-outline" 
          size={24} 
          color={activeTab === 'Profile' ? "#4A90E2" : "#888"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavBar;
