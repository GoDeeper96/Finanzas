import React,{useReducer,useCallback,useState,useEffect} from 'react'
import {ScrollView,View,KeyboardAvoidingView,StyleSheet,Button,ActivityIndicator,Alert} from 'react-native'
import Input from '../../UI/Input';
import Card from '../../UI/Card'
import Colors from '../../constants/Colors';
import {useDispatch} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import Picker from '../../UI/dateTimePickerUltimate'
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
const authScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    const [isSignUp, SetIsSignup] =useState(false);
    const [error,SetError] = useState()
    const [registrationDate,SetregistrationDate] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            Alert.alert('An error ocurred',error,[
                {text:'okay'}
            ])
        }
    },[error])
    const checkValue = (str,max)=> {
        if (str.charAt(0) !== '0' || str == '00') {
            var num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            str =
              num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                ? '0' + num
                : num.toString();
          }
          return str;
    }
    const dateTimeInputChangeHandler = (e) => {
        e.type = 'text';
        var input = e;
        var expr = new RegExp(/\D\/$/);
        if (expr.test(input)) input = input.substr(0, input.length - 3);
        var values = input.split('/').map(function (v) {
          return v.replace(/\D/g, '');
        });
        if (values[1]) values[1] = checkValue(values[1], 12);
        if (values[0]) values[0] = checkValue(values[0], 31);
        var output = values.map(function (v, i) {
          return v.length == 2 && i < 2 ? v + '/' : v;
        });
        SetregistrationDate(output.join('').substr(0, 14))
        
      };
    const authHandler = async() =>{
        let action;
        if(isSignUp)
        {
        action = authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password)
        }
        else{
        action = authActions.login(
            formState.inputValues.email,
            formState.inputValues.password)
        }
        SetError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            // dispatch(authActions.isLoading());
            // props.navigation.navigate('Shop')
        } catch (err) {
            SetError(err.message)
            setIsLoading(false);
        }
        // await dispatch(action);
        
    }
    const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {

        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid : inputValidity,
            input:inputIdentifier
        })
    },[dispatchFormState]);
    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
           email:'',
           password:'',
        },
       inputValidities:{
           email:false,
           password:false,
       },
        formIsValid:false
       });
    return (
        <LinearGradient colors={['#fff','#fff']} style={styles.gradient}>
        <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={10}
        style={styles.screen}>
        <Card style={styles.RegContainer}>
            <ScrollView>       
                <View> 
                    <Input 
                        id='email' 
                        label='E-mail' 
                        keyboardType='email-address' 
                        required 
                        email 
                        autoCapitalize='none' 
                        errorText='please enter a valid address'
                        onInputChange={InputChangeHandler}
                        initialValue =""
                        />
                    <Input 
                        id='nombre' 
                        label='Nombre' 
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={6} 
                        autoCapitalize='none' 
                        errorText='Porfavor introduce un nombre correcto'
                        onInputChange={InputChangeHandler}
                        initialValue =""
                        />
                    <Picker 
                        dateTimeInputChangeHandler={(e) => dateTimeInputChangeHandler(e)}
                        value={registrationDate}
                        />
                    <Input 
                        id='password' 
                        label='Password' 
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={5} 
                        autoCapitalize='none' 
                        errorText='please enter a valid password'
                        onInputChange={InputChangeHandler}
                        initialValue =""
                        />
                        <Input 
                        id='password' 
                        label='Confirmar Contraseña' 
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={5} 
                        autoCapitalize='none' 
                        errorText='please enter a valid password'
                        onInputChange={InputChangeHandler}
                        initialValue =""
                        />
                        <Input 
                        id='password' 
                        label='Password' 
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={5} 
                        autoCapitalize='none' 
                        errorText='please enter a valid password'
                        onInputChange={InputChangeHandler}
                        initialValue =""
                        />
                    </View>
                <View style={styles.btncontainer}>
                    {isLoading?<ActivityIndicator size='small' color={Colors.primary}/>:
                    <Button title={isSignUp?'Sign Up':'Login'} color={Colors.fifth} onPress={authHandler}/>}
                </View>
                <View style={styles.btncontainer}>
                    <Button title={`Switch to ${isSignUp?'Login':'Sign Up'}`} color={Colors.accent} onPress={()=>{
                    SetIsSignup(prevState=>!prevState)
                }}/>
                </View>
            </ScrollView>
        </Card>
        </KeyboardAvoidingView>
        </LinearGradient>
        
    )
}
export const screenOptions =navData=> {
    return{
    headerTitle:'Please authenticate',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName={Platform.OS==='android' ? 'arrow-back':'ios-arrow-back-sharp'} onPress={()=>{
        navData.navigation.goBack()}}/>
        </HeaderButtons>),}
}

const styles = StyleSheet.create({
    btncontainer:{
        marginTop:10,
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },  
    screen:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    authContainer:{
        width:'80%',
        // maxWidth:400,
        maxHeight:400,    
        padding:20

    },
    RegContainer:{
        width:'80%',
        // maxWidth:400,
        maxHeight:600,    
        padding:20

    }
})

export default authScreen;