import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../constants/colors';

const SET_TOUCHED = 'set_touched';
const SET_VALUE = 'set_value';

const reducer = (state, action) => {
    switch(action.type) {
        case SET_TOUCHED:
            return {...state, touched: true};
        
        case SET_VALUE:
            const {validate=()=>true, value} = action;
            return {...state, value: value, isValid: validate(value)};

        default:
            return state;
    }
}

export const EditProductInput = ({
    children, 
    id,
    title, 
    value, 
    onChange, 
    containerStyle={}, 
    titleStyle={}, 
    inputStyle={},
    editable=true,
    DisplayComponent=Text,
    validate=()=>true,
    ...inputProps
}) => {
    const [state, dispatch] = React.useReducer(reducer, {
        value,
        isValid: !!value,
        touched: false
    });

    React.useEffect(() => {
        if (state.touched)
            onChange({id, value: state.value, isValid: state.isValid});
    }, [state.value, state.isValid, state.touched]);
    
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <View style={{...styles.editableElementContainer, ...containerStyle}}>
                <Text style={{...styles.editableElementText, ...titleStyle}}>{title}</Text>
                {editable ?
                    <TextInput 
                        style={{...styles.editableInput, ...inputStyle}}
                        onChangeText={(v) => dispatch({type:SET_VALUE, value:v, validate})}
                        value={state.value}
                        onBlur={() => dispatch({type:SET_TOUCHED})}
                        {...inputProps}
                    />
                    :
                    <DisplayComponent>{state.value}</DisplayComponent>
                }
                
            </View>
            {(state.touched && !state.isValid) &&
                <Text style={styles.validationText}>Please enter valid value</Text>
            }
        </KeyboardAvoidingView>

        // {/* </View> */}
    )
}

const styles = StyleSheet.create({
    validationText: {
        fontSize: 12,
        color: 'red',
        top: -10,
        position: 'relative'
    },
    editableElementContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 15,
        // flex: 1,
    },
    editableElementText: {
        width: 80,
    },
    editableInput: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        // height: 40,
        flex: 1,
        borderColor: COLORS.accent,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
});