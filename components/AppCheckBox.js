import React, { useState } from 'react';
import AppButton from './AppButton';
import { TouchableWithoutFeedback, StyleSheet, TouchableHighlight, View } from 'react-native';
import AppIcon from './AppIcon';
import AppText from './AppText';
// <AppButton style={style} icon_name= {icon_name} icon_size= {icon_size} icon_color= {icon_color}></AppButton>

function AppCheckBox({icon_name,icon_size,icon_color,onPress,isCheck}) {
    
    

    return (
        // <TouchableHighlight style={styles.container}>

             
             
        // </TouchableHighlight>
        <View style = {styles.cotainer}>

        <TouchableWithoutFeedback onPress={onPress}>
            <View style = {styles.check}>
                {isCheck === true && (<AppIcon 
                  icon_name = {icon_name}
                  icon_size = {icon_size}
                  icon_color = {icon_color}
                 > 
                 </AppIcon>)}
                 
                 

            </View>

        </TouchableWithoutFeedback>
        <AppText text={"אח שכול ?"} style={styles.text}></AppText>
        </View>
            
        
    );
}
const styles = StyleSheet.create({
    cotainer:{
        flexDirection: 'row'
        
    },
    
    check:{
        
        height:40,
        width:40,
        borderRadius:10,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:'center',
        marginBottom:30,
        marginRight:30,
    },
    text:{
        //paddingVertical:5,
        fontSize:25,
        color:'#0782F9'
    }
})

export default AppCheckBox;