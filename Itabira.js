import React, { useState } from 'react'; // Import useState

import Footer from './Footer';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const ItabiraPage = () => {
    const [selectedPage, setSelectedPage] = useState('unifei'); // Initialize selectedPage state
    const imageUrl = './apadrinhamento.png';

    return (
        <View style={styles.container}>
            {/* Centered image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
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
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    image: {
        width: 300,
        height: 300,
    },
});


export default ItabiraPage;
