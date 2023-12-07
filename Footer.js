import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomePage from './HomePage';
import ContactPage from './ContactPage';

const Footer = ({ selectedPage, handlePageSelect }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <IconTab
                iconName="address-book"
                text="Contato"
                selected={selectedPage === 'contact'}
                onPress={() => {
                    handlePageSelect('contact');
                    navigation.navigate('ContactPage'); // Navigate to the Contact screen
                }}
            />
            <IconTab
                iconName="home"
                text="Home"
                selected={selectedPage === 'home'}
                onPress={() => {
                    handlePageSelect('home');
                    navigation.navigate('HomePage'); // Navigate to the Home screen
                }}
            />
        </View>
    );
};

const IconTab = ({ iconName, text, selected, onPress }) => (
    <TouchableOpacity
        style={[styles.iconContainer, selected && styles.selectedIcon]}
        onPress={onPress}
    >
        <FontAwesome5 name={iconName} size={24} color={selected ? 'black' : 'white'} />
        <Text style={[styles.iconText, selected && { color: 'black' }]}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'orange',
    },
    iconContainer: {
        alignItems: 'center',
    },
    selectedIcon: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    iconText: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
});

export default Footer;
