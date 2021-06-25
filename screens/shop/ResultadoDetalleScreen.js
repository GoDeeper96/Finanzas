//RESUMEN DE LETRA
//RESUMEN DE RESULTADO
import React from 'react'
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import ResultadosItem from '../../components/shop/ResultadoLetra'
import LetraItem  from '../../components/shop/LetraItem'
const ResultadoDetalleScreen = props =>{
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
      );
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <ResultadosItem/>
            <LetraItem/>
        </ScrollView>
    )

};

export const screenOptions = navData=>{
    return {
        headerTitle: navData.route.params.productTitle
    }
}

const styles = StyleSheet.create({
    actions:{
        marginVertical:10,
        alignItems:'center'
    },
    img:{
        width:'100%',
        height:300,
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
export default ResultadoDetalleScreen