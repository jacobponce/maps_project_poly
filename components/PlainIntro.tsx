import React from 'react';
import { View, Text } from 'react-native';

const PlainIntro: React.FC = () => {
    return (
        <View style={{flex:1}}>
            <Text>Welcome to My Page</Text>
            <Text>This is a nice-looking page created with TypeScript and React.</Text>
        </View>
    );
};

export default PlainIntro;