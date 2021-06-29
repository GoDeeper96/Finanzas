import React from 'react';
import { Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import MyButton from './ButtonComponent'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';
const App = (props) => {

  return (
    <View>
      {/* <TouchableOpacity onPress={props.toggleAlert}>
        <Text>Tap me</Text>
      </TouchableOpacity> */}
      <FancyAlert
        style={styles.alert}
        icon={
            <View style={[ styles.icon, { borderRadius: 32 } ]}>
            <TouchableOpacity onPress={props.toggle}>
                <Ionicons
                name={Platform.select({ ios: 'ios-close', android: 'md-close' })}
                size={36}
                color="#FFFFFF"
            />
                </TouchableOpacity>
            </View>

        }
        visible={props.visible}
        // icon={<View style={{
        //   flex: 1,
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'red',
        //   borderRadius: 50,
        //   width: '100%',
        // }}><Text>🤓</Text></View>}
        // style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.MotivoGasto}</Text>
        <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.TipoValor}</Text>
        <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.ValorAgregado}</Text>
        {/* {props.resultas?
        <View>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.periodo}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorRecibido}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.sumArrayI}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.sumArrayF}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.TCEA}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorNeto}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.descuento}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorNominal}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.capitalizacion}</Text>
        </View>
        :null} */}
        {/* <MyButton value='Ok' HandlerOnPress={()=>{console.log("asdasd")}}/> */}
      </FancyAlert>
      
    </View>
  )
}
const styles = StyleSheet.create({
    alert: {
      backgroundColor: '#EEEEEE',
    },
    icon: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C3272B',
        width: '100%',
    }
})
 
export default App;
