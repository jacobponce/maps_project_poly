import PlainIntro from "@/components/PlainIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <SafeAreaView 
            style={{
                flex: 1,
            }}
            >
            <PlainIntro />
            <BottomLoginSheet />
        </SafeAreaView>
    );
}