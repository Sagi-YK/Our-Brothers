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
  TouchableOpacity,
  Text,
} from "react-native";

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
  email: Yup.string().email("אימייל לא תקין!").required("שדה חובה!").label("Email"),
  Password: Yup.string().required("שדה חובה!").min(6,"מינימום 6 תווים!").matches(
    /^(?=.*[a-z])(?=.*[A-Z])/,
    "הסיסמא חייבת להכיל לפחות אות אחת גדולה ואות אחת קטנה!"
  ).label("Password"),
  confirm: Yup.string()
    .required("שדה חובה!")
    .min(6)
    .label("Confirm Password")
    .oneOf([Yup.ref("Password")], "סיסמאות לא תואמות!"),
  name: Yup.string().min(2, "שם לא תקין!").required("שדה חובה!"),
});

function SignUpScreen() {
  const [is_check, set_check] = useState(false);
  const navigation = useNavigation();

  const hadeleSignUp = (email, Password, name) => {
    createUserWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        const user = userCredential.user;

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
                place_holder={"Name"}
                onChangeText={handleChange("name")}
                value={values.name}
                error={errors.name}
                onBlur={() => setFieldTouched("name")}
                touch={touched.name}
                iconName={"account"}
              ></AppInputText>

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

              <AppInputText
                place_holder={"Confirm Password"}
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

              <TouchableOpacity activeOpacity={0.7} style={styles.button2} onPress={handleSubmit}>
                <Text style={styles.buttonText2}>הרשמה</Text>
              </TouchableOpacity>

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
  button2: {
    width: 270,
    height: 55,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },
  buttonText2: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
