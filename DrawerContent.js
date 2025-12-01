import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';


export function DrawerContent(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userEmail = user ? user.email : '';

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <View style={styles.container}>
             {/* ... renderização usando userEmail ... */}
             <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.acoesHeaderColor, 
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
