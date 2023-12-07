import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

import Footer from './Footer';

const ContactPage = () => {
    const [selectedPage, setSelectedPage] = useState('contact');
    const phoneNumber1 = '553173150017'; // Número de telefone para o primeiro contato no formato internacional

    const openInstagramProfile = () => {
        const instagramUrl = 'https://www.instagram.com/amparitabira';
        Linking.openURL(instagramUrl);
    };

    const openInstagramProfile2 = () => {
        const instagramUrl = 'https://www.instagram.com/secretariadesaudeitabira';
        Linking.openURL(instagramUrl);
    };

    const openInstagramProfile3 = () => {
        const instagramUrl = 'https://linkr.bio/ampari';
        Linking.openURL(instagramUrl);
    };

    const openWhatsAppChat = (link) => {
        const url = `whatsapp://send?phone=${link}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.error('WhatsApp não está instalado no dispositivo.');
                }
            })
            .catch((err) => console.error('Erro ao abrir o WhatsApp: ', err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('./ampari.png')} style={styles.image} resizeMode="contain" />
                <Text onPress={openInstagramProfile} style={styles.link}>@amparitabira</Text>
                <Text onPress={openInstagramProfile3} style={styles.link}>Opções Ampari</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={require('./secsaudeitabira.png')} style={styles.image} resizeMode="contain" />
                <Text onPress={openInstagramProfile2} style={styles.link}>@secretariadesaudeitabira</Text>
                <Text onPress={() => openWhatsAppChat(phoneNumber1)} style={styles.link}>WhatsApp Zoonoses: {phoneNumber1}</Text>
            </View>

            <Footer selectedPage={selectedPage} handlePageSelect={(page) => setSelectedPage(page)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    contactContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});

export default ContactPage;
