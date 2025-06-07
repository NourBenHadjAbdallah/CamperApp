
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxesgiieplqugqvaxdap.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXNnaWllcGxxdWdxdmF4ZGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzY2OTEsImV4cCI6MjA2MzE1MjY5MX0.HO3ItiDZCIDFpHTY316xvJd_eZo9b3lE9mJsszXE5fI'; // Make sure this is correct

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for now
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
