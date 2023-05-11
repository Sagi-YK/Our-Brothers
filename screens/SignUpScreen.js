import React from 'react';
import { useState } from 'react';

import AppForm from './AppForm';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validateSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password"),
    confirm: Yup.string().required().min(4).label("Confirm Password").oneOf(
      [Yup.ref('Password')],
      'Passwords must match',
    ),
  });
function SignUpScreen() {
   

    const [is_check,set_check] = useState(false)

    

   

    return (

        <Formik
        initialValues={{email:'',Password:'', confirm:''}}
        onSubmit={values=>console.log(values)}
        validationSchema={validateSchema}
        > 
        {
            ({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>
            <AppForm 
            first_input_name={'email'}
            set_first_input_val = {handleChange('email')}
            first_input_value ={values.email}
            first_error={errors.email}
            first_input_touched={()=>setFieldTouched('email')}
            first_input_is_touched={touched.email}

            second_input_name={'password'}
            set_second_input_val ={handleChange('Password')}
            second_input_value = {values.Password}
            second_error={errors.Password}
            second_input_touched={()=>setFieldTouched('Password')}
            second_input_is_touched={touched.Password}

            confirm_value={values.confirm}
            set_Confirm_value ={handleChange('confirm')}
            confirm_error = {errors.confirm}
            confirm_input_touched={()=>setFieldTouched('confirm')}
            confirm_input_is_touched={touched.confirm}


            icon_name = "check"
            icon_size={30}
            icon_color={"white"}
            icon_func={()=>{
                if(is_check === false)
                        set_check(true)
                else        
                    set_check(false)   
            }}
            is_check={is_check}

            general_text_button={'Sign-Up'}
            general_button_function={handleSubmit}

            >

            </AppForm>
        }
            
            </Formik>
        
        
    );
}


export default SignUpScreen;