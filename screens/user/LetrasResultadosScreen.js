import React,{useEffect,useState} from 'react'
import {FlatList,Text,Platform,ActivityIndicator,StyleSheet,View} from 'react-native'
import {useSelector,useDispatch }from 'react-redux';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import ResultadosItem from '../../components/shop/ResultadoLetra'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
import Colors from '../../constants/Colors';
const ResultadosScreen = props =>{
    // const orders= useSelector(state=>state.ordersa.orders);
    const letraId = props.route.params.letraId;
    const selectedResultados = useSelector(state =>
        state.resultados.availableResutlados.find(res => res.id === letraId)
      );
    const [isLoading,SetIsloading] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        SetIsloading(true);
        dispatch(ResultadosActions.fetchOrders()).then(
            ()=>{
                SetIsloading(false);
            }
        );
        
    },[dispatch])
    const DetalleResultado = (id,title) =>{
        props.navigation.navigate('ResultadoDetalleScreen',{
            productId: id,
            productTitle: title
        })
    }
    if(selectedResultados.length===0){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Hubo un error prueba a cargar la pagina de nuevo</Text>
        </View>)
    }
    if(isLoading)
    {
        return (
            <View style={styles.isloadingvw}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }
    return (
        <FlatList 
        data={selectedResultados} 
        keyExtractor={item=>item.id} 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        renderItem={itemData=>
        <ResultadosItem image={itemData.item.imageUrl} 
        title={itemData.item.title}    
        price={itemData.item.price}
        onSelect={()=>{DetalleResultado(itemData.item.id,itemData.item.title)}}>                                                         
           <Button color={Colors.primary} title="Ver detalles" onPress={()=>{ DetalleResultado(itemData.item.id,itemData.item.title)}}/>
           {/* <Button color={Colors.primary} title="To Cart" onPress={ ()=>{ dispatch(cartActions.addToCart(itemData.item))}}/> */}
        </ResultadosItem>}/>
    )
}
 

export const screenOptions = navData => {
    return {
        headerTitle:'Carteras de Letras Descontadas',
        headerLeft:()=>
        (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Resultados' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>
            {navData.navigation.toggleDrawer();}
            }/>
        </HeaderButtons>)
    };
    
}
const styles = StyleSheet.create({
    isloadingvw:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ResultadosScreen;