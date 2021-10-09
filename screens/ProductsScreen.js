import React from "react";
import {View, Text, TouchableHighlight, ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import {DrawerButton} from '../components/DrawerButton';
import {globalStyles} from '../constants/styles';
import { useSelector } from "react-redux";
import {getListOfMyProducts} from '../store/selectors/products';
import {NoItems} from '../components/NoItems';
import { MyProduct } from "../components/MyProduct";

const AddProductButton = (props) => (
    <TouchableHighlight {...props}
                        activeOpacity={0.9} 
                        title='Add Product'
                        underlayColor={COLORS.accent} 
                        style={globalStyles.menuButtonContainer}>
        <Ionicons name='add-circle-outline' size={30} color={COLORS.main}/>
    </TouchableHighlight>
)

export const ProductsScreen = ({navigation}) => {
    const productIds = useSelector(getListOfMyProducts());
    if (productIds.length === 0) {
        return (
            <NoItems>You don't have any products</NoItems>
        )
    }
    return (
        <ScrollView >
            {productIds.map(e => (
                <MyProduct id={e} key={e}/>
            ))}
        </ScrollView>
    )
};


export const ProductsScreenOptions = ({ route, navigation }) => {
    return {
        headerLeft: (props) => (
            <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
        ),
        headerRight: (props) => (
            <AddProductButton {...props} 
                              onPress={() => navigation.navigate({name: 'editProduct'})} />
        ),
        headerTitle: 'Your products'
  }
}

