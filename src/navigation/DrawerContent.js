import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Ionicons} from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../theme/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';

export function DrawerContent(props){
    const userEmail = 'usuario@domain.com';

    const handleLogout = () => {

        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }], 
        });
    }
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.emailText}>{userEmail}</Text>
                <View style = {styles.divider} />
            </View>

            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    
                    <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.headerColor, 
    },
    header: {
        padding: 20,
        paddingTop: 50, 
        marginBottom: 10,
    },
    emailText: {
        color: COLORS.white,
        fontSize: 16,
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.background, 
        width: '100%',
    },
    
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.background,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoutText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 15,
    },
});
