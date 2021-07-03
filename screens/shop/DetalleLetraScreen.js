import React, {useEffect,useState,useCallback} from 'react'
import {ScrollView,View,Text,Image,Button,ActivityIndicator,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import Colors from '../../constants/Colors'
import Card from '../../UI/Card';
import * as ResultadosActions from '../../store/actions/ResultadosActions'
const DetalleLetraScreen = props =>{
    const letraId = props.route.params.letraId;

    const [sumaRecibidoTotal,SetRecibidoTotal] = useState(0);
    const [sumaTceaTotal,SetsumaTceaTotal] = useState(0);
    const [tir,SetTir] = useState(0);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,SetIsRefreshing] = useState(false);
    const [err,SetErr] = useState();
    const selectedResultados = useSelector(state =>
        state.resultados.availableResultados.filter(res => res.idLetra === letraId)
      );
    // const selectedResultados = useSelector(state => state.resultados.availableResultados)
    console.log(selectedResultados);
    const CalculaDatos = () =>{
        const valorRecibidoTotal = selectedResultados.map(x=>x.valorRecibido);
        const valorEntregadoTotal = selectedResultados.map(x=>x.valorEntregado);
        var srb = 0;
        var stc = 0;
        for(let x in valorRecibidoTotal){
            srb = srb + valorRecibidoTotal[x]   
        }
        for(let x in TceaTotal){
            stc = stc + valorEntregadoTotal[x]   
        }
        console.log(srb);
        console.log(stc);
        SetRecibidoTotal(srb)
        SetsumaTceaTotal(stc)
    }
    const loadResultados = useCallback(async()=>{
        SetErr(null);
        SetIsRefreshing(true);
        try {
            await dispatch(ResultadosActions.fetchResultado())
        } catch (error) {
            SetErr(error.message);
        }
        SetIsRefreshing(false);
    },[dispatch])
    // const algoritmo = ()=>{
    //     CalculaDatos();
    // }
    useEffect(()=>
    {
        setIsLoading(true);
        dispatch(ResultadosActions.fetchResultado()).then(
            ()=>{
                setIsLoading(false);
                CalculaDatos();
            }
        );
        // console.log("asdas"+selectedResultados.map(valor=>valor.tcea));

    },[dispatch,loadResultados,SetErr])
    // const selectedLetras = useSelector(state =>
    //     state.letras.availableLetras.find(letr => letr.idLetra === letraId)
    //   );
    //   console.log("valor Recibido" + selectedResultados.map(valor=>valor.valorRecibido));
    //   console.log("tcea");
      const LlevameAListaResultados = ()=>{
          //LLEVA A RESULTADOS FIND SEGUN ID DE LETRA
          props.navigation.navigate('Resultados',{
            letraId: letraId
        })
      }
      if(isLoading)
    {
        return (<View style={styles.ct}>
            <ActivityIndicator size='large' color={Colors.accent}/>
        </View>);
    }
    if(selectedResultados.length===0){
        console.log(selectedResultados.length)
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No hay letras, quizá deberías agregar algunas?</Text>
        </View>)
    }
    //   {selectedResultados.map(valor=>valor+ valor.valorRecibido)}
    //   console.log("here"+selectedLetras)
    return (
            <View style={styles.rw}>
                <Text style={styles.title}>IDLETRA:{letraId}</Text>
                <View style={{ flexDirection:'row'}}>
                
                <Text style={styles.title}>Valor total a recibir:{sumaRecibidoTotal}</Text>
                
                <Text style={styles.val}></Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Tcea:{sumaTceaTotal}</Text>
                <Text style={styles.val}>{}</Text>
                </View>
               
                {/* <Text style={styles.desc}>{selectedLetras.descripcion}</Text>
                <Text style={styles.prc}>{selectedLetras.retencion}</Text>
                <Text style={styles.desc}>{selectedLetras.plazot}</Text>
                <Text style={styles.prc}>{selectedLetras.tasa}</Text>
                <Text style={styles.desc}>{selectedLetras.fechaDescuento}</Text>
                <Text style={styles.prc}>{selectedLetras.gastoInicial}</Text>
                <Text style={styles.desc}>{selectedLetras.gastoFinal}</Text>
                <Text style={styles.desc}>{selectedLetras.fechaEmision}</Text>
                <Text style={styles.desc}>{selectedLetras.retencion}</Text>
                <Text style={styles.desc}>{selectedLetras.valorNominal}</Text>
                <Text style={styles.desc}>{selectedLetras.capitalizacion}</Text> */}

                <Button title="Ver Resultados" color="black" onPress={()=>{LlevameAListaResultados()}}/>
            </View>
    )

};

export const screenOptions = navData=>{
    return {
        headerTitle: navData.route.params.letraTitle
    }
}

const styles = StyleSheet.create({
    rw:{
        alignContent:'center',
        flexDirection:'column',
        justifyContent:'space-between',
        flex:1,
        margin:15
    },
    val:
    {
        fontSize:16,
        textAlign:'center',
        fontFamily:'open-sans-bold',
        marginHorizontal:5,
    },
    title:{
        fontSize:16,
        color:'#888',
        textAlign:'center',
        marginHorizontal:5,
        fontFamily:'open-sans-bold'
    },

})
export default DetalleLetraScreen
 // actions:{
    //     marginVertical:10,
    //     alignItems:'center'
    // },
    // img:{
    //     width:'100%',
    //     height:300,
    // },
{/* <Image style={styles.img} source={{uri:selectedLetras.imageUrl}}/>
            <View style={styles.actions}>
            {/* <Button color={Colors.primary} title='Add To Cart' onPress={()=>{
                dispatch(cartActions.addToCart(selectedLetras));
            }}/> */}
            // </View>
            // <Text style={styles.prc}>${selectedLetras.price.toFixed(2)}</Text>
            // <Text style={styles.desc}>{selectedLetras.description}</Text> */}

            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Retencion:</Text>
            // <Text style={styles.val}>{selectedLetras.retencion}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Plazo tasa:</Text>
            // <Text style={styles.val}>{selectedLetras.plazot}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Tasa:</Text>
            // <Text style={styles.val}>{selectedLetras.tasa}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Fecha Descuento:</Text>
            // <Text style={styles.val}>{selectedLetras.fechaDescuento}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Gastos Iniciales:</Text>
            // <Text style={styles.val}>{selectedLetras.gastoInicial}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Gastos Finales:</Text>
            // <Text style={styles.val}>{selectedLetras.gastoFinal}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Fecha Emision:</Text>
            // <Text style={styles.val}>{selectedLetras.fechaEmision}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>retencion:</Text>
            // <Text style={styles.val}>{selectedLetras.retencion}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Valor nominal:</Text>
            // <Text style={styles.val}>{selectedLetras.valorNominal}</Text>
            // </View>
            // <View style={{ flexDirection:'row'}}>
            // <Text style={styles.title}>Capitalizacion:</Text>
            // <Text style={styles.val}>{selectedLetras.capitalizacion}</Text>
            // </View>