import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from '../constants/colors';
import { globalStyles } from '../constants/styles';
import { Product } from "../model/product";
import { saveProduct } from '../store/actions/products';
import { PRODUCTS_MODULE_NAME } from '../store/constants';


const CreateProductContext = React.createContext({
    title: '', 
    setTitle: () => {}, 
    price: null, 
    setPrice: () => {}, 
    description: '', 
    setDescription: () => {}, 
    imageUrl: null, 
    setImageUrl: () => {}
});

const ProductState = ({productId}) => {
    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[productId] ?? {});
    const [title, setTitle] = React.useState(product.title);
    const [price, setPrice] = React.useState(product.price);
    const [description, setDescription] = React.useState(product.description);
    const [imageUrl, setImageUrl] = React.useState(product.imageUrl);

    const navigation = useNavigation();

    React.useEffect(() => {
        const isDisabled = !title || !price || !imageUrl;
        navigation.setParams({isDisabled, product: new Product(productId, title, price, description, imageUrl)});
    }, [title, price, description, imageUrl]);
    
    return {
        title, 
        setTitle, 
        price, 
        setPrice, 
        description, 
        setDescription, 
        imageUrl, 
        setImageUrl
    }
}

const Name = ({}) => {
    const {title, setTitle} = React.useContext(CreateProductContext);
    return (
        <View style={styles.editableElementContainer}>
            <Text style={styles.editableElementText}>Name</Text>
            <TextInput style={styles.editableInput}
                       onChangeText={setTitle}
                       value={title}
                       placeholder="Your item name"
            />
        </View>
    )
}

const Price = ({}) => {
    const {price, setPrice} = React.useContext(CreateProductContext);
    return (
        <View style={styles.editableElementContainer}>
            <Text style={styles.editableElementText}>Price</Text>
            <TextInput style={styles.editableInput}
                       onChangeText={setPrice}
                       keyboardType="numeric"
                       value={price?.toString()}
                       placeholder=""
            />
        </View>
    )
}

const Description = ({}) => {
    const {description, setDescription} = React.useContext(CreateProductContext);
    return (
        <View style={{...styles.editableElementContainer, ...styles.descriptionContainer}}>
            <Text style={styles.editableElementText}>Description</Text>
            <View style={styles.editableDescriptionInputContainer}>
                <TextInput style={styles.editableInput}
                           onChangeText={setDescription}
                           value={description}
                           numberOfLines={3}
                           multiline={true}
                           placeholder=""
                />
            </View>
        </View>
    )
}

const ImageElement = ({}) => {
    const {imageUrl, setImageUrl} = React.useContext(CreateProductContext);
    return (
        <View style={styles.editableImageContainer}>
            <View style={styles.editableElementContainer}>
                <Text style={styles.editableElementText}>Image URL</Text>
                <TextInput style={styles.editableInput}
                           onChangeText={setImageUrl}
                           keyboardType="url"
                           value={imageUrl}
                           placeholder="Image url"
                />
            </View>
            {imageUrl &&
                <Image style={styles.image}
                    resizeMode={'contain'}
                    source={{
                        uri: imageUrl,
                    }}
                />
            }
        </View>
    )
}
export const EditProductScreen = ({route}) => {
    const state = ProductState({productId: route?.params?.productId});
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CreateProductContext.Provider value={state}>
                <Name/>
                <Price/>
                <Description/>
                <ImageElement/>
            </CreateProductContext.Provider>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'flex-start',
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
        marginRight: 15
    },
    editableDescriptionInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    editableImageContainer: {
        alignItems: 'center',
        flex: 1,
        alignItems: 'stretch', 
    },
    image: {
        width: 'auto',
        maxHeight: 120,
        flex: 1,
        alignSelf: 'stretch',
    }
});

const SaveProductButton = ({...props}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    
    const product = React.useMemo(() => {
        return route?.params?.product ?? {};
    }, [route?.params]);

    const press = React.useCallback(() => {
        dispatch(saveProduct(product.id, product));
        navigation.navigate({name: 'listProducts'})
    }, [route.params]);

    const isDisabled = route?.params?.isDisabled ?? true
    return (
        <TouchableHighlight {...props}
                            disabled={isDisabled}
                            activeOpacity={0.9} 
                            onPress={press}
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