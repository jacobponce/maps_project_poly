import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';  
import Ionicons from '@expo/vector-icons/Ionicons';

const BackButton = ({ onPress, iconName="chevron-back", iconSize=24, iconColor=Colors.primary }: 
    { onPress: () => void, iconName?: string, iconSize?: number, iconColor?: string }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName as "chevron-back"} size={iconSize} style={[{ marginBottom: -3 }]}/>
      </TouchableOpacity>
    );
  };

  export default BackButton;