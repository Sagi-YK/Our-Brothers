import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import{db,auth} from '../firebaseConfig'
import { addDoc, collection } from "@firebase/firestore";


const NewProjectScreen = () => {
  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [advertiserName, setAdvertiserName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [minNumber, setMinNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [projectLocation, setProjectLocation] = useState(false);
  const [fieldValidations, setFieldValidations] = useState({
    projectName: true,
    projectCategory: true,
    advertiserName: true,
    projectDescription: true,
    maxNumber: true,
    minNumber: true,
    projectLocation: true,
  });

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleTimeChange = (event, time) => {
    if (time !== undefined) {
      setSelectedTime(time);
    }
    setShowTimePicker(false);
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async () => {
    // check if user log-in
    const user = auth.currentUser
    if (user){
      
    }
    else{

    }

    /// Reset all field validations
    setFieldValidations({
      projectName: true,
      projectCategory: true,
      advertiserName: true,
      projectDescription: true,
      maxNumber: true,
      minNumber: true,
      projectLocation: true,
    });

    // Check if all fields are filled
    if (
      projectName.trim() === '' ||
      projectCategory.trim() === '' ||
      advertiserName.trim() === '' ||
      projectDescription.trim() === '' ||
      maxNumber.trim() === '' ||
      minNumber.trim() === '' ||
      projectLocation.trim() === ''
    ) {
      // Set the validation status for each empty field to false
      setFieldValidations(prevValidations => ({
        ...prevValidations,
        projectName: projectName.trim() !== '',
        projectCategory: projectCategory.trim() !== '',
        advertiserName: advertiserName.trim() !== '',
        projectDescription: projectDescription.trim() !== '',
        maxNumber: maxNumber.trim() !== '',
        minNumber: minNumber.trim() !== '',
        projectLocation: projectLocation.trim() !== '',
      }));

      console.log('Please fill in all fields');
      return;
    }
  
    try {
      // Create a new project object with the form data
      const project = {
        projectName,
        projectCategory,
        advertiserName,
        projectDescription,
        maxNumber: parseInt(maxNumber),
        minNumber: parseInt(minNumber),
        selectedDate,
        selectedTime,
        projectLocation
      };

      let proj ={'name':projectName, 'category':projectCategory, 'advertiserName':advertiserName, 'description':projectDescription, 'maxNum':parseInt(maxNumber), 'minNum':parseInt(minNumber), 'date':selectedDate, 'time':selectedTime, 'location':projectLocation, 'status':false,'creator':auth.currentUser.email};
  
      // Save the project to the "projects" collection in Firebase
      const docRef = await addDoc(collection(db, 'projects'), proj);
      console.log('Project added with ID: ', docRef.id);
  
      // Clear the form fields
      setProjectName('');
      setProjectCategory('');
      setAdvertiserName('');
      setProjectDescription('');
      setMaxNumber('');
      setMinNumber('');
      setSelectedDate(new Date());
      setSelectedTime(new Date());
      setProjectLocation('');
    } catch (error) {
      console.error('Error adding project: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>שם המיזם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.projectName && styles.invalidInput,
          ]}
          value={projectName}
          onChangeText={setProjectName}
        />
        <Text style={styles.label}>קטגורית המיזם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.advertiserName && styles.invalidInput,
          ]}
          value={advertiserName}
          onChangeText={setAdvertiserName}
        />
        <Text style={styles.label}>שם המפרסם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.projectCategory && styles.invalidInput,
          ]}
          value={projectCategory}
          onChangeText={setProjectCategory}
        />
        <Text style={styles.label}>תיאור המיזם:</Text>
        <TextInput
          style={[
            styles.input,
            !fieldValidations.projectDescription && styles.invalidInput,
            {height: 100}
          ]}
          value={projectDescription}
          onChangeText={setProjectDescription}
          maxLength={200}
          multiline={true}
        />
        <View>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>כמות משתתפים מקסימלית:</Text>
            <TextInput
              style={[
                styles.input,
                !fieldValidations.maxNumber && styles.invalidInput,
                {height: 30, width: 60, marginRight: 15}
              ]}
              value={maxNumber}
              keyboardType='numeric'
              onChangeText={setMaxNumber}
            />
          </View>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>כמות משתתפים מינימלית:</Text>
            <TextInput
              style={[
                styles.input,
                !fieldValidations.minNumber && styles.invalidInput,
                {height: 30, width: 60, marginRight: 15}
              ]}
              value={minNumber}
              keyboardType='numeric'
              maxLength={999999999}
              onChangeText={setMinNumber}
              />
          </View>
        </View>
        <View >
          <Text style={styles.label}>תאריך:</Text>
          <Text style={styles.selectedDate}>{selectedDate.toDateString()}</Text>
          <TouchableOpacity
            onPress={handleShowPicker}
            style={[styles.appButtonContainer, {backgroundColor: "#708090", width: 130}]}
          >
            <Text style={styles.appButtonText}>בחר תאריך</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View>
          <Text style={styles.label}>שעה:</Text>
          <Text style={styles.selectedTime}>{selectedTime.toLocaleTimeString()}</Text>
          <TouchableOpacity onPress={handleShowTimePicker} style={[styles.appButtonContainer, {backgroundColor: "#708090", width: 130}]}>
            <Text style={styles.appButtonText}>בחר שעה</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        <Text style={[styles.label, {marginTop: 10}]}>מיקום:</Text>
        <TextInput
          style={styles.input}
          value={projectLocation}
          onChangeText={setProjectLocation}
        />
      </ScrollView>
      {/* <Button title="צור מיזם" onPress={handleSubmit} /> */}
      <TouchableOpacity onPress={handleSubmit} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>צור מיזם</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    width: '100%',
    height: 40,
    textAlign: 'right',
    textAlignVertical: "top"
  },
  selectedDate: {
    fontSize: 18,
    marginBottom: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#4682B4", // or 00BFFF
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default NewProjectScreen;
