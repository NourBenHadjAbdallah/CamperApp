import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screen/Login';
import Main from './Screen/Main.js';
import Profile from './Screen/Profile.js';
import Messaging from './Screen/Messaging.js';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        
        <Stack.Screen name="Messaging" component={Messaging} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
