import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './login';
import TabLayout from './(tabs)/_layout';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Index from './index';
import { useRouter, Stack } from 'expo-router';

// const Stack = createNativeStackNavigator();
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (authUser => {
      console.log('user', authUser),
      setUser(authUser);}));
  }, []);
  
  useEffect(() => {
    if (router && user !== undefined) {
      if (user) {
        console.log("Navigating to tabs...");
      router.replace('/(tabs)');
      } else {
        console.log("Navigating to login...");
        router.replace('/');
      }
    }
  }, [user, router]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
  )

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <NavigationContainer independent={true}>
  //       <Stack.Navigator initialRouteName='index'>
  //         {user ? <Stack.Screen name="tabs" component={InsideLayout} options={{ headerShown: false }} /> : <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />}
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </GestureHandlerRootView>
  // );
};
export default App;