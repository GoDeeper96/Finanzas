import React,{useEffect,useState} from 'react'
import {FlatList,Text,Platform,ActivityIndicator,StyleSheet,View,Button} from 'react-native'
import {useSelector,useDispatch }from 'react-redux';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import ResultadosItem from '../../components/shop/ResultadoLetra'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
import Colors from '../../constants/Colors';
import FancyResultados from '../../UI/fancyCartera';
const ResultadosScreen = props =>{
    // const orders= useSelector(state=>state.ordersa.orders);
    const letraId = props.route.params.letraId;
    const [tir,SetTir] = useState(0);
    const [vr,Setvr] = useState(0);
    const [HayResultados,SetHayResultados]= useState(false)
    const [visibleForResultados, setVisibleForResultados] = React.useState(false);
    const toggleAlertResultados = React.useCallback(() => {
        SetHayResultados(false);
        setVisibleForResultados(false);    
    }, [visibleForResultados]);
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
        
    },[dispatch,toggleAlertResultados])
    const ResuelveAlgoritmo = () =>{
        //Aqui hace el algoritmo
        const valorRecibidoTotal = selectedResultados.map(x=>x.valorRecibido);
        const TceaTotal = selectedResultados.map(x=>x.tcea);
        var srb = 0;
        var stc = 0;
        for(let x in valorRecibidoTotal){
            srb = srb + valorRecibidoTotal[x]   
        }
        for(let x in TceaTotal){
            stc = stc + TceaTotal[x]   
        }
        setVisibleForResultados(true);
        SetHayResultados(true);
        // console.log(srb);
        // console.log(stc);
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
    if(HayResultados)
    { 
        
        return(
            <FancyResultados
            visible={visibleForResultados}
            vr={tir}
            tir={vr}
            toggle={toggleAlertResultados}
            />
        )

    }
    return (
        <View style={{flex: 1}}>
        <FlatList 
        data={selectedResultados} 
        keyExtractor={item=>item.idResultado} 
        renderItem={itemData=>
        <ResultadosItem 
        tcea={itemData.item.tcea}
        valorRecibido={itemData.item.valorRecibido}    
        valorEntregado={itemData.item.valorEntregado}
        valorRecibido={itemData.item.valorRecibido}
        descuento={itemData.item.descuento}
        valorNeto={itemData.item.valorNeto}
        dias={itemData.item.dias}
        fechaInicio={itemData.item.fechaInicio}
        fechaVencimiento={itemData.item.fechaVencimiento}
        valorNominalLetra={itemData.item.valorNominalLetra}
        tasa={itemData.item.tasa}
        onSelect={()=>{DetalleResultado(itemData.item.idResultado)}}>                                                         
           {/* <Button color={Colors.primary} title="To Cart" onPress={ ()=>{ dispatch(cartActions.addToCart(itemData.item))}}/> */}
        </ResultadosItem>

            }/>
        <Button color={Colors.primary} title="Generar Cartera con resultados" onPress={()=>{ ResuelveAlgoritmo()}}/>
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