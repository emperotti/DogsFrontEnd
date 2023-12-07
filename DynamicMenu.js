import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const DynamicMenu = () => {
    const [menuItems, setMenuItems] = useState([
        { id: 1, title: 'Home', icon: 'home' },
        { id: 2, title: 'Contato', icon: 'address-book' },
        { id: 3, title: 'Configurações', icon: 'cog' },
        // Adicione mais itens de menu conforme necessário
    ]);

    const [selectedItem, setSelectedItem] = useState(menuItems[0].id);

    const handleMenuItemPress = (itemId) => {
        setSelectedItem(itemId);
        // Aqui você pode adicionar a lógica para navegar para a página correspondente ao item do menu selecionado
    };

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, selectedItem === item.id && styles.selectedMenuItem]}
                        onPress={() => handleMenuItemPress(item.id)}
                    >
                        <FontAwesome5 name={item.icon} size={24} color={selectedItem === item.id ? '#ff7f50' : 'gray'} />
                        <Text style={[styles.menuItemText, selectedItem === item.id && { color: '#ff7f50' }]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Aqui você pode adicionar o conteúdo ou a navegação para a página correspondente ao item do menu selecionado */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    menuItem: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    selectedMenuItem: {
        borderBottomWidth: 2,
        borderColor: '#ff7f50',
    },
    menuItemText: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
});

export default DynamicMenu;
