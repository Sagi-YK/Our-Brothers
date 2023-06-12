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
  TouchableOpacity,
  Text,
} from "react-native";
import AppInputText from "../components/AppInputText";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { doc, getDocs, collection } from "firebase/firestore";

const validateSchema = Yup.object().shape({
  email: Yup.string().email("אימייל לא תקין!").required("שדה חובה!").label("Email"),
  Password: Yup.string().required("שדה חובה!").min(6,"מינימום 6 תווים!").matches(
    /^(?=.*[a-z])(?=.*[A-Z])/,
    "הסיסמא חייבת להכיל לפחות אות אחת גדולה ואות אחת קטנה!"
  ).label("Password"),
});
const userRef = collection(db, "users");

function LogInScreen(props) {
  const goToPage1 = () => {
    navigation.navigate("Sign-Up");
  };
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

              <TouchableOpacity activeOpacity={0.7} style={styles.button1} onPress={handleSubmit}>
                <Text style={styles.buttonText1}>התחבר</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.button2} onPress={handleSignUpPress}>
                <Text style={styles.buttonText2}>הרשמה</Text>
              </TouchableOpacity>

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
  text: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  button1: {
    width: 270,
    height: 55,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    width: 270,
    height: 55,
    marginBottom: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4682B4",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText1: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#4682B4",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LogInScreen;
