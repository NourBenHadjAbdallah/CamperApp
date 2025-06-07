import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Alert } from 'react-native';

// Read the secure variables from the .env file
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// --- DEBUGGING CHECK ---
// This will immediately tell us if the .env file is not being loaded.
console.log('Supabase URL Loaded:', supabaseUrl ? 'YES' : 'NO');
console.log('Supabase Key Loaded:', supabaseAnonKey ? 'YES' : 'NO');

if (!supabaseUrl || !supabaseAnonKey) {
  Alert.alert(
    'Error: Missing Supabase Credentials',
    'Could not read the Supabase URL or Key from the .env file. Please make sure the file exists and is named correctly, and that you have restarted the Expo server.'
  );
}
// --------------------

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
