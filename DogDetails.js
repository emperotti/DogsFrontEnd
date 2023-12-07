import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Footer from './Footer';

function DogDetails({ route }) {
    const [selectedPage, setSelectedPage] = useState('');
    const [dogData, setDogData] = useState(null);

    useEffect(() => {
        if (route.params && route.params.dogId) {
            // Find the dog with the matching ID in the array
            const dogIdToFind = route.params.dogId;

            fetchDogData()
                .then((data) => {
                    const foundDog = data.dogs.find((dog) => dog.id === dogIdToFind);
                    if (foundDog) {
                        setDogData(foundDog);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [route.params]);

    const fetchDogData = async () => {
        try {
            const response = await fetch('https://vercel-ampari-xjjs-af8l41rxg-emperotti.vercel.app/dogs');

            if (!response.ok) {
                throw new Error('Erro na solicitação à API');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <ScrollView>
            {dogData && (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: dogData.photo }} style={styles.image} />
                    </View>
                    <View style={styles.contactContainer}>
                        <Text style={styles.heading}>Nome: {dogData.name}</Text>
                        <Text style={styles.heading}>Raça: {dogData.species}</Text>
                        <Text style={styles.heading}>Idade: {dogData.age}</Text>
                        <Text style={styles.heading}>Sexo: {dogData.sex}</Text>
                        <Text style={styles.heading}>Localização: {dogData.localization}</Text>
                        <Text style={styles.heading}>Descrições: {dogData.descriptions}</Text>
                        <Text style={styles.heading}>Porte: {dogData.carry}</Text>
                        <Text style={styles.heading}>Peso: {dogData.weights}</Text>
                        {/* Add more information as needed */}
                    </View>
                </View>
            )}
            <Footer selectedPage={selectedPage} handlePageSelect={(page) => setSelectedPage(page)} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 50
    },
    contactContainer: {
        paddingHorizontal: 50,
        paddingBottom: 90,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default DogDetails;
