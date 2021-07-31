import React,{useEffect,useState,useCallback} from 'react'
import {FlatList,Text,Platform,ActivityIndicator,StyleSheet,View,Button} from 'react-native'
import {useSelector,useDispatch }from 'react-redux';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import ResultadosItem from '../../components/shop/ResultadoLetra'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
import Colors from '../../constants/Colors';
import FancyResultados from '../../UI/fancyCartera';
import FancyResultado from '../../UI/FancyResultado';
const ResultadosScreen = props =>{
    // const orders= useSelector(state=>state.ordersa.orders);
    const letraId = props.route.params.letraId;
    const [tir,SetTir] = useState(0);
    const [vr,Setvr] = useState(0);
    const [HayUnResultado,SetHayUnResultado]= useState(false)
    const [visibleForUnResultado, setVisibleForUnResultado] = useState(false);
    const [HayResultados,SetHayResultados]= useState(false)
    const [visibleForResultados, setVisibleForResultados] =useState(false);
    const toggleAlertResultados = useCallback(() => {
        SetHayResultados(false);
        setVisibleForResultados(false);    
    }, [visibleForResultados]);
    const toggleAlertUnResultado = useCallback(() => {
        SetHayUnResultado(false);
        setVisibleForUnResultado(false);    
    }, [visibleForUnResultado]);
    const [res,setRes] = useState({
            tcea:0,
            valorRecibido:0,
            valorEntregado:0,
            valorRecibido:0,
            descuento:0,
            valorNeto:0,
            dias:0,
            fechaInicio:0,
            fechaVencimiento:0,
            valorNominalLetra:0,
            tasa:0,
    })
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

     //// calc tcea
     function va(cartera, tasa) {
        var tempa = 0;
        for (var i = 0; i<cartera.length; i++){
            var letra = cartera[i];
            tempa = tempa - letra[1];
            tempa = tempa + (letra[0]/(Math.pow(1+(tasa/100),letra[2]/360)));
        }
        return tempa;
    }
    
    
    function calc_tcea(cartera){
        var superior = 100
        var inferior = 0
        var pivote = (superior + inferior)/2
        var diff = 1
        while (diff>= 0.000000001){
            if (va(cartera,inferior)*va(cartera,pivote)<=0){
                superior = pivote;
                
            }
            else {
                inferior = pivote;
            }
    
            pivote = (superior + inferior)/2
            diff = superior - inferior
        }
    
        return pivote.toFixed(7)
    }

    ////
    const giveMeResultado = (idResultado)=>{
        const selectedResultado = selectedResultados.find(res => res.idResultado === idResultado)
          
        setRes({
            tcea:selectedResultado.tcea,
            valorRecibido:selectedResultado.valorRecibido,
            valorEntregado:selectedResultado.valorEntregado,
            descuento:selectedResultado.descuento,
            valorNeto:selectedResultado.valorNeto,
            dias:selectedResultado.dias,
            fechaInicio:selectedResultado.fechaInicio,
            fechaVencimiento:selectedResultado.fechaVencimiento,
            valorNominalLetra:selectedResultado.valorNominalLetra,
            tasa:selectedResultado.tasa,
        })
        setVisibleForUnResultado(true);   
        SetHayUnResultado(true);
        
    }
    const ResuelveAlgoritmo = () =>{
        //Aqui hace el algoritmo
        const valorRecibidoTotal = selectedResultados.map(x=>x.valorRecibido);
        const valorEntregadoTotal = selectedResultados.map(x=>x.valorEntregado);
        const dias= selectedResultados.map(x=>x.dias);
        var srb = 0;
        var tcc = 0;
        var stc = [];
        for(let x in valorRecibidoTotal){
            srb = srb + valorRecibidoTotal[x]   
        }
        for(let x in valorRecibidoTotal){
            var temp = [valorEntregadoTotal[x],valorRecibidoTotal[x],dias[x]];
            stc.push(temp)
        }
        tcc = calc_tcea(stc);
        SetTir(tcc);
        Setvr(srb)
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
    if(HayUnResultado){
        return(
        <FancyResultado
            visible={visibleForUnResultado}
            tcea={res.tcea*100+"%"}
            valorRecibido={"S/."+res.valorRecibido}    
            valorEntregado={"S/."+res.valorEntregado}
            descuento={"S/."+res.descuento}
            valorNeto={"S/."+res.valorNeto}
            dias={res.dias+" dias"}
            fechaInicio={res.fechaInicio}
            fechaVencimiento={res.fechaVencimiento}
            valorNominalLetra={"S/."+res.valorNominalLetra}
            tasa={res.tasa+"%"}
            toggle={toggleAlertUnResultado}
            />)
    }
    if(HayResultados)
    { 
        
        return(
            <FancyResultados
            visible={visibleForResultados}
            vr={vr}
            tir={tir}
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
        descuento={itemData.item.descuento}
        valorNeto={itemData.item.valorNeto}
        dias={itemData.item.dias}
        fechaInicio={itemData.item.fechaInicio}
        fechaVencimiento={itemData.item.fechaVencimiento}
        valorNominalLetra={itemData.item.valorNominalLetra}
        tasa={itemData.item.tasa}
        onSelect={()=>{giveMeResultado(itemData.item.idResultado)}}>                                                         
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