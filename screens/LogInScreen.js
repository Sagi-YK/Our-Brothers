import React, { useState } from 'react';

import AppForm from './AppForm';
import { useNavigation } from '@react-navigation/native';
import { Formik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Alert, TouchableWithoutFeedback,Keyboard,View,StyleSheet } from 'react-native';
import AppInputText from '../components/AppInputText';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

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
      const hadeleLog = (password,email)=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log("log-in")
            console.log(userCredential.user.email)
            navigation.goBack()
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            //console.log(error);
            Alert.alert("אופס","שם המשתמש או סיסמא לא נכונים",[{text:"אישור"}])
          });
      }
    
    

    return (
          <Formik
            initialValues={{email:'',Password:''}}
            onSubmit={values=>hadeleLog(values.Password,values.email)}
            validationSchema={validateSchema}
          >
            {({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>
            (
            <TouchableWithoutFeedback onPress={()=>{
              Keyboard.dismiss();
          }}>
              <View style={styles.container}>

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

                  <AppButton
                    text={"התחבר"}
                    style={styles.button}
                    TextStyle={styles.buttonText}
                    onPress={handleSubmit}
                  >

                  </AppButton>

                  <AppButton
                    text={"הרשמה"}
                    style = {styles.secondButton}
                    TextStyle={styles.secondButtonText}
                    onPress={handleSignUpPress}
                  >
                    
                  </AppButton>

                  <AppText 
                      text={"שכחת סיסמא?"}
                      style={styles.text}
                      onPress={()=>forgotPassword()}
                  >

                  </AppText>
              </View>
            </TouchableWithoutFeedback>

           


            )}

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

  button:{
    borderWidth:0,
    // marginBottom:40,
    backgroundColor: "#0782F9"
  },
  buttonText:{
      fontSize:25,
      fontWeight:'700'
  },
  secondButton:{
    backgroundColor: 'white',
    borderColor:"#0782F9",
    borderWidth:2,
  },
  secondButtonText:{
    color:'#0782F9',
    fontWeight:700,
    fontSize:25,
  },
  text:{
    color:"#0782F9",
    fontWeight:'700',
    fontSize:25,
    textDecorationLine:'underline',
  }

  
})


export default LogInScreen;















 // <AppForm 
            // first_input_name={'email'}
            // set_first_input_val = {handleChange('email')}
            // first_input_value ={values.email}
            // first_error = {errors.email}
            // first_input_touched ={()=>setFieldTouched('email')}
            // first_input_is_touched = {touched.email}

            // second_input_name={'Password'}
            // set_second_input_val ={handleChange('Password')}
            // second_input_value = {values.Password}
            // second_error = {errors.Password}
            // second_input_touched ={()=>setFieldTouched('Password')}
            // second_input_is_touched = {touched.Password}

            // log_in_text='התחבר'
            // log_in_func ={handleSubmit}

            // general_text_button={'הרשמה'}
            // general_button_function={handleSignUpPress}

            // forget_pass = {forgotPassword}
            
            // >
                
            // </AppForm> 