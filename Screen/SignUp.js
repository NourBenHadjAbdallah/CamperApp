import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../supabase'; // Import the Supabase client

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle user sign-up
  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName, 
        }
      }
    });
    
    // This log helps debug any server-side issues
    console.log('Supabase SignUp Response:', JSON.stringify({ data, error }, null, 2));

    if (error) {
      const errorMessage = error.message.includes('Network request failed') || error.name === 'AuthUnknownError'
        ? 'Could not connect to the server. Please check your internet connection and try again.'
        : error.message;
      Alert.alert('Sign Up Error', errorMessage);
    } else if (data.user && !data.session) {
      // This is the expected successful outcome when email confirmation is enabled
      Alert.alert('Success!', 'Please check your email for a confirmation link to complete your registration.');
      navigation.navigate('Login');
    } else {
        // Fallback for unexpected success states or if email confirmation is disabled
        navigation.navigate('Main');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FFFFFF', '#E6F4FE', '#B3E0FF']}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/840476824677933573-removebg-preview.png')} 
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.header}>Sign Up</Text>
            </View>
            
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon}/>
              <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon}/>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon}/>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.signUpButtonText}>Sign Up</Text>}
            </TouchableOpacity>
            
            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or sign in with</Text>
              <View style={styles.line} />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../assets/google.png')} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Login With Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Login With Facebook</Text>
            </TouchableOpacity>

             {/* Login Prompt */}
            <Text style={styles.loginPrompt}>
              Already have an account? <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>Log In</Text>
            </Text>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 180,
    alignSelf: 'flex-start',
    marginLeft: -20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    right: 20,
    top: 60,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#999' },
  orText: { marginHorizontal: 10, color: '#666' },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialIcon: { width: 24, height: 24, marginRight: 15 },
  socialButtonText: { fontWeight: '600', fontSize: 16, color: '#000' },
  loginPrompt: { fontSize: 14, color: '#333', marginTop: 15 },
  loginText: { fontWeight: 'bold', color: '#000' },
});
