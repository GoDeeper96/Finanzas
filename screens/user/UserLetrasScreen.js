import React,{useState,useEffect,useCallback} from 'react';
import { FlatList,Text,Platform,Button, ActivityIndicator,View,StyleSheet,Alert }from 'react-native'
import {useSelector,useDispatch}from 'react-redux'
import LetraItem  from '../../components/shop/LetraItem'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as LetrasActions from '../../store/actions/letrasActions'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
const UserLetrasScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,SetIsRefreshing] = useState(false);
    const [err,SetErr] = useState();
    const[deleting,setDelete]=useState(false);
    // const products = useSelector(state=>state.products.availableProducts);
    const dispatch = useDispatch();
    const userLetras = useSelector(state=>state.letras.userLetras);
    const loadLetras =useCallback (async () =>{
        SetErr(null);
        SetIsRefreshing(true);
        try {
            await dispatch(LetrasActions.fetchLetras())
        } catch (error) {
            SetErr(error.messsage)
        }
        SetIsRefreshing(false);
    },[dispatch,setIsLoading,SetErr])
    useEffect(()=>
    {
        const unsubscribe = props.navigation.addListener('focus',loadLetras);
        return () =>{
            unsubscribe();
        }
    },[loadLetras])
    useEffect(()=>{
        // console.log("works")
        // console.log(userLetras);
        setIsLoading(true);
        loadLetras().then(()=>{
            setIsLoading(false);
        })
    },[dispatch,loadLetras])
    const selectItemHandler = (id) =>{
        console.log("manda id de letra:"+id);
        props.navigation.navigate('Resultados',{
            letraId: id,
        })
    }
    const editLetrasHandler = (id) =>
    {
        props.navigation.navigate('EditarLetras',{
            letraId: id,
        })
    }

    const deleteHandler = useCallback(async(id)=>
    {
        SetErr(null);
        SetIsRefreshing(true);
        try {
            await dispatch(LetrasActions.deleteLetra(id))  
                       
            setIsLoading(true);
            loadLetras().then(()=>{
                setIsLoading(false);
            })
            setDelete(true);
        } catch (error) {
            SetErr(error.messsage)
        }
        SetIsRefreshing(false);
        await dispatch(ResultadosActions.deleteResultados(id));      
    },[dispatch,setIsLoading,SetErr])
    // if(err){
    //     return (
    //     <View style={styles.ct}>
    //         <Text>An error ocurred!</Text>
    //         <Button title='Try again' onPress={loadProducts} color={Colors.primary}/>
    //     </View>
    //     );
    // }
    if(isLoading)
    {
        return (<View style={styles.ct}>
            <ActivityIndicator size='large' color={Colors.accent}/>
        </View>);
    }
    if(userLetras.length===0){
        console.log(userLetras.length)
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No hay letras, quizá deberías agregar algunas?</Text>
        </View>)
    }
    return (<FlatList data={userLetras} keyExtractor={item=>item.idLetra} 
    renderItem={itemData => 
    <LetraItem 
    image={itemData.item.SelectedImage} 
    onSelect={()=>{selectItemHandler(itemData.item.idLetra)}}
    titulo={itemData.item.titulo}
    valorNominal={itemData.item.valorNominal}>
         <Button color={'black'}  title="Detalles" onPress={()=>{selectItemHandler(itemData.item.idLetra)}}/>
        <Button color={'black'} title="Agregar" onPress={()=>{editLetrasHandler(itemData.item.idLetra)}}/>
        <Button color={'black'} title="Eliminar cartera" onPress={deleteHandler.bind(this,itemData.item.idLetra)}/>
    </LetraItem>}/>);                                 
};
export const screenOptions = navData => {
    return {
    headerTitle: 'Mis carteras',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Menu' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>{
    navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>),
    headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Add' iconName={Platform.OS==='android' ? 'md-create':'ios-create'} onPress={()=>{
    navData.navigation.navigate('EditarLetras')}}/>
    </HeaderButtons>)
    }
}
const styles = StyleSheet.create({
    ct:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    }
})

export default UserLetrasScreen;