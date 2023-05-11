import React, { useEffect, useState } from 'react';
import AppForm from './AppForm';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';



const validateSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    
  });

function RestartPasswordScreen(props) {
    
    const navigation = useNavigation()
    //useEffect()

    return (

        <Formik

            initialValues={{email:''}}
            onSubmit={values=>navigation.navigate('Code-Screen')}
            validationSchema={validateSchema}
        >
        {
            ({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>

            <AppForm 
            first_input_name={'email'}
            set_first_input_val={handleChange('email')}
            first_input_value={values.email}
            first_error={errors.email}
            first_input_touched={()=>setFieldTouched('email')}
            first_input_is_touched={touched.email}

            general_text_button={'send'}
            general_button_function={handleSubmit}
            >

            </AppForm>
            
        }
        </Formik>

    );
}

export default RestartPasswordScreen;