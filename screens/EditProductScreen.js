import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from '../components/CustomInput';
import DataLoading from '../components/DataLoading';
import { Price } from '../components/Price';
import { COLORS } from '../constants/colors';
import { globalStyles } from '../constants/styles';
import { saveProduct } from '../store/actions/products';
import { PRODUCTS_MODULE_NAME } from '../store/constants';

const UPDATE_PROPERTY = 'edit_product_update_property';

const changeProductReducer = (state, action) => {
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

const ProductState = ({productId}) => {
    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[productId] ?? {});

    const [state, dispatch] = React.useReducer(changeProductReducer, {
        price: product.price,
        isValid: {
            price: product.price && product.price > 0,
            title: product.title && product.title.length > 0,
            description: product.description && product.description.length > 10,
            imageUrl: true,
        },
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
    });
    
    return {
        state, dispatch
    }
}

const PriceDisplay = ({children}) => (
    <Price highlight={true} value={children}/>
)

export const EditProductScreen = ({route}) => {
    const {state, dispatch} = ProductState({productId: route?.params?.productId});
    const {setError, error, setLoading, isLoading} = DataLoading({});
    const reduxDispatch = useDispatch();
    const navigation = useNavigation();

    const save = React.useCallback(() => {
        setLoading(true);
        reduxDispatch(saveProduct(route?.params?.productId, {
            price: +state.price,
            title: state.title,
            description: state.description,
            imageUrl: state.imageUrl,
        })).then(() => {
            setLoading(false);
            setTimeout(() => navigation.navigate({name: 'listProducts'}), 50);
        }).catch(e => setError(e));
    }, [state]);

    const isDisabled = React.useMemo(() => 
        !Object.keys(state.isValid).reduce((a, e) => a && state.isValid[e], true), 
        [state.isValid]);

    React.useEffect(() => {
        navigation.setParams({isDisabled});
        navigation.setOptions({
            headerRight: (props) => (
                <SaveProductButton {...props} onClick={save} isLoading={isLoading}/>
            )
        })
    }, [save, isDisabled, isLoading]);

    React.useEffect(() => {
        if (error) Alert.alert(
            `Failed to save product ${state.title}`,
            `${error}. Please try again later.`,
            [
              {
                text: "Close",
                onPress: () => setError(),
                style: "cancel"
              }
            ]
          );
    }, [error]);

    const onChange = ({id, value, isValid}) => {
        dispatch({type:UPDATE_PROPERTY, key: id, value, isValid})
    }
    return (
            <ScrollView contentContainerStyle={styles.container}>
                <CustomInput 
                    id='title' 
                    title={'Title'}
                    onChange={onChange}
                    value={state.title}
                    validate={e => !!e}
                    returnKeyType={'next'}
                    placeholder="Your item product"/>
                <CustomInput 
                    id='price'
                    editable={!route?.params?.productId}
                    DisplayComponent={PriceDisplay}
                    validate={e => !!e && e > 0}
                    title={'Price'}
                    onChange={onChange}
                    keyboardType="numeric"
                    returnKeyType={'next'}
                    value={state.price?.toString()}
                    placeholder="Product price"
                />
                
                <CustomInput 
                    onChange={onChange}
                    id={'description'}
                    containerStyle={styles.descriptionContainer}
                    title={'Description'}
                    validate={e => !!e && e.length > 10}
                    inputStyle={styles.editableDescriptionInputContainer}
                    value={state.description}
                    numberOfLines={3}
                    multiline={true}
                    placeholder="Description"
                    autoCapitalize="sentences"
                    autoCorrect
                />
                <CustomInput 
                    id={'imageUrl'}
                    title={'Image'}
                    onChange={onChange}
                    value={state.imageUrl}
                    keyboardType="url"
                    placeholder="Image url"
                />                    
                {!!state.imageUrl &&
                    <Image 
                        style={styles.image}
                        resizeMode={'contain'}
                        source={{
                            uri: state.imageUrl,
                        }}
                    />
                }
            </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        // flex: 1, 
        // alignItems: 'stretch', 
        // justifyContent: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 5
    },
    editableElementContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 15,
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
    descriptionContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 15,
        alignItems: 'stretch',
        flex: 1,
        // width: '100%',
        // height: 'auto'
        // height: '100%'
    },
    editableDescriptionInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent: 'stretch',
        // width: '100%',
        paddingTop: 10,
        height: 'auto'
    },
    editableImageContainer: {
        alignItems: 'center',
        flex: 1,
        alignItems: 'stretch', 
    },
    image: {
        maxHeight: 120,
        minHeight: 120,
        width: '100%',
        flex: 1,
        alignSelf: 'stretch',
    }
});

const SaveProductButton = ({onClick, isLoading, ...props}) => {
    const route = useRoute();    

    const isDisabled = route?.params?.isDisabled ?? true;
    if (isLoading) return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='small' color={COLORS.main}/>
        </View>
    );
    return (
        <TouchableHighlight {...props}
                            disabled={isDisabled}
                            activeOpacity={0.9} 
                            onPress={onClick}
                            title='All my products'
                            underlayColor={COLORS.accent} 
                            style={globalStyles.menuButtonContainer}>
            <Ionicons name='ios-save-outline' size={25} color={isDisabled ? COLORS.accent : COLORS.main}/>
        </TouchableHighlight>
    )
}

export const EditProductOptions = ({ route }) => {
    return {
        presentation: 'modal',
        headerTitle: route?.params?.productId ? `Edit ${route?.params?.productName}` : `New Product`,
        headerRight: (props) => (
            <SaveProductButton {...props}/>
        ),
  
  }
}