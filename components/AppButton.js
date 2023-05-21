import React from 'react';
import { View,StyleSheet, TouchableHighlight, Text} from 'react-native';
import AppText from './AppText';
import AppIcon from './AppIcon';

function AppButton({text,onPress,style,TextStyle,icon_name,icon_size,icon_color}) {
    return (
        <TouchableHighlight 
        style={[styles.container,style]}
        onPress={onPress}
        >
             {text !== undefined ?  <AppText text={text} style={TextStyle}></AppText> : 
             <AppIcon icon_name= {icon_name} icon_size= {icon_size} icon_color= {icon_color}></AppIcon>}

             
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    container:{
        padding:10,
         height:70,
        // width: 80,
                                 //borderRadius:15,
        backgroundColor:"#fc5c65",
        justifyContent:"center",
        alignItems:'center',
         borderWidth:3,
         borderColor:'black',
        
         width:"70%",
         borderRadius:15,
         
         marginBottom:40,
    }
    
})

export default AppButton;