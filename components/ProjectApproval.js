import React from 'react';
import { View,StyleSheet } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';

function ProjectApproval({text,cancellPress,aprrovePress}) {
    return (
        
            <View 
            style={styles.container}
            >
                <AppButton text={"ביטול"} onPress={cancellPress} style={styles.button}></AppButton>
                <AppButton text={"אישור"} onPress={aprrovePress} style={styles.button}></AppButton>
                <AppText  text={text} style={styles.text} ></AppText>
               

            </View>

        
    );
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        width:"70%",
        height:200,
        borderWidth:3,
        borderColor:'black',
        marginBottom:40,
        //marginLeft:"12%"
    },
    text:{
        color:'black',
        fontSize:30,
        position:'absolute',
        top:10,
        right:10
    },
    button:{
         borderWidth:3,
         borderColor:'black',
         height:80,
         width: 80,
         borderRadius:0,
         marginBottom:5,
    }
})

export default ProjectApproval;