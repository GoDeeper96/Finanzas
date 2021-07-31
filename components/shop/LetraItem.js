import React from 'react';
// import Colors from '../../constants/Colors'
import {View,Text,Image,StyleSheet, TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native'
import Card from '../../UI/Card'
const LetraItem = props =>
{
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
            <View style={styles.headerSide}>
                <Text style={styles.titleInfo}>Titulo Cartera: </Text>
                <Text style={styles.titlest}>{props.titulo}</Text>
            </View>
                <Image style={styles.img} source={{uri:props.image}}/>
            </View>
            <View style={styles.detailsInfo}>
            <View style={styles.headerSide}>
                <Text style={styles.titleInfo}>ValorNominal: </Text>
                <Text style={styles.titlest}>S/.{props.valorNominal}</Text>
            </View>
            <View style={styles.headerSide}>
                <Text style={styles.titleInfo}>Tasa: </Text>
                <Text style={styles.titlest}>{props.tasa}%</Text>
            </View>
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
        height:'70%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },  
    detailsInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'9%',
        padding:5
    },
    headerSide:{
        flexDirection:'row',
        justifyContent:'center',
    },
    titlest:{
        fontSize:18,
        marginTop:15,
        marginVertical:4,
        fontFamily:'open-sans-bold',
    },
    titleInfo:{
        fontSize:18,
        marginTop:15,
        marginVertical:4,
        color:'#888',
        fontFamily:'open-sans-bold',
    },
    pricest:{
        fontSize:18,
        color:'#888',
        fontFamily:'open-sans-bold'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'22%',
        paddingHorizontal:5,
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

export default LetraItem;