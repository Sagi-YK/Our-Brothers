import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import{db,auth} from '../firebaseConfig'
import { addDoc, collection, updateDoc, getDocs, doc } from "@firebase/firestore";
import { useNavigation } from '@react-navigation/core';
import CategoryButton from '../components/CategoryButton';


const NewProjectScreen = () => {
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [advertiserName, setAdvertiserName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [minNumber, setMinNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [projectLocation, setProjectLocation] = useState('');
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
    if (!user){
      Alert.alert("","עליך להתחבר לפני שתוכל ליצור מיזם", [{text: "אישור", onPress: () => navigation.navigate('Profile')}])
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
      projectLocation: true,
    });

    if (projectCategory.trim() === '') {
      setIsCategorySelected(false);
    }

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

    const userEmail = auth.currentUser.email;
  
    try {
      // Create a new project object with the form data
      let project = {
        'name':projectName,
        'category':projectCategory,
        'advertiserName':advertiserName,
        'description':projectDescription,
        'maxNum':parseInt(maxNumber),
        'minNum':parseInt(minNumber),
        'date':selectedDate,
        'time':selectedTime,
        'location':projectLocation,
        'status':false,
        'creator':userEmail,
        'numpraticipants':1
      };
  
      // Save the project to the "projects" collection in Firebase
      const docRef = await addDoc(collection(db, 'projects'), project);
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

      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      const arr = [];
      arr.push(docRef.id);
      let userId = '';
      querySnapshot.forEach((doc) => {
        if (doc.data().email === userEmail) {
          userId = doc.id;
          doc.data().myEvents.forEach(userEvents => {
            arr.push(userEvents);
          })
        }})

      const userRef2 = doc(db, `users/${userId}`);
      await updateDoc(userRef2, {myEvents:arr});

      Alert.alert("","המיזם נוצר בהצלחה!", [{text: "אישור",}])
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding project: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding: 20}}>
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
        <View>
          <Text style={styles.label}>תאריך:</Text>
          <Text style={styles.selectedDate}>{selectedDate.toLocaleDateString()}</Text>
          <TouchableOpacity
            onPress={handleShowPicker}
            style={[styles.appDateButtonContainer, {backgroundColor: "#708090", width: 130}]}
          >
            <Text style={styles.appButtonTextDate}>בחר תאריך</Text>
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
          <TouchableOpacity
            onPress={handleShowTimePicker}
            style={[styles.appDateButtonContainer, {backgroundColor: "#708090", width: 130}]}
          >
            <Text style={styles.appButtonTextDate}>בחר שעה</Text>
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
          style={[
            styles.input,
            !fieldValidations.projectLocation && styles.invalidInput,
          ]}
          value={projectLocation}
          onChangeText={setProjectLocation}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.appButtonContainer}>
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
    flexDirection: 'column',
    backgroundColor: "#fff",
    justifyContent: 'flex-end',
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
    backgroundColor: "#4682B4",
    borderRadius: 10,
    padding: 10,
  },
  appDateButtonContainer: {
    elevation: 8,
    backgroundColor: "#4682B4",
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonTextDate: {
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
