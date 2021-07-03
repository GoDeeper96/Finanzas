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
    console.log("que paasdasdassoasdsaasdasdsaasdasdasdasdasds:"+letraId);
    const selectedResultados = useSelector(state =>
        state.resultados.availableResultados.filter(res => res.idLetra === letraId)
      );

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
        <View style={{flex: 1}}>
        <FlatList 
        data={selectedResultados} 
        keyExtractor={item=>item.idResultado} 
        renderItem={itemData=>
        <ResultadosItem imagen={itemData.item.LetraImageUrL} 
        valorRecibido={itemData.item.valorRecibido}    
        tcea={itemData.item.tcea}
        onSelect={()=>{DetalleResultado(itemData.item.idResultado)}}>                                                         
           <Button color={Colors.primary} title="Ver detalles" onPress={()=>{ DetalleResultado(itemData.item.idResultado)}}/>
           {/* <Button color={Colors.primary} title="To Cart" onPress={ ()=>{ dispatch(cartActions.addToCart(itemData.item))}}/> */}
        </ResultadosItem>}/>
        <Button color={Colors.primary} title="Generar Cartera con resultados" onPress={()=>{ DetalleResultado(itemData.item.idResultado)}}/>
        </View>
    )
}
 

export const screenOptions = navData => {
    return {
        headerTitle:'Resultados',
        headerLeft:()=>
        (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Resultados' iconName={Platform.OS==='android' ? 'md-arrow-back':'ios-arrow-back-outline'} onPress={()=>
            {navData.navigation.goBack()}
            }/>
        </HeaderButtons>),
         headerRight:()=>
         (<HeaderButtons HeaderButtonComponent={HeaderButton}>
             <Item title='hey' iconName={Platform.OS==='android' ? 'md-add':'ios-add'} onPress={()=>
             {navData.navigation.navigate('CarteraResultadosScreen')}
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