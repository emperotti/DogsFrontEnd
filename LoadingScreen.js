import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="orange" />
            <FontAwesome name="paw" size={50} style={styles.pawIcon} color="orange" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pawIcon: {
        marginTop: 20,
    },
});

export default LoadingScreen;
