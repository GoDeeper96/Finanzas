import React,{useEffect,useState} from 'react'
import {FlatList,Text,Platform,ActivityIndicator,StyleSheet,View,Button} from 'react-native'
import {useSelector,useDispatch }from 'react-redux';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import ResultadosItem from '../../components/shop/ResultadoLetra'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
import Colors from '../../constants/Colors';
const ResultadosScreen = props =>{
    // const orders= useSelector(state=>state.ordersa.orders);
    const letraId = props.route.params.letraId;
    console.log("que paasdasdassoasdsaasdasdsa:"+letraId);
    const selectedResultados = useSelector(state =>
        state.resultados.availableResultados.filter(res => res.idLetra === letraId)
      );
    console.log(selectedResultados)
    const [isLoading,SetIsloading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        SetIsloading(true);
        dispatch(ResultadosActions.fetchResultado()).then(
            ()=>{
                SetIsloading(false);
            }
        );
        
    },[dispatch])
    const DetalleResultado = (id) =>{
        props.navigation.navigate('ResultadoDetalleScreen',{
            ResultadoId: id,
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
        keyExtractor={item=>item.idResultado} 
        renderItem={itemData=>
        <ResultadosItem imagen={itemData.item.LetraImageUrL} 
        valorRecibido={itemData.item.valorRecibido}    
        tcea={itemData.item.tcea}
        onSelect={()=>{DetalleResultado(itemData.item.idResultado,itemData.item.title)}}>                                                         
           <Button color={Colors.primary} title="Ver detalles" onPress={()=>{ DetalleResultado(itemData.item.idResultado)}}/>
           {/* <Button color={Colors.primary} title="To Cart" onPress={ ()=>{ dispatch(cartActions.addToCart(itemData.item))}}/> */}
        </ResultadosItem>}/>
    )
}
 

export const screenOptions = navData => {
    return {
        headerTitle:'Resultados',
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