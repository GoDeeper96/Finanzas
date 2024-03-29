import WelcomeFade  from '../components/animations/Animation'
import React,{ useEffect,useState } from 'react'
import { StyleSheet,View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors'
import MainButton from '../components/animations/Buttons'
import {NavigationContainer} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const WelcomeScreen = props => {
    // const [Loading,SetLoading] = useState(false);
    const dispatch = useDispatch();
    // const loadingOver = useSelector(state=>!!state.auth.isLoading);
    const [FadeIsGone,SetFadeIsGone] = useState(false);
    const [ Email,SetEmail] = useState('');
    const startLoading = () =>
    {
    //   props.onBTCready(true)
    dispatch(authActions.isLoading());
    }
    const giveEmail = async ()=>
    {
        const userEmail = await AsyncStorage.getItem('userEmail');
        console.log(userEmail);
        SetEmail(userEmail)
    }
    useEffect(() => {
        giveEmail();
    })
    useEffect(() => {
        
        setTimeout(() => {
            // SetLoading(true);
            SetFadeIsGone(true);
          }, 11000)
    }, [])
    return (
    <LinearGradient
    colors={Colors.flare}
    style={styles.container}
    visible={true}>
        <WelcomeFade Email={Email}/>
        <View style={styles.btn}>
            { FadeIsGone?(
            <MainButton onPress={startLoading}> Continuar</MainButton>
        ):null}
        </View>
    </LinearGradient>
    )
}
export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:
    {
      marginVertical:200,
      top:300,
      left:120
    }
    });

