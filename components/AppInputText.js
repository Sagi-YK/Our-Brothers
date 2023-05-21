import React from 'react';
import { TextInput,StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function AppInputText({place_holder,onChangeText,secureTextEntry,value,error,onBlur,touch,iconName}) {
    return (
        
            <View style={styles.container}>
                
                
             <TextInput 
             placeholder = {place_holder}
              style = {[styles.input]} 
              onChangeText={onChangeText} 
              value={value} 
              secureTextEntry ={secureTextEntry} 
              onBlur={onBlur}
              
              > 
              
             </TextInput>
             {iconName? <MaterialCommunityIcons name={iconName} size={24} color={"grey"} style={styles.icon}></MaterialCommunityIcons>: null}
             {(!error || !touch)? null : <Text style={{color:'red',fontSize:14,paddingLeft:8}}>{error}</Text>}
            </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        //paddingLeft:5,
        marginBottom:30,
        height:65,
        width:'70%',
       //flexDirection: 'row'

    },
    input:{
        backgroundColor: '#f0f8ff',
        height:50,
        width:'100%',
       // paddingLeft: 10,
        paddingLeft: 33,
        borderRadius:20,
        fontSize:20,
        marginBottom:7,
       
    },
    icon:{
        position:'absolute',
        top:13,
        left:5,
       // marginRight:10
       //paddingLeft:3

    }
})

export default AppInputText;