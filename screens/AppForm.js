import React, { useState } from 'react';
import { View,StyleSheet, TouchableWithoutFeedback, Keyboard,Text } from 'react-native';
import AppInputText from '../components/AppInputText';
import AppButton from '../components/AppButton';
import AppCheckBox from '../components/AppCheckBox';
import AppText from '../components/AppText';

function AppForm({
    first_input_name,
    set_first_input_val,
    first_input_value,
    first_error,
    first_input_touched,
    first_input_is_touched,

    second_input_name,
    set_second_input_val,
    second_input_value,
    second_error,
    second_input_touched,
    second_input_is_touched,

    confirm_value,
    set_Confirm_value,
    confirm_error,
    confirm_input_touched,
    confirm_input_is_touched,

    log_in_text,
    log_in_func,
    
    general_text_button,

    icon_name,
    icon_size,
    icon_color,
    icon_func,
    is_check,
    general_button_function,
    forget_pass}) {
        
    

    return (
        
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>

        <View style={styles.container} >

            <AppInputText 
                place_holder={first_input_name} 
                onChangeText={set_first_input_val} 
                value={first_input_value} 
                error={first_error} 
                onBlur={first_input_touched}
                touch={first_input_is_touched} 
                {...(first_input_name === 'New password' ? { secureTextEntry: true } : null)} 
             >

             </AppInputText>
            
            {second_input_name!== undefined && 

            (<AppInputText 
                    place_holder={second_input_name}
                    onChangeText={set_second_input_val }
                    value={second_input_value}
                    secureTextEntry={true}
                    error={second_error}
                    onBlur={second_input_touched}
                    touch={second_input_is_touched}
                  >

            </AppInputText>)}

            {confirm_value !== undefined && 
            (<AppInputText 
                    place_holder={"confirm-password"}
                    onChangeText={set_Confirm_value }
                    value={confirm_value}
                    secureTextEntry={true}
                    error={confirm_error}
                    onBlur={confirm_input_touched}
                    touch={confirm_input_is_touched}
                  >

        </AppInputText>)}

            {log_in_text !== undefined &&
            (<AppButton 
                text={log_in_text}
                //style={styles.button}
                TextStyle={styles.buttonText}
                onPress={log_in_func}
               >

            </AppButton>)}

            {icon_name !== undefined && 
            (<AppCheckBox
                    icon_name= {icon_name}
                    icon_size={icon_size}
                    icon_color= {icon_color}
                    onPress = {icon_func}
                    isCheck={is_check}
                 >  
            </AppCheckBox>)}

            <AppButton
                    text={general_text_button}
                    //style={styles.button}
                    TextStyle={styles.buttonText}
                    onPress={general_button_function}
                >

            </AppButton>

            {
                (forget_pass !== undefined) &&
                (<AppText 
                    text={"forgot password ?"}
                    style={styles.text}
                    onPress={forget_pass}
                 >

                </AppText>)
            }
        </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container:{
         backgroundColor: '#87cefa',
         paddingVertical:20,
         flex:1,
         alignItems:'center',
         justifyContent:'center'
    },
    button:{
        // width:"70%",
        // borderRadius:35,
        // borderWidth:0,
        // marginBottom:40,
    },
    buttonText:{
        fontSize:25,
    },
    text:{
        fontSize:25,
        textDecorationLine:'underline',
    }


})

export default AppForm;