import { useNavigation } from '@react-navigation/core';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import * as React from 'react';
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { logout as logoutRedux } from '../store/actions/auth';
import { LocalButton } from "./LocalButton";

const DrawerContent = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const logout = () => {
        dispatch(logoutRedux())
        navigation.reset({
            index: 0, 
            routes: [{name:'auth'}]
        });
    }
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <LocalButton title={'Logout'} 
                         style={styles.button}
                         onPress={logout}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: '20%',
        marginVertical: 10
    }
})

export default DrawerContent;