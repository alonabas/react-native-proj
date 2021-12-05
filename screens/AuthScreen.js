import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { useDispatch } from 'react-redux';
import { CustomInput } from "../components/CustomInput";
import DataLoading from '../components/DataLoading';
import { LocalButton } from '../components/LocalButton';
import { RegularTitle } from '../components/Title';
import { COLORS } from '../constants/colors';
import { singIn, singUp } from '../store/actions/auth';

const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
const userPassReducer = (state, action) => {
    switch(action.type) {
        case UPDATE_PROPERTY:
            return {
                ...state, 
                [action.key]: action.value, 
                isValid: {...state.isValid, [action.key]: action.isValid}
            };
        
        default:
            return state;
    }
}


const AuthState = ({}) => {

    const [state, dispatch] = React.useReducer(userPassReducer, {
        isValid: {
            user: false,
            pass: false
        },
        user: '',
        pass: ''
});
    
    return {
        state, dispatch
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const AuthScreen = ({}) => {
    const [isSignUp, setIsSignUp] = React.useState(false);
    const {state, dispatch} = AuthState({});
    const {setError, error, setLoading, isLoading} = DataLoading({});
    const dispatchRedux = useDispatch();
    const navigation = useNavigation();

    const onChange = ({id, value, isValid}) => {
        dispatch({type:UPDATE_PROPERTY, key: id, value, isValid})
    }

    React.useEffect(() => {
        if (error) Alert.alert(
            `Failed to ${isSignUp ? 'sign up' : 'login'}.`,
            `${error}`,
            [
              {
                text: "Close",
                onPress: () => setError(),
                style: "cancel"
              }
            ]
          );
    }, [error]);
    const submit = () => {
        const submitAction = isSignUp ? singUp : singIn;
        setLoading(true);
        dispatchRedux(submitAction(state.user, state.pass))
            .then(() => {
                navigation.navigate({name: 'app'});
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <LinearGradient
                    colors={["#f1d29b", COLORS.accent, "#f1d29b"]}
                    style={styles.card}>

                        <CustomInput id='user'
                            title={'E-mail'}
                            onChange={onChange}
                            value={state.user}
                            validate={validateEmail}
                            autoCapitalize={false}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            placeholder="Enter your email"/>
                        <CustomInput id='pass'
                            title={'Password'}
                            onChange={onChange}
                            value={state.pass}
                            validate={e => !!e}
                            autoCapitalize={false}
                            autoCorrect={false}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            textContentType={'password'}
                            placeholder="Enter your password"/>
                            <View style={styles.switcher}>
                                <RegularTitle style={styles.pad}>Sign in</RegularTitle>
                                <Switch 
                                    trackColor={{ false: COLORS.ui01, true: COLORS.ui01 }}
                                    thumbColor={isSignUp ? COLORS.secondary : COLORS.main}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsSignUp(e => !e)}
                                    value={isSignUp}
                                />
                                <RegularTitle style={styles.pad}>Sign up</RegularTitle>
                            </View>
                        {isLoading ? 
                            <ActivityIndicator size='small' color={COLORS.main}/>
                            :
                            <LocalButton title={isSignUp ? 'Sign up' : 'Sign in'} 
                                         style={styles.button} 
                                         onPress={submit}/>

                        }
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        // height: '100%',
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },  
    card: {
        height: 250,
        minWidth: 300,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 4, height: 5},
        shadowRadius: 10,
        elevation: 8,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 10,
        // flex: 1,
        // alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'

    },
    switcher: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pad: {
        paddingHorizontal: 6,
    },
    button: {
        alignSelf: 'center'
    }
});

export default AuthScreen;