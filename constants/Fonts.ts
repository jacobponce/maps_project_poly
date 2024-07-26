import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    'NunitoSans': require('../assets/fonts/NunitoSans.ttf'),
    // Add other fonts here if needed
  });

  return fontsLoaded;
};