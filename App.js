import 'react-native-url-polyfill/auto'; // <-- ADD THIS LINE AT THE VERY TOP
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabase';

import Login from './Screen/Login';
import SignUpScreen from './Screen/SignUp';
import Main from './Screen/Main.js';
import Profile from './Screen/Profile.js';
import Messaging from './Screen/Messaging.js';
import MapScreen from './Screen/Map.js';
import SearchScreen from './Screen/Search.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
      // You can return a loading spinner here while the session is being checked
      return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          // User is signed in, show the main app screens
          <>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Messaging" component={Messaging} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
          </>
        ) : (
          // No user is signed in, show the auth screens
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
