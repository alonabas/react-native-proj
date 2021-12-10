import { useNavigation } from '@react-navigation/core';
import React from "react";
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DataLoading, { DataLoadingContainer } from '../components/DataLoading';
import { DrawerButton } from '../components/DrawerButton';
import { NoItems } from '../components/NoItems';
import { ShopProduct } from "../components/ShopProduct";
import { ToCartButton } from '../components/ToCartButton';
import * as productActions from '../store/actions/products';
import { getListOfShopProducts } from '../store/selectors/products';

export const ShopScreen = ({}) => {
    const navigation = useNavigation();
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

    const productIds = useSelector(getListOfShopProducts());

    return (
        <DataLoadingContainer isLoading={isLoading} error={error}>
            <FlatList data={productIds} 
                      refreshing={refreshing}
                      ListEmptyComponent={() => <NoItems>There are no products</NoItems> }
                      onRefresh={refresh}
                      renderItem={({item}) => <ShopProduct id={item} key={item}/>}
                      keyExtractor={e => e}
                />
        </DataLoadingContainer>
    )  
}

export const ShopScreenOptions = ({ route, navigation }) => {
  return {
      headerLeft: (props) => (
          <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
      ),
      headerRight: (props) => (
          <ToCartButton {...props} 
                        onPress={() => navigation.navigate({name: 'cart'})} />
      ),
      headerTitle: 'Shop'
  }
}



