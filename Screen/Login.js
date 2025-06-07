
import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigation.navigate('Main');
    } else {
      alert('Invalid credentials');
    }
  };

  const CustomCheckbox = ({ value, onValueChange }) => (
    <TouchableOpacity
      style={[
        styles.customCheckbox,
        value ? styles.checkboxChecked : styles.checkboxUnchecked
      ]}
      onPress={() => onValueChange(!value)}
    >
      {value && <Ionicons name="checkmark" size={14} color="black" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FFFFFF', '#E6F4FE', '#B3E0FF']}
        style={styles.container}
      >
        {/* Camping Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/840476824677933573-removebg-preview.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        {/* Login Header */}
        <Text style={styles.header}>Login</Text>
        
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        
        {/* Remember Me & Forgot Password Row */}
        <View style={styles.rememberRow}>
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              value={rememberMe}
              onValueChange={setRememberMe}
            />
            <Text style={styles.checkboxText}>Remembre Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or sign in with</Text>
          <View style={styles.line} />
        </View>
        
        {/* Sign Up Text */}
        <Text style={styles.signupPrompt}>
          Don't have an account? <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
        </Text>
        
        {/* Social Login Buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Login With Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={require('../assets/facebook.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Login With Facebook</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Background color is now handled by LinearGradient
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: -20,
    marginTop: -320,
  },
  image: {
    width: 280,
    height: 450,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -5,
    marginTop: -30,
    color: '#000',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkboxUnchecked: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkboxChecked: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#999',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  signupPrompt: {
    fontSize: 14,
    marginBottom: 15,
    color: '#333',
  },
  signupText: {
    fontWeight: 'bold',
    color: '#000',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  socialButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  }
});