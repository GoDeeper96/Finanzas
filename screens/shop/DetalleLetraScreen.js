import React from 'react'
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors'
import Card from '../../UI/Card';
const DetalleLetraScreen = props =>{
    const letraId = props.route.params.letraId;
    const selectedLetras = useSelector(state =>
        state.letras.availableLetras.find(letr => letr.idLetra === letraId)
      );
     
      
      const LlevameAListaResultados = ()=>{
          //LLEVA A RESULTADOS FIND SEGUN ID DE LETRA
          props.navigation.navigate('Resultados',{
            letraId: letraId
        })
      }
      console.log("here"+selectedLetras)
    return (
            <View style={styles.rw}>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Titulo:</Text>
                <Text style={styles.val}>{selectedLetras.titulo}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Descripcion:</Text>
                <Text style={styles.val}>{selectedLetras.descripcion}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Retencion:</Text>
                <Text style={styles.val}>{selectedLetras.retencion}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Plazo tasa:</Text>
                <Text style={styles.val}>{selectedLetras.plazot}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Tasa:</Text>
                <Text style={styles.val}>{selectedLetras.tasa}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Fecha Descuento:</Text>
                <Text style={styles.val}>{selectedLetras.fechaDescuento}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Gastos Iniciales:</Text>
                <Text style={styles.val}>{selectedLetras.gastoInicial}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Gastos Finales:</Text>
                <Text style={styles.val}>{selectedLetras.gastoFinal}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Fecha Emision:</Text>
                <Text style={styles.val}>{selectedLetras.fechaEmision}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>retencion:</Text>
                <Text style={styles.val}>{selectedLetras.retencion}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Valor nominal:</Text>
                <Text style={styles.val}>{selectedLetras.valorNominal}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                <Text style={styles.title}>Capitalizacion:</Text>
                <Text style={styles.val}>{selectedLetras.capitalizacion}</Text>
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

                <Button title="Ver Resultados" onPress={()=>{LlevameAListaResultados()}}/>
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