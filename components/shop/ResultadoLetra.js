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
        <View>
            <View style={styles.imageSt}>
                <Image style={styles.img} source={{uri:props.imagen}}/>
            </View>
            <View style={styles.detailsInfo}>
                <Text style={styles.titlest}>{props.valorRecibido}</Text>
                <Text style={styles.pricest}>${props.tcea}</Text>
            </View>     
            <View style={styles.actions}> 
            {props.children}
                {/* <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/> */}
            </View>
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
    imageSt:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },  
    detailsInfo:{
        alignItems:'center',
        height:'15%',
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
        height:'22%',
        paddingHorizontal:20,
    },
    product:
    {
        height:300,
        margin:20,

    },
    img:
    {
        width:'100%',
        height:'100%',
    }
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