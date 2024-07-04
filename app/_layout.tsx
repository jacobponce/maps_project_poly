import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
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
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
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