
import React from 'react';
import { StyleSheet } from 'react-native';

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


// const Container = React.memo(({children}) => {
//     console.log('rerender')
//     if (state.error) return (
//         <View style={styles.centered}>
//             <Text>{state.error}</Text>
//         </View>
//     );
//     if (state.isLoading) return (
//         <View style={styles.centered}>
//             <ActivityIndicator size='large' color={COLORS.main}/>
//         </View>
//     );
//     return children;
    
// }, [state.error, state.isLoading]);