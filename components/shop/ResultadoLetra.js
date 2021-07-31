import React,{useState} from 'react';
import Colors from '../../constants/Colors'
import {View,Text,Image,StyleSheet,Button, TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Card from '../../UI/Card'
const ResultadosItems = props =>
{
    const [showDetails,setShowDetails] = useState(false);
    let Touch=TouchableOpacity;
    if(Platform.OS==='android'&& Platform.Version>=21)
    {
        Touch=TouchableNativeFeedback
    }
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <Touch onPress={props.onSelect} useForeground>       
            <View style={styles.detailsInfo}>
                <Text style={styles.titlest}>TCEA: {props.tcea*100}%</Text>
                <Text style={styles.pricest}>Valor Entregado: S/.{props.valorEntregado}</Text>
                <Text style={styles.pricest}>Valor Recibido: S/.{props.valorRecibido}</Text>
                <Text style={styles.pricest}>Descuento: {props.descuento}</Text>
                <Text style={styles.pricest}>Valor Neto: S/.{props.valorNeto}</Text>
                <Text style={styles.pricest}>dias: {props.dias}</Text>
                <Text style={styles.pricest}>Fecha de inicio de letra: {props.fechaInicio}</Text>
                <Text style={styles.pricest}>Fecha vencimiento: {props.fechaVencimiento}</Text>
                <Text style={styles.pricest}>Valor Nominal: S/.{props.valorNominalLetra}</Text>
                <Text style={styles.pricest}>Tasa: {props.tasa}%</Text>
            </View>
            </Touch>
        </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    touchable:{
        borderRadius:10,
        overflow:'hidden'
    },
    detailsInfo:{
        alignItems:'center',
        height:'100%',
        padding:10
    },
    titlest:{
        fontSize:18,
        marginVertical:4,
        fontFamily:'open-sans-bold',
    },
    pricest:{
        fontSize:14,
        color:'#888',
        fontFamily:'open-sans-bold'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'100%',
        paddingHorizontal:20,
    },
    product:
    {
        height:240,
        margin:20,

    },
})
export default ResultadosItems;


// <Card style={styles.OrderMain}>
//         <View style ={styles.summary}>
//             <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
//             <Text style={styles.date}>{props.date}</Text>
//         </View>
//         <Button color={Colors.primary} title={showDetails?'Hide Details':"Show Details"}
//         onPress={()=>{setShowDetails(prevState=>!prevState)}}/>
//         {showDetails&&
//             <View style={styles.detailsItems}>
//                 {props.items.map(cartItem=>
//                 <CartItem 
//                 key={cartItem.productId}
//                 quantity={cartItem.quantity}
//                 amount={cartItem.sum} 
//                 title={cartItem.productTitle}/>)}
//             </View>}
//     </Card>