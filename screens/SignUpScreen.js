import React from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppForm from './AppForm';
import { auth } from '../firebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, TouchableWithoutFeedback, View,StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppInputText from '../components/AppInputText';
import AppCheckBox from '../components/AppCheckBox';



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
    const navigation = useNavigation();


    const hadeleSignUp = (email,Password)=>{
        //console.log(db)
        
        createUserWithEmailAndPassword(auth,email,Password)
        .then((userCredential)=>{
            console.log("register")
            console.log(userCredential.user.email)
            navigation.navigate("Home")
        
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            //console.log(error);
           // Alert.alert("אופס","שם המשתמש או סיסמא לא נכונים",[{text:"אישור"}])
           Alert.alert("אופס","האימייל נמצא במערכת או שלא תקין",[{text:"אישור"}])
          });
          
    }

    

   

    return (

        <Formik
        initialValues={{email:'',Password:'', confirm:''}}
        onSubmit={values=>hadeleSignUp(values.email,values.Password)}
        validationSchema={validateSchema}
        > 
        {
            ({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>
            <TouchableWithoutFeedback onPress={()=>{
                Keyboard.dismiss();
            }}>
                <View  style={styles.container}>

                <AppInputText
                  place_holder={'email'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  onBlur={()=>setFieldTouched('email')}
                  touch={touched.email}
                  iconName={'email'}

                >
                </AppInputText>

                <AppInputText
                  place_holder={'Password'}
                  onChangeText={handleChange('Password')}
                  value={values.Password}
                  error={errors.Password}
                  onBlur={()=>setFieldTouched('Password')}
                  touch={touched.Password}
                  secureTextEntry={true}
                  iconName={'lock'}

                  >
                </AppInputText>

                <AppInputText
                  place_holder={'confirm-Password'}
                  onChangeText={handleChange('confirm')}
                  value={values.confirm}
                  error={errors.confirm}
                  onBlur={()=>setFieldTouched('confirm')}
                  touch={touched.confirm}
                  secureTextEntry={true}
                  iconName={'lock'}

                  >
                </AppInputText>

                <AppCheckBox
                    icon_name= {"check"}
                    icon_size={30}
                    icon_color= {"black"}
                    onPress = {()=>set_check(!is_check)}
                    isCheck={is_check}
                 >  
                </AppCheckBox>

                <AppButton

                    text={"הרשמה"}
                    style={styles.secondButton}
                    TextStyle={styles.secondButtonText}
                    onPress={handleSubmit}
                >
                    
                </AppButton>

                </View>

            </TouchableWithoutFeedback>
           
        }
            
            </Formik>
        
        
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
         flex:1,
         alignItems:'center',
         justifyContent:'center'
    },
    secondButton:{
        borderWidth:0,
        backgroundColor: "#0782F9"
    },
    secondButtonText:{
        fontSize:25,
        fontWeight:'700'
    }
})


export default SignUpScreen;













 // <AppForm 
            // first_input_name={'email'}
            // set_first_input_val = {handleChange('email')}
            // first_input_value ={values.email}
            // first_error={errors.email}
            // first_input_touched={()=>setFieldTouched('email')}
            // first_input_is_touched={touched.email}

            // second_input_name={'password'}
            // set_second_input_val ={handleChange('Password')}
            // second_input_value = {values.Password}
            // second_error={errors.Password}
            // second_input_touched={()=>setFieldTouched('Password')}
            // second_input_is_touched={touched.Password}

            // confirm_value={values.confirm}
            // set_Confirm_value ={handleChange('confirm')}
            // confirm_error = {errors.confirm}
            // confirm_input_touched={()=>setFieldTouched('confirm')}
            // confirm_input_is_touched={touched.confirm}


            // icon_name = "check"
            // icon_size={30}
            // icon_color={"black"}
            // icon_func={()=>{
            //     if(is_check === false)
            //             set_check(true)
            //     else        
            //         set_check(false)   
            // }}
            // is_check={is_check}

            // general_text_button={'הרשמה'}
            // general_button_function={handleSubmit}

            // >

            // </AppForm>