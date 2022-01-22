
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

const ERROR = 'set_error';
const SET_LOADING = 'set_loading';


const reducer = (state, action) => {
    switch (action.type){        
        case ERROR: 
            return {isLoading: false, error: action.error};

        case SET_LOADING: 
            return {error: action.isLoading ? undefined: state.error, isLoading: action.isLoading};

        default:
            return state;    
    }
}

const EMPTY_STATE = {isLoading: false, error: undefined}
const DataLoading = ({}) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE);    
    return {
        setLoading: (isLoading) => dispatch({type: SET_LOADING, isLoading}),
        setError: (error) => dispatch({type: ERROR, error}),
        error: state.error,
        isLoading: state.isLoading
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DataLoading;


export const DataLoadingContainer = ({children, isLoading, error, style={}}) => {
    if (error) return (
        <View style={{...styles.centered, ...style}}>
            <Text style={{color: 'red'}}>{error}</Text>
        </View>
    );
    if (isLoading) return (
        <View style={{...styles.centered, ...style}}>
            <ActivityIndicator size='large' color={COLORS.main}/>
        </View>
    );
    return children; 
}