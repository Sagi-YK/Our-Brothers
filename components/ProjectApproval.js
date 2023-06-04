import React from 'react';
import { View,StyleSheet,ScrollView } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';


function ProjectApproval({titleText,descriptionText,cancellPress,aprrovePress}) {
    return (
        
            <View 
            style={styles.container}
            >
                <View style = {styles.Scroll}>
                    <ScrollView>
                        <AppText  text={titleText} style={styles.text} ></AppText>
                        <AppText  text={descriptionText} style={styles.descriptionText} ></AppText>
                    </ScrollView>
                </View>
               
                <View style = {styles.buttonContanir}>

                    <AppButton text={"ביטול"} onPress={cancellPress} style={styles.button} TextStyle={styles.buttonText}></AppButton>
                    <AppButton text={"אישור"} onPress={aprrovePress} style={styles.button} secondary={styles.secondary} TextStyle={styles.buttonText}></AppButton>
                </View>

            </View>

        
    );
}
const styles = StyleSheet.create({
    container:{
        
         borderWidth:3,
         borderColor:'#0782F9',
         height:250,
         width:"70%",
         marginBottom:"8%"
         
    },
    text:{
         color:'black',
         fontSize:30,
         textAlign:'right',
         fontWeight:'bold',
         marginBottom:5,
        
    },
    descriptionText:{
        color:'black',
        fontSize:20,
        textAlign:'right',
        fontWeight:'500',
    },
    button:{
        backgroundColor:'#f44336',
         borderWidth:0,
         height:50,
         width: 90,
         borderRadius:15,
         margin:20
            
    },
    secondary:{
        backgroundColor: '#32CD32'
    },
    buttonText:{
        fontWeight:'bold',
        textAlign:'center',
        
    },
    Scroll:{
        height:"60%",
        width:"100%",
    },
    buttonContanir:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  
    },
    
})

export default ProjectApproval;