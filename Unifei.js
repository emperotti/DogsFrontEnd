import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Footer';
import DogsPage from './DogDetails';

const Stack = createStackNavigator();

const AppStack = () => (
    <Stack.Navigator initialRouteName="UnifeiPage">
        <Stack.Screen name="DogDetails" component={DogsPage} />
    </Stack.Navigator>
);

const App = () => (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
);

const UnifeiPage = () => {
    const [selectedPage, setSelectedPage] = useState('unifei');
    const [dogs, setDogs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getDogsFromApiAsync()
            .then((data) => {
                if (data && data.dogs) {
                    setDogs(data.dogs);
                    console.log(data.dogs);
                } else {
                    console.error('A resposta da API não contém dados válidos de cães.');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleImageClick = (dogId) => {
        navigation.navigate('DogDetails', { dogId }); // Pass the dogId as a parameter
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {dogs &&
                    dogs.map((dog, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.bubble,
                                index % 2 === 0 ? styles.bubbleRight : styles.bubbleLeft,
                            ]}
                            onPress={() => handleImageClick(dog.id)}
                        >
                            <ImageBackground
                                source={{ uri: dog.photo }}
                                style={styles.circleBackground}
                            >
                            </ImageBackground>
                            <Text style={styles.descriptionText}>
                                {dog.name} {/* Display the description from the API */}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            <Footer
                selectedPage={selectedPage}
                handlePageSelect={(page) => setSelectedPage(page)}
            />
        </View>
    );
};

async function getDogsFromApiAsync() {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bubble: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    bubbleLeft: {
        alignSelf: 'flex-start',
    },
    bubbleRight: {
        alignSelf: 'flex-end',
    },
    circleBackground: {
        width: 100,
        height: 100,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    messageText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionText: {
        marginLeft: 10,
        fontSize: 14,
        flex: 1,
    },
});

export default UnifeiPage;
