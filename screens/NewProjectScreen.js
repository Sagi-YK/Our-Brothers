import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const handleSubmit = () => {
    console.log('Project name:', projectName);
    console.log('Advertiser name:', advertiserName);
    console.log('Project category:', projectCategory);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>שם המיזם:</Text>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={setProjectName}
        />
        <Text style={styles.label}>קטגורית המיזם:</Text>
        <TextInput
          style={styles.input}
          value={advertiserName}
          onChangeText={setAdvertiserName}
        />
        <Text style={styles.label}>שם המפרסם:</Text>
        <TextInput
          style={styles.input}
          value={projectCategory}
          onChangeText={setProjectCategory}
        />
        <Text style={styles.label}>תיאור המיזם:</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          value={projectDescription}
          onChangeText={setProjectDescription}
          maxLength={200}
          multiline={true}
        />
        <View>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>כמות משתתפים מקסימלית:</Text>
            <TextInput
              style={[styles.input, {height: 30, width: 60, marginRight: 15}]}
              value={maxNumber}
              keyboardType='numeric'
              onChangeText={setMaxNumber}
            />
          </View>
          <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.label}>כמות משתתפים מינימלית:</Text>
            <TextInput
              style={[styles.input, {height: 30, width: 60, marginRight: 15}]}
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
          <TouchableOpacity onPress={handleShowPicker} style={[styles.appButtonContainer, {backgroundColor: "#708090", width: 130}]}>
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
          value={projectName}
          onChangeText={setProjectName}
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
  }
});

export default NewProjectScreen;
