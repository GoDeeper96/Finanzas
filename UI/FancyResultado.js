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
                name={Platform.select({ ios: 'ios-close', android: 'md-calculator' })}
                size={36}
                color="white"
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
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>TCEA:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.tcea}</Text>
        </View>
        
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Valor Recibido:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.valorRecibido}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Valor entregado:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.valorEntregado}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Periodo:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.dias}</Text>
        </View>    
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Valor neto:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.valorNeto}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Descuento:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.descuento}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Valor Nominal:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.valorNominalLetra}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Tasa:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.tasa}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Fecha Inicio:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.fechaInicio}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Fecha Vencimiento:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.fechaVencimiento}</Text>
        </View>
          {/* <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.periodo}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorRecibido}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.sumArrayI}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.sumArrayF}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.tcea}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorNeto}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.descuento}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.valorNominal}</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.capitalizacion}</Text> */}
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
        backgroundColor: 'black',
        width: '100%',
    }
})
 
export default App;
