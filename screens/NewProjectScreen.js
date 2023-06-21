import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../firebaseConfig";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  doc,
} from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import CategoryButton from "../components/CategoryButton";

const NewProjectScreen = () => {
  const navigation = useNavigation();
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
  const [fieldValidations, setFieldValidations] = useState({
    projectName: true,
    projectCategory: true,
    advertiserName: true,
    projectDescription: true,
    maxNumber: true,
    minNumber: true,
  });

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
    // check if user log-in
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("", "דרושה התחברות למערכת", [
        { text: "אישור", onPress: () => navigation.navigate("Profile") },
      ]);
      return;
    }

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

      console.log("Please fill in all fields");
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
        status: false,
        creator: userEmail,
        numpraticipants: 1,
        participants: [userEmail],
      };

      // Save the project to the "projects" collection in Firebase
      const docRef = await addDoc(collection(db, "projects"), project);
      console.log("Project added with ID: ", docRef.id);

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

      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      const arr = [];
      arr.push(docRef.id);
      let userId = "";
      querySnapshot.forEach((doc) => {
        if (doc.data().email === userEmail) {
          userId = doc.id;
          doc.data().myEvents.forEach((userEvents) => {
            arr.push(userEvents);
          });
        }
      });

      const userRef2 = doc(db, `users/${userId}`);
      await updateDoc(userRef2, { myEvents: arr });

      Alert.alert("", "המיזם עבר לאישור מנהל!", [{ text: "אישור" }]);
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
          maxLength={20}
        />
        <Text style={styles.label}>שם המפרסם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.advertiserName && styles.invalidInput,
          ]}
          value={advertiserName}
          onChangeText={setAdvertiserName}
          maxLength={50}
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
            flexDirection: "row",
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
        <View
          style={{
            flexDirection: "row",
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
        <Text style={[styles.label, { marginTop: 10 }]}>מיקום (לא חובה):</Text>
        <TextInput
          style={styles.input}
          value={projectLocation}
          onChangeText={setProjectLocation}
          maxLength={50}
        />
        <View style={{ marginBottom: 20 }}>
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
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
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
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>צור מיזם</Text>
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
    // textAlign: "right",
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
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
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

export default NewProjectScreen;
