import React,{useReducer,useEffect,useState} from 'react';
import {Picker} from '@react-native-picker/picker'
import {View, Button,Text,TextInput,TouchableOpacity,Modal,StyleSheet, Alert} from 'react-native';
import Colors from '../constants/Colors'
const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'
const INCREMENT = 'INCREMENT'
const inputReducer = (state,action) =>
{
    switch (action.type) {
        case INPUT_CHANGE:
            console.log(state,action);
            return {
                
                ...state,
                value:action.value,
                isValid:action.isValid
            }
        case INPUT_BLUR:
            console.log(state,action);
            return {
                ...state,
                touched:true
            }
        case INCREMENT:
            console.log(state,action)
            return {
                ...state,
                value:state.value+1,
            }
        default:
            return state;
    }
}   


const Input = props =>{
    const {onInputChange,id} = props;
    const [check,SetCheck] = useState(false);
    const [ PrevValue,SetPrevValue] = useState();
    const [inputState,dispatch] = useReducer(inputReducer,{
        value:props.initialValue ? props.initialValue:'',
        isValid:props.initiallyValid,
        touched:false,  
    })
    useEffect(()=>{
        if(inputState.touched) {
            onInputChange(id,inputState.value,inputState.isValid);
        }
    },[inputState,onInputChange,id])

    const textChangeHandler=text=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        
        // if(typeof text === 'number')
        // {
        //     
        // }
            SetPrevValue(text);
            if( /../.test(text)||/,,/.test(text))
            {
                isValid = false;
            }
            if(props.pT==='Diario')
            {
                text = 1;
            }
            if(props.pT==='Quincenal')
            {
                text = 15;
            }
            if(props.pT==='Mensual')
            {
                text = 30;
            }
            if(props.pT==='Bimestral')
            {
                text = 60;
            }
            if(props.pT==='Trimestral')
            {
                text = 90;
            }
            if(props.pT==='Cuatrimestral')
            {
                text = 120;
            }
            if(props.pT==='Semestral')
            {
                text = 180;
            }
            if(props.pT==='Anual')
            {
                text = 360;
            }
            if (props.required && text.trim().length === 0) {
            isValid = false;
            }
            if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
            }
            if (props.min != null && +text < props.min) {
            isValid = false;
            }
            if (props.max != null && +text > props.max) {
            isValid = false;
            }
            if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
            }
            dispatch({type:INPUT_CHANGE,value:text, isValid:isValid})
           
        
    }
    const LostFocusHandler = () =>
    {
        dispatch({
            type:INPUT_BLUR
        })
    }
    const IncrementHandler = () =>
    {
        dispatch({type:INCREMENT})
    }
    // const IfValueHandler = () =>
    // {
    //     if(check)
    //     {
    //         console.log(PrevValue);
    //         return inputState.value+prevValue

    //     }
    //     else{
    //         return inputState.value
    //     }
    // }
    return(
        <View style={styles.formControl}>
            <View style={{...styles.formTextPut,...props.style}}>
             <Text style={{...styles.label,...props.style}}>{props.label}</Text>
             <TextInput 
            {...props}
            style={
            {
                width:'40%',
                paddingHorizontal:2,
                paddingVertical:5,
                borderRadius:5,
                borderWidth:1,
                margin:5,
                marginHorizontal:20,
                backgroundColor:'#D3D5D7',
                color:'black',
                borderColor:!inputState.isValid&& inputState.touched ?'red':'#D3D5D7'
            }}
            ButtonVisible={props.Visible}
            value={inputState.value} 
            onBlur={LostFocusHandler}
            onChangeText={textChangeHandler}/>
            </View>
            {props.Visible?
             <View style={styles.btncontainer}>
             <Button color={Colors.accent} title='Agregar Motivo' onPress={IncrementHandler}/>
            </View>
             :null}
        </View>
    )
};
const styles = StyleSheet.create({

    btncontainer:{
        marginTop:10,
    },
    formTextPut:{
       width:'100%',
       flexDirection:'row',
       justifyContent:'space-between'
    },
    formControl:{
        width:'100%',
        flexDirection:'column',
        
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:12,
        marginLeft:20,
        color:'black',
    },
    errorContainer:{
        marginVertical:5,
    },
    errorTxt:{
        fontFamily:'open-sans',
        color:'red',
        fontSize:14,
    }
});

export default Input;
    // // const SumatoriaGastos = () =>{
    // //     check = check + inputState.value;
    // //     SetCheck(check);
    // // }
    // const DoSum = () =>{
    //     SetValue(inputState.value)
    //     if(inputState.value!==Value)
    //     {
    //     inputState.value = inputState.value+Value;
    //     console.log("works?");
    //     return inputState.value

    //     }
    //     else
    //     {
    //         return inputState.value
    //     }
        
    // }
    // input:{
    //     width:'40%',
    //     paddingHorizontal:2,
    //     paddingVertical:5,
    //     borderRadius:5,
    //     borderWidth:1,
    //     margin:5,
    //     marginHorizontal:20,
    //     backgroundColor:'#D3D5D7',
    //     color:'black',
    
    // },
            {/* {!inputState.isValid&& inputState.touched &&(
            <View style={styles.errorContainer}>
                <Text style={styles.errorTxt}>{props.errorText}</Text>
            </View>)} */}
{/* <MyButton>{props.Default}
<MyCustomPicker 
// onValueChange={props.onValueChange}
modalOpen={props.modalOpen} 
// setModalOpen={props.setModalOpen} 
// value={props.One} 
// setValue={props.setOne}
/>
</MyButton> */}