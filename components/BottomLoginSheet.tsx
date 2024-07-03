import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {defaultStyles} from '@/constants/Styles';
const BottomLoginSheet = () => {
    return (
        <View style={[styles.container]}>
        <Text>BottomLoginSheet</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#154734',
    },
});

export default BottomLoginSheet;