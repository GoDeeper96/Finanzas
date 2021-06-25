import React, {useState} from 'react'
import * as Permissions from 'expo-permissions'
import {View, 
        Button,
        Text,
        Image,
        StyleSheet,
        Alert} from 'react-native'
import Colors from '../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
const ImgPicker = props=>{
    const [pickedImage,setPickedImage] = useState();
    const verifyPermissions = async() =>{
        const result = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.MEDIA_LIBRARY);
        if(result.status !=='granted')
        {
           Alert.alert('Insufficient Permissions',
           'You need to grant camera permissions',
           [
               {text:'Okay'}
           ]);
           return false;
        }
        return true;
    }   
    const takeImageHandler = async() =>{
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync(
            {
                allowsEditing:true,
                aspect:[16,9],
                quality:0.5,
            }
        );
        setPickedImage(image.uri)
        props.onImageTaken(image.uri);
    }
    return( 
    <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage?(
            <Text >
                No has seleccionado una imagen
            </Text>
            ):
            (<Image style={styles.image}
            source={{uri:pickedImage}}/>)}
        </View>
        <Button title="Cargar Imagen"
        color={Colors.Primary}
        onPress={takeImageHandler}/>
    </View>)
};
export default ImgPicker;
const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom:15,
        marginTop:15,
    },
    // header:{
    //     color:'#ccc',
    //     marginBottom:40,
    //     marginTop:20,
    // },
    imagePreview: {
        width:'100%',
        height:200,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#ccc',
        borderWidth:1,
    },
    image:{
        width:'100%',
        height:'100%'
    }
});
