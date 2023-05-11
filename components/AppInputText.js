import React from 'react';
import { TextInput,StyleSheet, View, Text } from 'react-native';

function AppInputText({place_holder,onChangeText,secureTextEntry,value,error,onBlur,touch}) {
    return (
        
            <View style={styles.container}>
             <TextInput placeholder = {place_holder} style = {[styles.input]} onChangeText={onChangeText} value={value} secureTextEntry ={secureTextEntry} onBlur={onBlur}></TextInput>
             {(!error || !touch)? null : <Text style={{color:'red',fontSize:14,paddingLeft:8}}>{error}</Text>}
            </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        marginBottom:30,
        height:65,
        width:'70%',

    },
    input:{
        backgroundColor: '#f0f8ff',
        height:50,
        width:'100%',
        paddingLeft:10,
        borderRadius:20,
        fontSize:20,
        marginBottom:7,
    }
})

export default AppInputText;