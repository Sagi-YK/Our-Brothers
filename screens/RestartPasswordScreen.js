import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert, TouchableWithoutFeedback, View,StyleSheet,Keyboard } from 'react-native';
import AppInputText from '../components/AppInputText';
import AppButton from '../components/AppButton';



const validateSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    
  });

function RestartPasswordScreen(props) {
    
    const navigation = useNavigation()

     const  handleSent = async (email)=>{
      
     //await sendPasswordResetEmail(auth,email);
     
     await sendPasswordResetEmail(auth, email)
     .then(() => {
         console.log('Password reset email sent successfully.');
         Alert.alert("","נשלח קישור איפוס סיסמא לאימייל",[{text:"אישור", onPress:()=>navigation.navigate("Home")}])
        })
        .catch((error) => {
            console.log('Error sending password reset email: ', error);
            Alert.alert("","האימייל לא נמצא במערכת או לא תקין",[{text:"אישור", onPress:()=>navigation.navigate("Home")}])
    });
    
    
        
    }
        
    
    //useEffect()

    return (

        <Formik

            initialValues={{email:''}}
            onSubmit={values=>handleSent(values.email)}
            validationSchema={validateSchema}
        >
        {
            ({handleChange,handleSubmit,setFieldTouched,values,errors,touched})=>

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

                  <AppButton

                    text={"שלח"}
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

export default RestartPasswordScreen;




 // <AppForm 
            // first_input_name={'email'}
            // set_first_input_val={handleChange('email')}
            // first_input_value={values.email}
            // first_error={errors.email}
            // first_input_touched={()=>setFieldTouched('email')}
            // first_input_is_touched={touched.email}

            // general_text_button={'שלח'}
            // general_button_function={handleSubmit}
            // >

            // </AppForm>