import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UnifeiPage from './Unifei';
import ItabiraPage from './Itabira';
import Footer from './Footer';
import ContactPage from './ContactPage';
import DogsPage from './DogDetails';

const Stack = createStackNavigator();

const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Unifei" component={UnifeiPage} />
        <Stack.Screen name="Itabira" component={ItabiraPage} />
        <Stack.Screen name="ContactPage" component={ContactPage} options={{ headerShown: false }} />
        <Stack.Screen name="DogDetails" component={DogsPage}
            options={{ headerShown: false }} />
    </Stack.Navigator>
);

const App = () => (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
);
const constants = {
    IMAGE_SIZE: 260,
    MENU_IMAGE_MARGIN: 4,
    BUTTON_CONTAINER_MARGIN_TOP: 16,
};

const Button = ({ onPress, source, style }) => (
    <TouchableOpacity style={{ ...styles.button, ...style }} onPress={onPress}>
        <Image source={source} style={styles.menuImage} />
    </TouchableOpacity>
);

const MenuImage = ({ image }) => (
    <View style={styles.menuImageContainer}>
        <Image source={image} style={styles.menuImage} />
    </View>
);

const PaginationDot = ({ isActive }) => (
    <View style={[styles.paginationDot, isActive && styles.paginationDotActive]} />
);

const HomePage = () => {
    const navigation = useNavigation();
    const [selectedPage, setSelectedPage] = useState('home');
    const [currentPage, setCurrentPage] = useState(0);
    const scrollViewRef = useRef(null);

    const handlePageSelect = (page) => setSelectedPage(page);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / constants.IMAGE_SIZE);
        setCurrentPage(page);
    };

    const menuImages = [
        require('./apadrinhamento.png'),
        require('./ampari.png'),
        require('./feira.png'),
    ];

    const handleButtonPress = (direction) => {
        if (direction === 'left') {
            navigation.navigate('Unifei');
        } else if (direction === 'right') {
            navigation.navigate('Itabira');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.content}>
                <View style={styles.menuDynamic}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        ref={scrollViewRef}
                    >
                        {menuImages.map((image, index) => (
                            <MenuImage key={index} image={image} />
                        ))}
                    </ScrollView>
                    <View style={styles.paginationContainer}>
                        {menuImages.map((_, index) => (
                            <PaginationDot key={index} isActive={index === currentPage} />
                        ))}
                    </View>
                </View>

                <Button
                    style={styles.buttonLeft}
                    onPress={() => handleButtonPress('left')}
                    source={require('./UNIFEI.png')}
                />

                <Button
                    style={styles.buttonRight}
                    onPress={() => handleButtonPress('right')}
                    source={require('./Itabira.png')}
                />
            </View>
            <Footer selectedPage={selectedPage} handlePageSelect={handlePageSelect} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'orange',
        padding: 20,
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'orange',
    },
    button: {
        borderRadius: 10,
        width: 120,
        height: 120,
        backgroundColor: 'white',
    },
    buttonLeft: {
        marginRight: 160,
        marginTop: 20,
        marginBottom: 0,
        top: 100,
    },
    buttonRight: {
        marginLeft: 150,
        marginBottom: 0,
        bottom: 20,
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
    menuDynamic: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: constants.IMAGE_SIZE,
        height: constants.IMAGE_SIZE,
        backgroundColor: 'white',
        bottom: 20,
    },
    menuImageContainer: {
        flex: 1,
        width: constants.IMAGE_SIZE,
        height: constants.IMAGE_SIZE,
        position: 'relative',
    },
    menuImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 8,
        left: 0,
        right: 0,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(123, 123, 123, 0.7)',
        marginHorizontal: constants.MENU_IMAGE_MARGIN,
    },
    paginationDotActive: {
        backgroundColor: 'orange',
    },
});

export default App;

