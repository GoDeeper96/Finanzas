import React,{useState, useEffect,useCallback,useReducer,useRef} from 'react'
import {View, 
        Text, 
        Platform,
        StyleSheet,
        TextInput,
        Button,
        Alert,
        KeyboardAvoidingView,
        ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../UI/Card'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import * as letrasActions from '../../store/actions/letrasActions'
import Input from '../../UI/InputInterface'
import Colors from '../../constants/Colors'
import MyCustomPicker from '../../UI/MyCustomPicker'
import MyButton from '../../UI/ButtonComponent'
import MyButtonSpecial from '../../UI/ButtonSpecial'
import ImageSelector from '../../UI/ImageSelector'
import DateTimePicker from '@react-native-community/datetimepicker';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state,action)=>
{
    if(action.type===FORM_INPUT_UPDATE)
    {
        const UpdatedValues ={
            ...state.inputValues,
            [action.input]:action.value
        };
        const UpdatedValidities ={
            ...state.inputValidities,
            [action.input]:action.isValid
        }
        let updatedFormValidation = true;
        for(const key in UpdatedValidities)
        {
            updatedFormValidation = updatedFormValidation && UpdatedValidities[key];
        }
        return{
            formIsValid:updatedFormValidation,
            inputValidities:UpdatedValidities,
            inputValues:UpdatedValues,          
        }
    }
    return state;
}
const DiasAño =[
    '360',
    '365'
]
const PlazoTasas = [
    'Diario',
    'Quincenal',
    'Mensual',
    'Bimestral',
    'Trimestral',
    'Cuatrimestral',
    'Semestral',
    'Anual',

]
const motivos = [
    'Portes',
    'Fotocopias',
    'Comisión de estudio',
    'Comisión de desembolso',
    'Comisión de intermediación',
    'Gastos de administración',
    'Gastos Notariales',
    'Gastos Registrales',
    'Seguro',
    'Otros Gastos'

]
const TipoTasas = [
    'Tasa Simple',
    'Tasa Efectiva',
    'Tasa Nominal',

]
const valorUnidad = [
    'Soles',
    'Dolares',
    'Porcentaje',
]
const motivosFinales = [
    'Portes',
    'Gastos de administración',
    'Otros Gastos',

]
const EditProductScreen = props =>{
    // const letrId = props.navigation.getParam('productId');

    const letrId = props.route.params? props.route.params.letraId:null;
    const editedLetra = useSelector(state=>state.letras.userLetras.find(letr=>letr.id===letrId))
    const [isLoading,SetIsloading] = useState(false);
    const [isFinished,SetIfFinished] = useState(false);
    const [IsNexted, SetIsNexted] = useState(false);
    const [IsFinal, SetIsFinal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [error,SetIsError] = useState();
    const [modalOpenPT,setModalOpenPT] = useState(false);
    const [pT,setpT] = useState('');
    const [modalOpenDaños,setModalOpenDaños] = useState(false);
    const [Daños,setDaños] = useState('');
    const [modalOpenMotivo,setModalOpenMotivo] = useState(false);
    const [Motivo,setMotivo] = useState('');
    const [modalOpenTipoTasa,setmodalOpenTipoTasa] = useState(false);
    const [TipoTasa,setTipoTasa] = useState('');
    const [modalOpenValorE,setModalOpenValorE] = useState(false);
    const [ValorE,setValorE] = useState('');

    const [modalOpenMotivoF,setModalOpenMotivoF] = useState(false);
    const [MotivoF,setMotivoF] = useState('');
    const [SelectedImage, setSelectedImage] = useState();
    const dispatch=useDispatch();
    const [FechaGiro, setFechaGiro] = useState(new Date("03/25/2015"));
    const [FechaVen, setFechaVen] = useState(new Date("03/25/2015"));
    const [showFechaGiro, setShowFechaGiro] = useState(false);
    const [showFechaVen, setShowFechaVen] = useState(false);
    
  const onChangeFechaGiro = (event, selectedDate) => {
    const currentDate = selectedDate || FechaGiro;
    setShowFechaGiro(Platform.OS === 'ios');
    setFechaGiro(currentDate);
  };
  const onChangeFechaVen = (event, selectedDate) => {
    const currentDate = selectedDate || FechaVen;
    setShowFechaVen(Platform.OS === 'ios');
    setFechaVen(currentDate);
  };
  
  const showDatepickerFG = () => {
    setShowFechaGiro(true);
  };
  const showDatepickerFV = () => {
    setShowFechaVen(true);
  };


    const pickerRef = useRef();

    const imageTakenHandler = imagePath =>{
        setSelectedImage(imagePath);
    }
    const [formState, dispatchFormState]=useReducer(formReducer,{
         inputValues:{
             titulo:editedLetra?editedLetra.titulo:'',
             imageUrl:editedLetra?editedLetra.imageUrl:'',
             descripcion:editedLetra?editedLetra.descripcion:'',
             plazot:editedLetra?editedLetra.plazot:'',
             tasa:editedLetra?editedLetra.tasa:'',
             fechaDescuento:editedLetra?editedLetra.fechaDescuento:'',
             gastoInicial:editedLetra?editedLetra.gastoInicial:'',
             gastoFinal:editedLetra?editedLetra.gastoFinal:'',
             fechaEmision:editedLetra?editedLetra.fechaEmision:'',
             retencion:editedLetra?editedLetra.retencion:'',
             valorNominal:editedLetra?editedLetra.valorNominal:'',
         },
        inputValidities:{
            titulo:editedLetra?true:false,
            imageUrl:editedLetra?true:false,
            descripcion:editedLetra?true:false,
            plazot:editedLetra?true:false,
            tasa:editedLetra?true:false,
            fechaDescuento:editedLetra?true:false,
            gastoInicial:editedLetra?true:false,
            gastoFinal:editedLetra?true:false,
            fechaEmision:editedLetra?true:false,
            retencion:editedLetra?true:false,
            valorNominal:editedLetra?true:false,
        },
         formIsValid:editedLetra?true:false 
        });

    useEffect(()=>{
        if(error){
            Alert.alert('An error ocurred',
            error,
            [{text:'okay'}]);
        }
    },[error]);
    function open() {
        pickerRef.current.focus();
      }
      
      function close() {
        pickerRef.current.blur();
      }
    const submitHandler = useCallback(async () =>
    {   
        if(!formState.formIsValid)
        {
            Alert.alert('wrong input!','please check errors in the form',
            [
                {text:'Ok'}
            ]);
            return;
        }
        SetIsError(null);
        SetIsloading(true);
        
        try {
            if(editedLetra){
            
                await dispatch(letrasActions.updateLetra(
                    letrId,
                    formState.inputValues.titulo,
                    formState.inputValues.imageUrl,
                    formState.inputValues.descripcion,
                    formState.inputValues.plazot,
                    formState.inputValues.tasa,
                    formState.inputValues.fechaDescuento,
                    formState.inputValues.gastoInicial,
                    formState.inputValues.gastoFinal,
                    formState.inputValues.fechaEmision,
                    formState.inputValues.retencion,
                    formState.inputValues.valorNominal,))
            }
            else{
                await dispatch(letrasActions.createLetra(
                    formState.inputValues.titulo,
                    formState.inputValues.imageUrl,
                    formState.inputValues.descripcion,
                    formState.inputValues.plazot,
                    formState.inputValues.tasa,
                    formState.inputValues.fechaDescuento,
                    formState.inputValues.gastoInicial,
                    formState.inputValues.gastoFinal,
                    formState.inputValues.fechaEmision,
                    formState.inputValues.retencion,
                    formState.inputValues.valorNominal));
            }
            props.navigation.goBack();
        } catch (err) {
            SetIsError(err.message);
        }
       
        SetIsloading(false);
       
    },[dispatch,letrId,formState]);
    const RecognizeYourChild = (TipoTasa) =>{
        
    }
    const AgregaMotivos = () =>{
        
    }
    const Reconstruct = () => {
        try {
          submitHandler();  
          props.navigation.navigate('Resultados');
        } catch (error) {
            console.log(error);
        }
    }

    const validateInitialData = () =>{
        // SetIfFinished(true);
        SetIsNexted(true);
       console.log(IsNexted);
    }
    const validacionFinal = () =>{
        // SetIfFinished(true);
        SetIsFinal(true);
       console.log(IsFinal);
    }
    const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {

        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid : inputValidity,
            input:inputIdentifier
        })
    },[dispatchFormState]);
    const Please = () =>{
        console.log("works")
    }
    if(isLoading)
    {   
        return(
        <View style={styles.ct}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>);
    }
    if(IsFinal)
    {
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={-100}>
            <ScrollView style={{margin:10}}>
             <View style={{justifyContent:'center',alignItems:'center',marginVertical:5}}>
                <Text style={styles.HeaderFinales}>Datos Finales</Text>
             </View>
             {showFechaGiro && (
                <DateTimePicker
                testID="dateTimePicker"
                value={FechaGiro}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeFechaGiro}
                />
            )}
            {showFechaVen && (
                <DateTimePicker
                testID="dateTimePicker"
                value={FechaVen}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeFechaVen}
                />
            )}
            
             
                  <Input
                id='Vnominal'
                label='Valor Nominal:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='Retencion'
                label='Retencion:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Card style={styles.card}>
                <MyButton value={FechaVen.toLocaleDateString()} HandlerOnPress={showDatepickerFV}>Fecha de Vencimiento
                </MyButton>
                <MyButton value={FechaGiro.toLocaleDateString()} HandlerOnPress={showDatepickerFG}>Fecha de Giro
                </MyButton>
            </Card>
                    <Card style={styles.card}>
                        <ScrollView>
                            <MyButton value={MotivoF} HandlerOnPress={()=>setModalOpenMotivoF(!modalOpenMotivoF)}>Gastos Finales
                            </MyButton>
                            <MyButtonSpecial style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
    
                            }} value={ValorE} HandlerOnPress={()=>setModalOpenValorE(!modalOpenValorE)}>Tipo de valor:
                            </MyButtonSpecial>
                                <Input
                                style={{
                                    fontFamily:'open-sans-bold',
                                    marginVertical:12,
                                    marginLeft:12,
                                    color:'black',
                                }}
                                id='VNumerico'
                                label ='Valor Numerico:'
                                errorText='X'
                                keyboardType='decimal-pad'
                                returnKeyType='next'   
                                onInputChange ={InputChangeHandler}
                                initialValue={editedLetra?editedLetra.gastoFinal:''}
                                initiallyValid ={!!editedLetra}
                                required
                                
                                />    
                                
                                {/* <View style={styles.btncontainer}>
                        <Button color={Colors.accent} title='Agregar Motivo' onPress={()=>AgregaMotivos(MotivoF)}/>
                        </View>                           */}
                        </ScrollView>
                        
                    </Card>
                    <View>    
                    <MyCustomPicker
                    setModalOpen={setModalOpenMotivoF}
                    modalOpen={modalOpenMotivoF} 
                    value={MotivoF} 
                    setValue={setMotivoF}
                    items = {motivosFinales}
                    />
                    </View>  
                    <MyCustomPicker
                    setModalOpen={setModalOpenValorE}
                    modalOpen={modalOpenValorE} 
                    value={ValorE} 
                    setValue={setValorE}
                    items = {valorUnidad}
                    />             
             </ScrollView>
             <Button color={Colors.primary} title="VER RESULTADOS" onPress={()=>{Reconstruct}}/>   
             </KeyboardAvoidingView>)
    }
    if(IsNexted)
    {
        return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView style={{margin:10}}>
         <View style={{justifyContent:'center',alignItems:'center',marginVertical:5}}>
            <Text style={styles.HeaderFinales}>Datos Iniciales</Text>
         </View>   
                <Card style={styles.card}>
                    <ScrollView>
                        <MyButton value={Motivo} HandlerOnPress={()=>setModalOpenMotivo(!modalOpenMotivo)}>Motivo
                        </MyButton>
                        <MyButtonSpecial style={{
                            flexDirection:'row',
                            justifyContent:'space-between',

                        }} value={ValorE} HandlerOnPress={()=>setModalOpenValorE(!modalOpenValorE)}>Tipo de valor:
                        </MyButtonSpecial>
                            <Input
                            style={{
                                fontFamily:'open-sans-bold',
                                marginVertical:12,
                                marginLeft:12,
                                color:'black',
                                flexDirection:'row',
                                width:'70%',
                            }}
                            Visible={true}
                            id='VNumerico'
                            label = 'Valor Numerico:'
                            errorText='X'
                            keyboardType='decimal-pad'
                            returnKeyType='next'   
                            onInputChange ={InputChangeHandler}
                            initialValue={editedLetra?editedLetra.gastoInicial:''}
                            initiallyValid ={!!editedLetra}
                            required
                            min={0.1}
                            />                              
                    </ScrollView>
                    {/* <View style={styles.btncontainer}>
                    <Button color={Colors.accent} title={'Agregar Motivo'}/>
                    </View> */}
                </Card>
                <ImageSelector onImageTaken={imageTakenHandler}/> 
                <View>    
                <MyCustomPicker
                setModalOpen={setModalOpenMotivo}
                modalOpen={modalOpenMotivo} 
                value={Motivo} 
                setValue={setMotivo}
                items = {motivos}
                />
                </View>  
                <MyCustomPicker
                setModalOpen={setModalOpenValorE}
                modalOpen={modalOpenValorE} 
                value={ValorE} 
                setValue={setValorE}
                items = {valorUnidad}
                />             
         </ScrollView>
         <Button color={Colors.primary} title="Continuar" onPress={validacionFinal}/>   
         </KeyboardAvoidingView>)
    }
     return (
         <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={-180}>
         <ScrollView style={{margin:10}} >
         <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.HeaderInicial}>Datos iniciales</Text>
         </View>    
                <Input
                id='tituloLetra'
                label='Titulo:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='descripcionLetra'
                label='Descripción:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                
                <MyButton value={Daños} HandlerOnPress={()=>setModalOpenDaños(!modalOpenDaños)}>Seleccione Dias por año
                </MyButton>
                <MyCustomPicker
                setModalOpen={setModalOpenDaños}
                modalOpen={modalOpenDaños} 
                value={Daños} 
                setValue={setDaños}
                items = {DiasAño}
                />
                {/* TIPO DE TASAS */}
                <MyCustomPicker
                setModalOpen={setmodalOpenTipoTasa}
                modalOpen={modalOpenTipoTasa} 
                value={TipoTasa} 
                setValue={setTipoTasa}
                items = {TipoTasas}
                />
                 <Card style={styles.card}>
                    <ScrollView>
                    <MyButton value={TipoTasa} HandlerOnPress={()=>setmodalOpenTipoTasa(!modalOpenTipoTasa)}>Seleccione Tipo de Tasa
                        </MyButton>
                    <Input
                            id='tasa'
                            label='Tasa:'
                            errorText='X'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            autoCorrect
                            returnKeyType='next'
                            placeholder ='23.4344444' 
                            onInputChange ={InputChangeHandler}
                            initialValue={editedLetra?editedLetra.tasa:''}
                            initiallyValid ={!!editedLetra}
                            required
                            />
                   
                    </ScrollView>
                </Card> 
                <MyCustomPicker
                setModalOpen={setModalOpenPT}
                modalOpen={modalOpenPT} 
                value={pT} 
                setValue={setpT}
                items = {PlazoTasas}
                />
                <Card style={styles.card}>
                    <ScrollView>
                    <MyButton value={pT} HandlerOnPress={()=>setModalOpenPT(!modalOpenPT)}>Seleccione Plazo de Tasa
                        </MyButton>
                            <Input
                            id='NumPeriodoTasa'
                            label = 'Valor:'
                            errorText='X'
                            keyboardType='default'
                            returnKeyType='next' 
                            onInputChange ={InputChangeHandler}
                            initialValue={editedLetra?editedLetra.imageUrl:''}
                            initiallyValid ={!!editedLetra}
                            required
                            />       
                    </ScrollView>
                </Card> 
               
         </ScrollView>
         <Button color={Colors.primary} title="Continuar" onPress={validateInitialData}/>  
         </KeyboardAvoidingView>
     )
}


export const screenOptions = navData =>{
    // const sub= navData.route.params ? navData.route.params.submit:null;
    const routeParams = navData.route.params ? navData.route.params : {}
    return{
        headerTitle:routeParams.letraId
        ?'Editar Letra'
        :'Agregar Letra',
        // headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
        // <Item title='Save' iconName={Platform.OS==='android' ? 'md-checkmark':'ios-checkmark'} onPress={sub}/>
        // </HeaderButtons>)
    }
}
const styles = StyleSheet.create({
    btncontainer:{
        marginTop:10,

    },
    card:{
        marginHorizontal:50,
        marginVertical:10,
        backgroundColor:'#EAEBEC',
    },  
    form:
    {

        margin:20,
        marginVertical:8,
    },
    HeaderInicial:{
        justifyContent:'center',
        alignItems: 'center',

    },
    HeaderFinales:{

    },
    ct:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default EditProductScreen;

