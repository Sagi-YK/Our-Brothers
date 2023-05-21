import React from 'react';
import { useState } from 'react';
import AppForm from './AppForm';
import { useNavigation } from '@react-navigation/native';

function SendCodeScreen(props) {
    const [code,set_code] = useState('')
    const navigation = useNavigation();
    
    
    const handleCodePress = ()=> {
        navigation.navigate('New-Password-Screen');
      }
    return (
        <AppForm 
        first_input_name={'code'}
        set_first_input_val={(text)=>set_code(text)}
        first_input_value={code}
        general_text_button={'שלח'}
        general_button_function={handleCodePress}
        >

        </AppForm>
    );
}

export default SendCodeScreen;