import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false,}} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false,}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}