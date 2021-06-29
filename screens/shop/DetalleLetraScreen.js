import React from 'react'
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import Card from '../../UI/Card';
const DetalleLetraScreen = props =>{
    const letraId = props.route.params.letraId;
    const selectedLetras = useSelector(state =>
        state.letras.availableLetras.find(letr => letr.id === letraId)
      );
      const LlevameAListaResultados = ()=>{
          //LLEVA A RESULTADOS FIND SEGUN ID DE LETRA
      }
    return (
        <ScrollView>
            <Card>
                <View style={styles.rw}>
                <Text style={styles.prc}>{selectedLetras.titulo}</Text>
                <Text style={styles.desc}>{selectedLetras.descripcion}</Text>
                <Text style={styles.prc}>{selectedLetras.retencion}</Text>
                <Text style={styles.desc}>{selectedLetras.plazot}</Text>
                <Text style={styles.prc}>{selectedLetras.tasa}</Text>
                <Text style={styles.desc}>{selectedLetras.fechaDescuento}</Text>
                <Text style={styles.prc}>{selectedLetras.gastoInicial}</Text>
                <Text style={styles.desc}>{selectedLetras.gastoFinal}</Text>
                <Text style={styles.desc}>{selectedLetras.fechaEmision}</Text>
                <Text style={styles.desc}>{selectedLetras.retencion}</Text>
                <Text style={styles.desc}>{selectedLetras.valorNominal}</Text>
                <Text style={styles.desc}>{selectedLetras.capitalizacion}</Text>
                </View>
            </Card> 
            <Button title="Ver Resultados" onPress={()=>{LlevameAListaResultados}}/>
        </ScrollView>
    )

};

export const screenOptions = navData=>{
    return {
        headerTitle: navData.route.params.letraTitle
    }
}

const styles = StyleSheet.create({
    rw:{
        flexDirection:'column',
        justifyContent:'space-between',

    },
    desc:
    {
        fontSize:18,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily:'open-sans-bold'
    },
    prc:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
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