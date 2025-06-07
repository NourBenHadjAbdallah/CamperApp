import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';

export default function SupabaseTest() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const runTest = async () => {
        setLoading(true);
        setResult(''); 
        
        const testEmail = `testuser+${Date.now()}@example.com`;
        const testPassword = 'password123';

        console.log(`--- Running Supabase Test ---`);
        console.log(`Attempting to sign up: ${testEmail}`);

        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
        });

        const response = { data, error };
        console.log('--- Supabase Raw Response ---');
        console.log(JSON.stringify(response, null, 2));
        
        if (error) {
            setResult(`Test Failed. Error: ${error.name} - ${error.message}`);
            Alert.alert('Test Failed', `Error: ${error.name} - ${error.message}`);
        } else {
            setResult('Test Succeeded! User was created successfully. Check your Supabase dashboard.');
            Alert.alert('Test Succeeded!', 'User was created successfully. Check the Users table in your Supabase dashboard.');
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Supabase Connection Test</Text>
            <TouchableOpacity style={styles.button} onPress={runTest} disabled={loading}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Run Sign-Up Test</Text>}
            </TouchableOpacity>
            <Text style={styles.resultLabel}>Result:</Text>
            <Text style={styles.resultText}>{result}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    resultText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
