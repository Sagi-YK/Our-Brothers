import React, { useState } from "react";

import AppForm from "./AppForm";
import { useNavigation } from "@react-navigation/native";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppInputText from "../components/AppInputText";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { doc, getDocs, collection } from "firebase/firestore";

const validateSchema = Yup.object().shape({
  email: Yup.string().required().email().label("email"),
  Password: Yup.string().required().min(4).label("Password"),
});
const userRef = collection(db, "users");

function LogInScreen(props) {
  // const [log_in_value,set_log_in_value] = useState('')

  // const [Password_value,set_password_value] = useState('')

  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate("Sign-Up");
  };
  const forgotPassword = () => {
    navigation.navigate("Forgot-pass");
  };
  const hadeleLog = (password, email) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const fetchData = async () => {
          if (email === "iyarlevi5@gmail.com") {
            navigation.navigate("admin-screen");
            return;
          }
          const querySnapshot = await getDocs(userRef);
          querySnapshot.forEach((doc) => {
            if (doc.data().email === email) {
              if (doc.data().isdeleted) {
                Alert.alert("אופס", "שם המשתמש או סיסמא לא נכונים", [
                  { text: "אישור" },
                ]);
              } else {
                navigation.goBack();
              }
            }
          });
        };
        fetchData();
      })
      .catch((error) => {
        Alert.alert("אופס", "שם המשתמש או סיסמא לא נכונים", [
          { text: "אישור" },
        ]);
      });
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{ email: "", Password: "", name: "" }}
        onSubmit={(values) => hadeleLog(values.Password, values.email)}
        validationSchema={validateSchema}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <AppInputText
                place_holder={"Email"}
                onChangeText={handleChange("email")}
                value={values.email}
                error={errors.email}
                onBlur={() => setFieldTouched("email")}
                touch={touched.email}
                iconName={"email"}
              ></AppInputText>

              <AppInputText
                place_holder={"Password"}
                onChangeText={handleChange("Password")}
                value={values.Password}
                error={errors.Password}
                onBlur={() => setFieldTouched("Password")}
                touch={touched.Password}
                secureTextEntry={true}
                iconName={"lock"}
              ></AppInputText>

              <AppButton
                text={"התחבר"}
                style={styles.button}
                TextStyle={styles.buttonText}
                onPress={handleSubmit}
              ></AppButton>

              <AppButton
                text={"הרשמה"}
                style={styles.secondButton}
                TextStyle={styles.secondButtonText}
                onPress={handleSignUpPress}
              ></AppButton>

              <AppText
                text={"שכחת סיסמא?"}
                style={styles.text}
                onPress={() => forgotPassword()}
              ></AppText>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    borderWidth: 0,
    // marginBottom:40,
    backgroundColor: "#0782F9",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
  },
  secondButton: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  secondButtonText: {
    color: "#0782F9",
    fontWeight: 700,
    fontSize: 25,
  },
  text: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 25,
    textDecorationLine: "underline",
  },
});

export default LogInScreen;
