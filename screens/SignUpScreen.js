import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";


import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import AppButton from "../components/AppButton";
import AppInputText from "../components/AppInputText";
import AppCheckBox from "../components/AppCheckBox";
import {
  addDoc,
  collection,
  
} from "firebase/firestore";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const validateSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().min(6).matches(
    /^(?=.*[a-z])(?=.*[A-Z])/,
    "Password must contain both lowercase and uppercase letters"
  ).label("Password"),
  confirm: Yup.string()
    .required()
    .min(6)
    .label("Confirm Password")
    .oneOf([Yup.ref("Password")], "Passwords must match"),
  name: Yup.string().required(),
});
function SignUpScreen() {
  const [is_check, set_check] = useState(false);
  const navigation = useNavigation();

  const hadeleSignUp = (email, Password, name) => {
    createUserWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        const user = userCredential.user;

        // navigation.navigate("Home")
        registerForPushNotificationsAsync().then((token) => {
          let userDoc = {
            email: user.email,
            myEvents: [],
            isdeleted: false,
            name: name,
          };
          if (token) {
            userDoc["token"] = token;
          }
          addDoc(collection(db, "users"), userDoc)
            .then(() => {
              navigation.navigate("Home");
            })
            .catch((error) => {
              console.log(error);
            });
        })
          .catch(()=>{
          let userDoc = {
            email: user.email,
            myEvents: [],
            isdeleted: false,
            name: name,
          };
          addDoc(collection(db, "users"), userDoc)
            .then(() => {
              navigation.navigate("Home");
            })

        })
      })
      .catch((error) => {
        Alert.alert("אופס", "האימייל נמצא במערכת או שלא תקין", [
          { text: "אישור" },
        ]);
      });
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{ email: "", Password: "", confirm: "", name: "" }}
        onSubmit={(values) =>
          hadeleSignUp(values.email, values.Password, values.name)
        }
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
                place_holder={"name"}
                onChangeText={handleChange("name")}
                value={values.name}
                error={errors.name}
                onBlur={() => setFieldTouched("name")}
                touch={touched.name}
                iconName={"account"}
              ></AppInputText>

              <AppInputText
                place_holder={"email"}
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

              <AppInputText
                place_holder={"confirm-Password"}
                onChangeText={handleChange("confirm")}
                value={values.confirm}
                error={errors.confirm}
                onBlur={() => setFieldTouched("confirm")}
                touch={touched.confirm}
                secureTextEntry={true}
                iconName={"lock"}
              ></AppInputText>

              <AppCheckBox
                icon_name={"check"}
                icon_size={30}
                icon_color={"black"}
                onPress={() => set_check(!is_check)}
                isCheck={is_check}
              ></AppCheckBox>

              <AppButton
                text={"הרשמה"}
                style={styles.secondButton}
                TextStyle={styles.secondButtonText}
                onPress={handleSubmit}
              ></AppButton>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </ScrollView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    //   alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondButton: {
    borderWidth: 0,
    backgroundColor: "#0782F9",
    //  justifyContent: "center",
    //  alignItems: "center",
     //paddingBottom:20
  },
  secondButtonText: {
    fontSize: 25,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center"
    
    
  },
});

export default SignUpScreen;
