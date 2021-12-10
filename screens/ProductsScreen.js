import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import DataLoading, { DataLoadingContainer } from '../components/DataLoading';
import { DrawerButton } from '../components/DrawerButton';
import { MyProduct } from "../components/MyProduct";
import { NoItems } from '../components/NoItems';
import { COLORS } from '../constants/colors';
import { globalStyles } from '../constants/styles';
import * as productActions from '../store/actions/products';
import { getListOfMyProducts } from '../store/selectors/products';

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
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const {setError, error, setLoading, isLoading} = DataLoading({});

    const loadProducts = React.useCallback(() => {
        setLoading(true);
        return dispatch(productActions.loadProducts())
            .then(() => setLoading(false))
            .catch(e => setError(e));
    }, []);
    const refresh = () => {
        setRefreshing(true);
        loadProducts().then(() => setRefreshing(false));
    }
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadProducts);
        loadProducts()
        return unsubscribe;
    },[]);
    const productIds = useSelector(getListOfMyProducts());

    return (
        <DataLoadingContainer isLoading={isLoading} error={error}>

        <FlatList data={productIds} 
                  refreshing={refreshing}
                  ListEmptyComponent={() => <NoItems>You don't have any products</NoItems> }
                  onRefresh={refresh}
                  renderItem={({item}) => <MyProduct id={item} key={item}/>}
                  keyExtractor={e => e}
        />
        </DataLoadingContainer>
       
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

