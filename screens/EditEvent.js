import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../firebaseConfig";
import { collection, updateDoc, getDocs, doc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import CategoryButton from "../components/CategoryButton";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const EditEvent = ({ route }) => {
  const navigation = useNavigation();
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [advertiserName, setAdvertiserName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [maxNumber, setMaxNumber] = useState("");
  const [minNumber, setMinNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [projectLocation, setProjectLocation] = useState("");
  const [participants, setParticipants] = useState([]);

  const [creator, setCreator] = useState("");

  const [fieldValidations, setFieldValidations] = useState({
    projectName: true,
    projectCategory: true,
    advertiserName: true,
    projectDescription: true,
    maxNumber: true,
    minNumber: true,
  });
  const userRef = collection(db, "users");

  useEffect(() => {
    if (route.params) {
      const {
        projectId,
        name,
        category,
        advertiserName,
        description,
        maxNum,
        minNum,
        date,
        time,
        location,
        creator,
        participants,
      } = route.params;
      setProjectId(projectId);
      setProjectName(name);
      setProjectCategory(category);
      setAdvertiserName(advertiserName);
      setProjectDescription(description);
      setMaxNumber(maxNum);
      setMinNumber(minNum);
      // setSelectedDate(date);
      // setSelectedTime(time);
      setProjectLocation(location);
      setCreator(creator);
      setParticipants(participants);
    }
  }, []);

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event, time) => {
    if (event.type === "set") {
      setSelectedTime(time);
    }
    setShowTimePicker(false);
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    const projectRef = doc(db, `projects/${projectId}`);
    // Reset all field validations
    setFieldValidations({
      projectName: true,
      projectCategory: true,
      advertiserName: true,
      projectDescription: true,
      maxNumber: true,
      minNumber: true,
    });

    if (projectCategory.trim() === "") {
      setIsCategorySelected(false);
    }

    // Check if all fields are filled
    if (
      projectName.trim() === "" ||
      projectCategory.trim() === "" ||
      advertiserName.trim() === "" ||
      projectDescription.trim() === "" ||
      maxNumber.trim() === "" ||
      minNumber.trim() === ""
    ) {
      // Set the validation status for each empty field to false
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        projectName: projectName.trim() !== "",
        projectCategory: projectCategory.trim() !== "",
        advertiserName: advertiserName.trim() !== "",
        projectDescription: projectDescription.trim() !== "",
        maxNumber: maxNumber.trim() !== "",
        minNumber: minNumber.trim() !== "",
        projectLocation: projectLocation.trim() !== "",
      }));

      return;
    }

    const maxNum = parseInt(maxNumber, 10);
    const minNum = parseInt(minNumber, 10);
    if (maxNum < minNum) {
      Alert.alert(
        "אופס!",
        "כמות המשתתפים המקסימלית צריכה להיות גדולה מכמות המשתתפים המינימלית!",
        [{ text: "אישור" }]
      );
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        maxNumber: false,
        minNumber: false,
      }));
      return;
    }

    const userEmail = auth.currentUser.email;

    try {
      // Create a new project object with the form data
      let project = {
        name: projectName,
        category: projectCategory,
        advertiserName: advertiserName,
        description: projectDescription,
        maxNum: parseInt(maxNumber),
        minNum: parseInt(minNumber),
        date: selectedDate,
        time: selectedTime,
        location: projectLocation,
      };

      // update the project to the "projects" collection in Firebase
      const docRef = updateDoc(projectRef, project);

      // Clear the form fields
      setProjectName("");
      setProjectCategory("");
      setAdvertiserName("");
      setProjectDescription("");
      setMaxNumber("");
      setMinNumber("");
      setSelectedDate(null);
      setSelectedTime(null);
      setProjectLocation("");

      Alert.alert("", "המיזם עודכן בהצלחה!", [{ text: "אישור" }]);

      let tokens = [];
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        participants.forEach((userEmail) => {
          if (userEmail === doc.data().email) {
            if (userEmail !== creator) {
              if (doc.data().token) {
                tokens.push(doc.data().token);
              }
            }
          }
        });
      });

      if (tokens.length > 0) {
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: tokens,
            title: "מיזם עודכן",
            body: "מיזם שנרשמת אליו עודכן",
          }),
        });
      }

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>שם המיזם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.projectName && styles.invalidInput,
          ]}
          value={projectName}
          onChangeText={setProjectName}
        />
        <Text style={styles.label}>שם המפרסם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.advertiserName && styles.invalidInput,
          ]}
          value={advertiserName}
          onChangeText={setAdvertiserName}
        />
        <CategoryButton
          selectedCategory={projectCategory}
          onSelectCategory={setProjectCategory}
          isCategorySelected={isCategorySelected}
          setIsCategorySelected={setIsCategorySelected}
        />
        <Text style={styles.label}>תיאור המיזם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.projectDescription && styles.invalidInput,
            { height: 100 },
          ]}
          value={projectDescription}
          onChangeText={setProjectDescription}
          maxLength={500}
          multiline={true}
          placeholder="עד 500 תווים"
        />
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.label}>כמות משתתפים מינימלית:</Text>
          <TextInput
            style={[
              styles.input,
              !fieldValidations.minNumber && styles.invalidInput,
              { height: 30, width: 60, marginRight: 15 },
            ]}
            value={minNumber}
            keyboardType="numeric"
            maxLength={7}
            onChangeText={setMinNumber}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>כמות משתתפים מקסימלית:</Text>
            <TextInput
              style={[
                styles.input,
                !fieldValidations.maxNumber && styles.invalidInput,
                { height: 30, width: 60, marginRight: 15 },
              ]}
              value={maxNumber}
              keyboardType="numeric"
              maxLength={7}
              onChangeText={setMaxNumber}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.label}>תאריך (לא חובה):</Text>
          {selectedDate ? (
            <Text style={styles.selectedDate}>
              {selectedDate.toLocaleDateString()}
            </Text>
          ) : (
            <Text style={styles.selectedDate}>לא נבחר תאריך</Text>
          )}
          <TouchableOpacity
            onPress={handleShowPicker}
            activeOpacity={0.7}
            style={styles.appDateButtonContainer}
          >
            <Text style={styles.appButtonText}>בחר תאריך</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.label}>שעה (לא חובה):</Text>
          {selectedTime ? (
            <Text style={styles.selectedDate}>
              {selectedTime.toLocaleTimeString()}
            </Text>
          ) : (
            <Text style={styles.selectedDate}>לא נבחרה שעה</Text>
          )}
          <TouchableOpacity
            onPress={handleShowTimePicker}
            activeOpacity={0.7}
            style={styles.appDateButtonContainer}
          >
            <Text style={styles.appButtonText}>בחר שעה</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        <Text style={[styles.label, { marginTop: 10 }]}>מיקום (לא חובה):</Text>
        <TextInput
          style={styles.input}
          value={projectLocation}
          onChangeText={setProjectLocation}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>עריכת מיזם</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: Platform.OS === 'ios'? "right" : null,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", 
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    width: "100%",
    height: 40,
    textAlign: "right",
    textAlignVertical: "top",
    //textAlign: Platform.OS === 'ios'? "right" : null,
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
    // textAlign: 'right'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#4682B4",
    borderRadius: 10,
    padding: 10,
  },
  appDateButtonContainer: {
    elevation: 8,
    marginBottom: 15,
    backgroundColor: "#708090",
    borderRadius: 10,
    padding: 10,
    width: "35%",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default EditEvent;
