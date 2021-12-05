import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants/colors';
import { authenticate } from '../store/actions/auth';

const InitScreen = ({}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        const func = async () => {
            const value = await AsyncStorage.getItem('userData');
            console.log(value)
            if (value !== null) {
                const {idToken, localId, expiration} = JSON.parse(value);
                console.log(localId)
                if (!idToken || !localId || moment().isAfter(moment.unix(expiration))){
                    navigation.navigate({name:'auth'});
                }
                else {
                    dispatch(authenticate(idToken, localId, expiration))
                    navigation.navigate({name:'app'})
                }
            }
            else {
                navigation.navigate({name:'auth'});
            }
        }
        func();
    }, [])
    return  (
        <View style={styles.view}>
            <ActivityIndicator size='large' color={COLORS.main}/>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default InitScreen;