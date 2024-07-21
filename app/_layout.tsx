import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { useRouter, Stack } from 'expo-router';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (authUser => {
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
      <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
    </Stack>
  )
};
export default App;