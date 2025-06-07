import {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../Components/navBar';

const Messaging = () => {
      const [activeTab, setActiveTab] = useState('Messaging');
    
    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
      };
  const onlineContacts = [
    { id: 1, name: 'Samer Mange', initials: 'SM' },
    { id: 2, name: 'Ahmed', initials: 'A' },
    { id: 3, name: 'Melek Hamdi', initials: 'MH' },
    { id: 4, name: 'Samer Gallas', initials: 'SG' },
  ];

  const pinnedMessages = [
    {
      id: 1,
      type: 'group',
      name: 'Group Camper',
      message: 'Ahmed: Win chtet9blou?',
      time: '1h',
      initials: 'GC',
    },
    {
      id: 2,
      name: 'Unknown',
      message: 'Win el mara hethi ?',
      time: '1h',
      initials: 'U',
    },
  ];

  const allMessages = [
    {
      id: 1,
      name: 'Ahmed',
      message: 'Od5ol lel group',
      time: '2h',
      initials: 'A',
      hasNotification: true,
    },
    {
      id: 2,
      name: 'Melek Hamdi',
      message: 'Nsitou',
      time: '8h',
      initials: 'MH',
    },
    {
      id: 3,
      name: 'Achraf',
      message: 'Ma8ir matjibou m3ek 3ana',
      time: '8h',
      initials: 'A',
    },
    {
      id: 4,
      name: 'Samer Gallas',
      message: 'Rak7ou omourkom',
      time: '1d',
      initials: 'SG',
    },
    {
      id: 5,
      name: 'Iheb',
      message: '',
      time: '1d',
      initials: 'I',
    },
  ];

  const ContactAvatar = ({ initials, isOnline = false, size = 60 }) => (
    <View style={[styles.avatar, { width: size, height: size }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.25 }]}>
        {initials}
      </Text>
      {isOnline && <View style={styles.onlineIndicator} />}
    </View>
  );

  const MessageItem = ({ item, showReadIndicator = false }) => (
    <TouchableOpacity style={styles.messageItem}>
      <ContactAvatar initials={item.initials} size={50} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <View style={styles.messageBottom}>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.message}
          </Text>
          {showReadIndicator && (
            <View style={styles.readIndicators}>
              <Ionicons name="checkmark" size={16} color="#4CAF50" />
              <Ionicons name="checkmark" size={16} color="#4CAF50" style={{ marginLeft: -8 }} />
            </View>
          )}
          {item.hasNotification && <View style={styles.notificationDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nour Ben Hadj Abdallah</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find things to do"
            placeholderTextColor="#999"
          />
        </View>

        {/* Online Contacts */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.onlineContactsContainer}
        >
          {onlineContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.onlineContact}>
              <ContactAvatar initials={contact.initials} isOnline={true} />
              <Text style={styles.onlineContactName}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pinned Messages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pinned messages (2)</Text>
          {pinnedMessages.map((message) => (
            <MessageItem key={message.id} item={message} showReadIndicator={true} />
          ))}
        </View>

        {/* All Messages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All messages (16)</Text>
          {allMessages.map((message) => (
            <MessageItem key={message.id} item={message} showReadIndicator={true} />
          ))}
        </View>
      </ScrollView>

                    {/* Bottom Navigation */}
        <NavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  onlineContactsContainer: {
    marginBottom: 30,
  },
  onlineContact: {
    alignItems: 'center',
    marginRight: 20,
  },
  onlineContactName: {
    fontSize: 12,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#666',
    fontWeight: '500',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  messageContent: {
    flex: 1,
    marginLeft: 15,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  messageBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  readIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Messaging;