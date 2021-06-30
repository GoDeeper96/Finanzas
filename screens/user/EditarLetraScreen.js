import React,{useState, useEffect,useCallback,useReducer,useRef} from 'react'
import {View, 
        Text, 
        Platform,
        StyleSheet,
        // TextInput,
        Button,
        Alert,
        KeyboardAvoidingView,
        TouchableOpacity,
        ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../UI/Card'
import { TextInput } from 'react-native-paper';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import * as letrasActions from '../../store/actions/letrasActions'
import * as ResultadosActions from '../../store/actions/ResultadosActions'
import Input from '../../UI/InputInterface'
import Colors from '../../constants/Colors'
import MyCustomPicker from '../../UI/MyCustomPicker'
import MyButton from '../../UI/ButtonComponent'
import MyButtonSpecial from '../../UI/ButtonSpecial'
import ImageSelector from '../../UI/ImageSelector'
import DateTimePicker from '@react-native-community/datetimepicker';
import Fancy from '../../UI/fancyAlert'
import FancyResultados from '../../UI/fancyResultados'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    'Especial',
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
    const editedLetra = useSelector(state=>state.letras.userLetras.find(letr=>letr.idLetra===letrId))
    const userLetras = useSelector(state=>state.letras.userLetras)
    // console.log("here"+userLetras.map(x=>x.idLetra))
    // console.log(letrId);
    // console.log(editedLetra);
    const dispatch=useDispatch();
    const [IsNexted, SetIsNexted] = useState(false);
    const [IsFinal, SetIsFinal] = useState(false);

    const [isLoading,SetIsloading] = useState(false);
    const [error,SetIsError] = useState();

    const [modalOpenPT,setModalOpenPT] = useState(false);
    const [pT,setpT] = useState('');
    const [modalOpenDaños,setModalOpenDaños] = useState(false);
    const [Daños,setDaños] = useState('');
    const [modalOpenMotivo,setModalOpenMotivo] = useState(false);
    const [modalOpenTipoTasa,setmodalOpenTipoTasa] = useState(false);
    const [TipoTasa,setTipoTasa] = useState('');
    const [modalOpenValorE,setModalOpenValorE] = useState(false);


    const [UnidadInicialValor,setUnidadInicialValor] = useState('');
    const [UnidadFinalValor,setUnidadFinalValor] = useState('');

    const [modalOpenMotivoF,setModalOpenMotivoF] = useState(false);

    const [MotivoGastoFinal,setMotivoFinal] = useState('');
    const [MotivoGastoInicial,setMotivoInicial] = useState('');

    const [GoToPrincipal,SetGoToPrincipal] = useState(false);

    const [SelectedImage, setSelectedImage] = useState();
   
    
    const [showFechaGiro, setShowFechaGiro] = useState(false);
    const [showFechaVen, setShowFechaVen] = useState(false);
    

    const [visibleForInicial, setVisibleForInicial] = React.useState(false);
    const toggleAlertInicial = React.useCallback(() => {
        setVisibleForInicial(false);
            SetGastoInicial(0);
            setMotivoInicial('');
            setUnidadInicialValor('');
        
    }, [visibleForInicial,gastoInicial,MotivoGastoInicial,UnidadInicialValor]);

    const [visibleForFinal, setVisibleForFinal] = React.useState(false);
    const toggleAlertFinal = React.useCallback(() => {
        setVisibleForFinal(false);
        SetGastoFinal(0);
        setMotivoFinal('');
        setUnidadFinalValor('');      
    }, [visibleForFinal,gastoFinal,MotivoGastoFinal,UnidadFinalValor]);
    
    const [visibleForResultados, setVisibleForResultados] = React.useState(false);
    const toggleAlertResultados = React.useCallback(() => {
        setVisibleForResultados(false);    
        props.navigation.goBack();
    }, [visibleForResultados]);
      

    //VALIDACIONES PARA TECLADO
    const [editable,SetEditable]=useState(true);
    // DATOS DE CLASE RESULTADO
    const [res,SetRes]=useState({
            periodo:0,
            valorRecibido:0,
            TotalGastoInicial:0,
            TotalGastoFinal:0,
            tcea:0,
            valorNeto:0,
            descuento:0,
            valorNominal:0,
            capitalizacion:0,
    });
    const [IdLetra,SetIdLetra]=useState('');
    // DATOS DE CLASE LETRA
    const [titulo,         SetTitulo]= useState('')
    const [descripcion,    SetDescripcion]= useState('')
    const [FechaGiro,      setFechaGiro] = useState(new Date("03/25/2015"));
    const [FechaVen,       setFechaVen] = useState(new Date("03/25/2015"));
    const [plazot,         SetPlazot]= useState(0)
    const [tasa,           SetTasa]= useState(0)

    const [gastoInicial,   SetGastoInicial]= useState(0)
    const [gastoFinal,     SetGastoFinal]= useState(0)

    const [retencion,      SetRetencion]= useState(0)
    const [valorNominal,   SetValorNominal]= useState(0)

    const [capitalizacion, SetCapitalizacion]= useState(0)
    const [HayResultados,SetHayResultados]= useState(false)

    const [GastoArrayInicial,SetGastoArrayInicial] = useState([]);
    const [GastoArrayFinal,SetGastoArrayFinal] = useState([]);
    const addGastoInicial = ()=>{
        SetGastoArrayInicial([...GastoArrayInicial,{
            MotivoGastoInicial:MotivoGastoInicial,
            TipoValor:UnidadInicialValor,
            valor:parseInt(isNaN(gastoInicial)?0:gastoInicial)
        }])
        
        setVisibleForInicial(true);
        // console.log(GastoArrayInicial);
    }

    const addGastoFinal = ()=>{
        SetGastoArrayFinal([...GastoArrayFinal,{
            MotivoGastoInicial:MotivoGastoFinal,
            TipoValor:UnidadFinalValor,
            valor:parseInt(isNaN(gastoFinal)?0:gastoFinal)
        }])
        
        setVisibleForFinal(true);
        // console.log(GastoArrayFinal);
    }

   

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
    //   console.log(pT);
      
    //   useEffect(()=>{
    //     onChangePlazoTasa();
    //   },[setpT])
    const toFixed = (x) => {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }
    const Algoritmo = () =>{
         //Calcular periodo
        //  console.log(pT);
        // 
        let otherplazo=0;
        console.log(pT);
        if(pT==="Mensual"){
            SetPlazot(30);
            otherplazo=30;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        if(pT==="Bimestral"){
            SetPlazot(60);
            otherplazo=60;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        if(pT==="Trimestral"){
            SetPlazot(90);
            otherplazo=90;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        if(pT==="Cuatrimestral"){
            SetPlazot(120)
            otherplazo=120;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        if(pT==="Semestral"){
            SetPlazot(180)
            otherplazo=180;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        if(pT==="Anual"){
            SetPlazot(360)
            otherplazo=360;
            console.log("plazo:"+plazot)
            console.log("plazo:"+otherplazo)
        }
        let periodo=0;
        let t=0;
        let m=0;
        let n=0;
        let tasadescuento=0;
        let descuento=0;
        let valorNeto=0;
        let valorRecibido=0;
        let valorEntregado=0;
        let tcea=0;
        let arrayGastosI = []
        let sumArrayI = 0
        arrayGastosI = GastoArrayInicial.map(item=>item.valor);
        for(let x   in arrayGastosI){
            sumArrayI = sumArrayI + arrayGastosI[x]   
        }
        
        let arrayGastosF = []
        let sumArrayF = 0
        arrayGastosF = GastoArrayFinal.map(item=>item.valor);
        for(let x   in arrayGastosF){
            sumArrayF = sumArrayF + arrayGastosF[x]   
        }
        periodo = Math.round((FechaVen-FechaGiro) / (1000 * 60 * 60 * 24));
        //Calcular tasa
        
        if(TipoTasa=="Tasa Nominal"){
            m = otherplazo/capitalizacion;
            n = periodo/capitalizacion;
            t = Math.pow(1+(tasa/m),n)-1;
            t = toFixed(t);
            console.log(m,n,t);
            console.log(otherplazo+  " " +capitalizacion);
        }
        if(TipoTasa==="Tasa Efectiva"){
            t = Math.pow((1+tasa),periodo/otherplazo)-1;
            t = toFixed(t);
            t = parseFloat(t.toPrecision(7));
        }
        //Calcular Tasa descuento
        tasadescuento = t/(t+1.00);
        tasadescuento = parseFloat(tasadescuento.toFixed(7));
        //Calcular Descuento
        descuento = valorNominal*(tasadescuento);
        descuento = parseFloat(descuento.toFixed(2));
        //Valor Neto
        valorNeto=valorNominal-descuento;
        valorNeto = parseFloat(valorNeto.toFixed(2))
        //Valor a Recibir
        valorRecibido=valorNeto-gastoInicial-retencion;
        valorRecibido = parseFloat(valorRecibido.toFixed(2));
        console.log(valorNominal + " - "+ descuento);
        //Valor a Entregar
        valorEntregado=valorNominal+gastoFinal-retencion;
        valorEntregado = parseFloat(valorEntregado.toFixed(2))
        //tcea
        tcea=Math.pow(( valorEntregado/valorRecibido), 360/periodo) - 1;
        console.log("asdas"+tcea+"asdasd"+tcea);
        SetRes({
            periodo:periodo,
            valorRecibido:valorRecibido,
            TotalGastoInicial:sumArrayI,
            TotalGastoFinal:sumArrayF,
            tcea:tcea,
            valorNeto:valorNeto,
            descuento:descuento,
            valorNominal:valorNominal,
            capitalizacion:capitalizacion,
        })
        // ResultadosLetra ={
        //     periodo:periodo,
        //     valorRecibido:valorRecibido,
        //     TotalGastoInicial:sumArrayI,
        //     TotalGastoFinal:sumArrayF,
        //     tcea:tcea,
        //     valorNeto:valorNeto,
        //     descuento:descuento,
        //     valorNominal:valorNominal,
        //     capitalizacion:capitalizacion,
        // }
    }
    const loadData = async ()=>{
      
        try {
            let id= await AsyncStorage.getItem('idLetra');
            await dispatch(ResultadosActions.createResultado(
                id?id:letrId,
                SelectedImage,
                res.periodo,
                res.valorRecibido,
                res.TotalGastoInicial,
                res.TotalGastoFinal,
                res.tcea,
                res.valorNeto,
                res.descuento,            
                ))
          
        } catch (err) {
          Alert.alert('OOPS','something went wrong');
        }
        AsyncStorage.clear();
      }
    const submitHandler = useCallback(async () =>
    {   
        
        let arrayGastosI = []
        let sumArrayI = 0
        arrayGastosI = GastoArrayInicial.map(item=>item.valor);
        for(let x   in arrayGastosI){
            sumArrayI = sumArrayI + arrayGastosI[x]   
        }
        
        let arrayGastosF = []
        let sumArrayF = 0
        arrayGastosF = GastoArrayFinal.map(item=>item.valor);
        for(let x   in arrayGastosF){
            sumArrayF = sumArrayF + arrayGastosF[x]   
        }
        try {
            console.log(editedLetra);
            if(editedLetra){

                await dispatch(letrasActions.updateLetra(
                    letrId,
                    titulo,  
                    SelectedImage,
                    descripcion,  
                    plazot,   
                    tasa, 
                    FechaVen,                                          
                    sumArrayI,  
                    sumArrayF, 
                    FechaGiro,     
                    retencion,     
                    valorNominal,  
                    capitalizacion))
                    // var1=var1+var2;

            }
            else{
                //     
                 
                // AQUI :V
                await dispatch(letrasActions.createLetra(
                    titulo,
                    SelectedImage,
                    descripcion,                              
                    plazot,        
                    tasa,    
                    FechaVen,            
                    sumArrayI,  
                    sumArrayF,  
                    FechaGiro,   
                    retencion,     
                    valorNominal,  
                    capitalizacion));

            }

            loadData();
            Algoritmo();
            
            setVisibleForResultados(true);
            SetHayResultados(true);
           
        } catch (err) {
            SetIsError(err.message);
        }
       
        SetIsloading(false);
       
    },[dispatch,letrId,titulo,descripcion,FechaGiro,FechaVen,plazot,tasa,gastoInicial,gastoFinal,retencion,valorNominal,capitalizacion]);


 
    const validateInitialData = () =>{
        // SetIfFinished(true);
        SetIsNexted(true);
    //    console.log(IsNexted);
    }
    const validacionFinal = () =>{
        // SetIfFinished(true);
        SetIsFinal(true);
    //    console.log(IsFinal);
    }


    const onChangeValorNominal = (vnominal) =>{
        SetValorNominal(vnominal)
    }
    const onChangeRetencion = (retencion) =>{
        SetRetencion(retencion)
    }
    const onChangeGastoInic = (gastoInic) =>{
        SetGastoInicial(gastoInic)
    }
    const onChangeGastoFinal = (gastoFinal) =>{
        SetGastoFinal(gastoFinal)
    }
    const onChangeTitulo = (titulo) =>{
        SetTitulo(titulo)
    }
    const onChangeDescripcionLetra = (DescLetra) =>{
        SetDescripcion(DescLetra)
    }
    const onChangeTasa = (Tasa) =>{
        SetTasa(Tasa)
    }
    const onChangePlazoTasa = () =>{

        if(pT==="Mensual"){
            SetPlazot(30);
        }
        if(pT==="Bimestral"){
            SetPlazot(60);
        }
        if(pT==="Trimestral"){
            SetPlazot(90);
        }
        if(pT==="Cuatrimestral"){
            SetPlazot(120)
        }
        if(pT==="Semestral"){
            SetPlazot(180)
        }
        if(pT==="Anual"){
            SetPlazot(360)
        }
        console.log(plazot)        

    }
    // useEffect(()=>
    // {
    //     console.log("WHAT THE FUCK IS HAPPENING"+id);
    //     if(IdLetra)
    //     {
    //         dispatch(ResultadosActions.createResultado(
    //             IdLetra,
    //             SelectedImage,
    //             res.periodo,
    //             res.valorRecibido,
    //             res.TotalGastoInicial,
    //             res.TotalGastoFinal,
    //             res.tcea,
    //             res.valorNeto,
    //             res.descuento,            
    //             ))
    //     }
    // },[SetIdLetra])
    if(HayResultados)
    { 
        
        return(
            <FancyResultados
            visible={visibleForResultados}
            periodo={res.periodo}
            valorRecibido={res.valorRecibido}
            sumArrayI={res.TotalGastoInicial}
            sumArrayF={res.TotalGastoFinal}
            tcea={res.tcea}
            valorNeto={res.valorNeto}
            descuento={res.descuento}
            valorNominal={res.valorNominal}
            capitalizacion={res.capitalizacion}
            toggle={toggleAlertResultados}
            />
        )

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
            <Fancy
            visible={visibleForFinal}
            MotivoGasto={MotivoGastoFinal}
            TipoValor={UnidadFinalValor}
            ValorAgregado={gastoFinal}
            toggle={toggleAlertFinal}
            />
            
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
                editable={true}
                keyboardType='decimal-pad'
                // onEndEditing={}
                // onSubmitEditing={}
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                value = {valorNominal}
                onChangeHandler={onChangeValorNominal}
                required
                />
                <Input
                id='Retencion'
                label='Retencion:'
                editable={true}
                keyboardType='decimal-pad'
                // onEndEditing={}
                // onSubmitEditing={}
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                value = {retencion}
                onChangeHandler ={onChangeRetencion}
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
                            <MyButton value={MotivoGastoFinal} HandlerOnPress={()=>setModalOpenMotivoF(!modalOpenMotivoF)}>Gastos Finales
                            </MyButton>
                            <MyButtonSpecial style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
    
                            }} value={UnidadFinalValor} HandlerOnPress={()=>setModalOpenValorE(!modalOpenValorE)}>Tipo de valor:
                            </MyButtonSpecial>
                            <View style={{ flexDirection:'row'}}>
                                <Input
                                style={{
                                    fontFamily:'open-sans-bold',
                                    marginVertical:12,
                                    marginLeft:3,
                                    color:'black',
                                }}
                                id='VNumerico'
                                editable={true}
                                label ='Valor Numerico:'
                                TipoV={UnidadFinalValor}
                                // onEndEditing={}
                                // onSubmitEditing={}
                                keyboardType='decimal-pad'
                                returnKeyType='next'   
                                value={gastoFinal}
                                onChangeHandler ={onChangeGastoFinal}
                                required/> 
                                </View>
                                <View style={{marginTop:10}}>
                            <Button color={Colors.accent} title='Agregar Motivo' onPress={addGastoFinal}/>
                            </View>   
                        
                        </ScrollView>
                        
                    </Card>
                    <View>    
                    <MyCustomPicker
                    setModalOpen={setModalOpenMotivoF}
                    modalOpen={modalOpenMotivoF} 
                    value={MotivoGastoFinal} 
                    setValue={setMotivoFinal}
                    items = {motivosFinales}
                    />
                    </View>  
                    <MyCustomPicker
                    setModalOpen={setModalOpenValorE}
                    modalOpen={modalOpenValorE} 
                    value={UnidadFinalValor} 
                    setValue={setUnidadFinalValor}
                    items = {valorUnidad}
                    />             
             </ScrollView>
             <Button color={'black'} title="VER RESULTADOS" onPress={submitHandler}/>   
             </KeyboardAvoidingView>)
    }
    if(IsNexted)
    {
        return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={-180}>
        <ScrollView style={{margin:10}}>
        <Fancy
        visible={visibleForInicial}
        MotivoGasto={MotivoGastoInicial}
        TipoValor={UnidadInicialValor}
        ValorAgregado={gastoInicial}
        toggle={toggleAlertInicial}
        />
         {/* <View style={{justifyContent:'center',alignItems:'center',marginVertical:5}}>
            <Text style={styles.HeaderFinales}>Datos Iniciales</Text>
         </View>    */}
                <Card style={styles.card}>
                    <ScrollView>
                        <MyButton value={MotivoGastoInicial} HandlerOnPress={()=>setModalOpenMotivo(!modalOpenMotivo)}>Gastos Iniciales
                        </MyButton>
                        <MyButtonSpecial style={{
                            flexDirection:'row',
                            justifyContent:'space-between',

                        }} value={UnidadInicialValor} HandlerOnPress={()=>setModalOpenValorE(!modalOpenValorE)}>Tipo de valor:
                        </MyButtonSpecial>
                        <View style={{ flexDirection:'row'}}>
                            <Input
                            style={{
                                fontFamily:'open-sans-bold',
                                marginVertical:12,
                                marginLeft:5,
                                color:'black',
                                flexDirection:'row',
                                width:'70%',
                            }}
                            Visible={true}
                            editable={true}
                            id='VNumerico'
                            // onEndEditing={}
                            // onSubmitEditing={}
                            TipoV={UnidadInicialValor}
                            maxLength={8}
                            label = 'Valor Numerico:'
                            keyboardType='decimal-pad'
                            returnKeyType='next'   
                            value={gastoInicial}
                            // IncrementarGasto={addGastoInicial}
                            onChangeHandler ={onChangeGastoInic}
                            required
                            />
                            </View>
                            <View style={{marginTop:10}}>
                            <Button color={Colors.accent} title='Agregar Motivo' onPress={addGastoInicial}/>
                            </View>                            
                    </ScrollView>
                </Card>
                <ImageSelector onImageTaken={imageTakenHandler}/> 
                <View>    
                <MyCustomPicker
                setModalOpen={setModalOpenMotivo}
                modalOpen={modalOpenMotivo} 
                value={MotivoGastoInicial} 
                setValue={setMotivoInicial}
                items = {motivos}
                />
                </View>  
                <MyCustomPicker
                setModalOpen={setModalOpenValorE}
                modalOpen={modalOpenValorE} 
                value={UnidadInicialValor} 
                setValue={setUnidadInicialValor}
                items = {valorUnidad}
                />             
         </ScrollView>
         <Button color={'black'} title="Continuar" onPress={validacionFinal}/>   
         </KeyboardAvoidingView>)
    }
     return (
         <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={-180}>
         <ScrollView style={{margin:10}} >
         <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.HeaderInicial}>Datos iniciales</Text>
         </View>    
                
                <Input
                //NO TOCAR
                id='tituloLetra'
                label='Titulo:'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                // editable={editable}
                returnKeyType='next' 
                maxLength ={20}
                onChangeHandler ={onChangeTitulo}
                // onEndEditing={}
                // onSubmitEditing={}
                value={titulo}
                required
                />
                <Input
                id='descripcionLetra'
                label='Descripción:'
                // numberOfLines={1}
                maxLength ={30}
                keyboardType='default'
                editable={true}
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onChangeHandler ={onChangeDescripcionLetra}
                value={descripcion}
                // onEndEditing={}
                // onSubmitEditing={}
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
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            editable={true}
                            autoCorrect
                            returnKeyType='next'
                            placeholder ='23.4344444' 
                            returnKeyType='next' 
                            // onEndEditing={}
                            // onSubmitEditing={}
                            onChangeHandler ={onChangeTasa}
                            maxLength={8}
                            value = {plazot}
                            required
                            />
                            {TipoTasa==='Tasa Nominal'?  
                             <TextInput
                            label="Capitalizacion"
                            placeholder='35'
                            value={capitalizacion}
                            keyboardType='decimal-pad'
                            onChangeText={capitalizacion=>SetCapitalizacion(capitalizacion)}
                            
                            /> 
                             :null}
                   
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
                    <MyButton 
                    value={pT} HandlerOnPress={()=>setModalOpenPT(!modalOpenPT)}>Seleccione Plazo de Tasa
                    </MyButton>
                           
                             {pT==='Especial'?  
                             <TextInput
                            label="Periodo Especial"
                            placeholder='35'
                            value={plazot}
                            onChangeText={plazodeTasa=>SetPlazot(plazodeTasa)}
                            /> 
                             :null}
                    </ScrollView>
                </Card> 
               
         </ScrollView>
         <Button color={'black'} title="Continuar" onPress={validateInitialData}/>  
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

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
// const formReducer = (state,action)=>
// {
//     if(action.type===FORM_INPUT_UPDATE)
//     {
//         const UpdatedValues ={
//             ...state.inputValues,
//             [action.input]:action.value
//         };
//         const UpdatedValidities ={
//             ...state.inputValidities,
//             [action.input]:action.isValid
//         }
//         let updatedFormValidation = true;
//         for(const key in UpdatedValidities)
//         {
//             updatedFormValidation = updatedFormValidation && UpdatedValidities[key];
//         }
//         return{
//             formIsValid:updatedFormValidation,
//             inputValidities:UpdatedValidities,
//             inputValues:UpdatedValues,          
//         }
//     }
//     return state;
// }
// const [formState, dispatchFormState]=useReducer(formReducer,{
//     inputValues:{
//         titulo:editedLetra?editedLetra.titulo:'',
//         imageUrl:editedLetra?editedLetra.imageUrl:'',
//         descripcion:editedLetra?editedLetra.descripcion:'',
//         plazot:editedLetra?editedLetra.plazot:'',
//         tasa:editedLetra?editedLetra.tasa:'',
//         fechaDescuento:editedLetra?editedLetra.fechaDescuento:'',
//         gastoInicial:editedLetra?editedLetra.gastoInicial:'',
//         gastoFinal:editedLetra?editedLetra.gastoFinal:'',
//         fechaEmision:editedLetra?editedLetra.fechaEmision:'',
//         retencion:editedLetra?editedLetra.retencion:'',
//         valorNominal:editedLetra?editedLetra.valorNominal:'',
//     },
//    inputValidities:{
//        titulo:editedLetra?true:false,
//        imageUrl:editedLetra?true:false,
//        descripcion:editedLetra?true:false,
//        plazot:editedLetra?true:false,
//        tasa:editedLetra?true:false,
//        fechaDescuento:editedLetra?true:false,
//        gastoInicial:editedLetra?true:false,
//        gastoFinal:editedLetra?true:false,
//        fechaEmision:editedLetra?true:false,
//        retencion:editedLetra?true:false,
//        valorNominal:editedLetra?true:false,
//    },
//     formIsValid:editedLetra?true:false 
//    });

   // const Reconstruct = () => {
    //     let arrayGastosI = []
    //     let sumArrayI = 0
    //     arrayGastosI = GastoArrayInicial.map(item=>item.valor);
    //     for(let x   in arrayGastosI){
    //         sumArrayI = sumArrayI + arrayGastosI[x]   
    //     }
        
    //     let arrayGastosF = []
    //     let sumArrayF = 0
    //     arrayGastosF = GastoArrayFinal.map(item=>item.valor);
    //     for(let x   in arrayGastosF){
    //         sumArrayF = sumArrayF + arrayGastosF[x]   
    //     }

    //     GastoArrayInicial.map(item=>console.log(`\nvalor : ${item.valor}`));
        
    //     GastoArrayFinal.map(item=>console.log(`\nvalor : ${item.valor}`));
    //     console.log(
    //     `titulo:${titulo}`,
    //     `\ndescripcion:${descripcion}`,
    //     `\nfechaGiro:${FechaGiro}`,
    //     `\nfechaVen:${FechaVen}`,
    //     `\nplazot:${plazot}`,
    //     `\ntasa:${tasa}`,
    //     `\nGastoFinal:${GastoArrayFinal}`,
    //     `\nGastoInicial:${GastoArrayInicial}`,
    //     `\nretencion:${retencion}`,
    //     `\nvalorNominal:${valorNominal}`,
    //     `\nvalorNominal:${pT}`,
    //     `\ncapitalizacion:${capitalizacion}`)
    //     // try {
    //     //   submitHandler();  
    //     //   props.navigation.navigate('Resultados');
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }
    // }
{/* {pT!=='Especial'?
                            <Input
                            id='NumPeriodoTasa'
                            label = 'Valor:'
                            // errorText='X'
                            editable={true}
                            keyboardType='decimal-pad'
                            returnKeyType='next' 
                            // onEndEditing={}
                            // onSubmitEditing={}
                            // onBlur={AlDeseleccionarInput}
                            placeholder='asdas'
                            onChangeHandler ={onChangePlazoTasa}
                            value = {plazot}
                            required
                            />:null} */}
                                // const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {

    //     dispatchFormState({
    //         type:FORM_INPUT_UPDATE,
    //         value:inputValue,
    //         isValid : inputValidity,
    //         input:inputIdentifier
    //     })
    // },[dispatchFormState]);
            // if(!formState.formIsValid)
        // {
        //     Alert.alert('wrong input!','please check errors in the form',
        //     [
        //         {text:'Ok'}
        //     ]);
        //     return;
        // }
        // SetIsError(null);
        // SetIsloading(true);