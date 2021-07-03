import React from 'react';
import { Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import MyButton from './ButtonComponent'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';
const App = (props) => {

  return (
    <View>

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

      >
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>Valor total a recibir por cartera:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.vr}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>Tasa de costo efectiva anual:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32 }}>{props.tir}</Text>
        </View>

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
