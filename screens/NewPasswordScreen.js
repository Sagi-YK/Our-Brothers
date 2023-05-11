import React from 'react';
import { useState } from 'react';
import AppForm from './AppForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validateSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label("password"),

    confirm_Password :Yup.string().required().min(4).label("Confirm Password").oneOf(
        [Yup.ref('password')],
        'Passwords must match',
      ),
    
    
  })

function NewPasswordScreen(props) {
    
    return (

        <Formik
            initialValues={{password:'',confirm_Password:''}}
            onSubmit={values=>console.log(values)}
            validationSchema={validateSchema}
        >
            {
                ({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>
                <AppForm 
                first_input_name={'New password'}
                set_first_input_val={handleChange('password')}
                first_input_value={values.password}
                first_error = {errors.password}
                first_input_touched ={()=>setFieldTouched('password')}
                first_input_is_touched = {touched.password}

                second_input_name={'Confirm password'}
                set_second_input_val={handleChange('confirm_Password')}
                second_input_value={values.confirm_Password}
                second_error = {errors.confirm_Password}
                second_input_touched ={()=>setFieldTouched('confirm_Password')}
                second_input_is_touched = {touched.confirm_Password}

                general_text_button={'send'}

                >

                </AppForm>
            }

        </Formik>

    );
}

export default NewPasswordScreen;