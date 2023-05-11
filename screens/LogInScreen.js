import React, { useState } from 'react';

import AppForm from './AppForm';
import { useNavigation } from '@react-navigation/native';
import { Formik, validateYupSchema } from 'formik';
import * as Yup from 'yup';


const validateSchema = Yup.object().shape({
  email: Yup.string().required().email().label("email"),
  Password:Yup.string().required().min(4).label("Password"),
  
  
})

function LogInScreen(props) {
    // const [log_in_value,set_log_in_value] = useState('')
    
    // const [Password_value,set_password_value] = useState('')
    
    const navigation = useNavigation();
    
    
    const handleSignUpPress = ()=> {
        navigation.navigate('Sign-Up');
      }
      const forgotPassword = ()=>{
        navigation.navigate('Forgot-pass');
      }
    
    

    return (
          <Formik
            initialValues={{email:'',Password:''}}
            onSubmit={values=>console.log(values)}
            validationSchema={validateSchema}
          >
            {({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>
            (

            <AppForm 
            first_input_name={'email'}
            set_first_input_val = {handleChange('email')}
            first_input_value ={values.email}
            first_error = {errors.email}
            first_input_touched ={()=>setFieldTouched('email')}
            first_input_is_touched = {touched.email}

            second_input_name={'Password'}
            set_second_input_val ={handleChange('Password')}
            second_input_value = {values.Password}
            second_error = {errors.Password}
            second_input_touched ={()=>setFieldTouched('Password')}
            second_input_is_touched = {touched.Password}

            log_in_text='Log-In'
            log_in_func ={handleSubmit}

            general_text_button={'Sign-Up'}
            general_button_function={handleSignUpPress}

            forget_pass = {forgotPassword}
            
            >
                
            </AppForm> 
            )}

          </Formik>
      
    );
}


export default LogInScreen;