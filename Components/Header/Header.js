import React from "react";
import { View, Text, StyleSheet } from "react-native";

const s = StyleSheet.create({
    HeaderView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: '4%'
    },
    TextView: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    }
});

function Header({ title }) {
    return (
        <View style={s.HeaderView}>
            <Text style={s.TextView}>{title}</Text>
        </View>
    );
}

export default Header;