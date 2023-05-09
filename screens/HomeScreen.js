/**
 * this component will display an Our Brother message
 */
import React , { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,ScrollView,Modal } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const dataBase={
  'events':[
    {
      'id':'1',
      'name':'המכתבים שלנו ',
      'date': null,
      'time': null,
      'place': null,
      'isAproved': true,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'

    },
    {
      'id':'2',
      'name':'ריצה לזכר ',
      'date': '12.12.15',
      'time': '16.30',
      'place': 'הרצליה',
      'isAproved': true,
      'details':'ביום שני ה 23.5 נרוץ בהרצלים לזכר '
    },
    {
      'id':'3',
      'name':'זיכרון בסלון ירושלים ',
      'date': '12.12.16',
      'time': '16.30',
      'place': 'ירושלים',
      'isAproved': true,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'
    },
    {
      'id':'4',
      'name':'זיכרון בסלון תל אביב',
      'date': '12.12.17',
      'time': '19.00',
      'place': 'תל אביב',
      'isAproved': false,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'
    },
    {
      'id':'5',
      'name':'זיכרון בסלון הרצליה',
      'date': '12.12.18',
      'time': '16.30',
      'isAproved': true,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'

    },
    {
      'id':'6',
      'name':'מרתון לזכר ',
      'date': '12.12.19',
      'time': '16.30',
      'place': 'הרצליה',
      'isAproved': true ,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'
    },
    {
      'id':'7',
      'name':'שיפוץ רכב לזכר ',
      'date': '12.12.20',
      'time': '19.00',
      'place': 'הוד השרון ',
      'isAproved': false,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'
    },
    {
      'id':'8',
      'name':'יום גיבוש לזכר ',
      'date': '20.12.21',
      'time': '17.00',
      'place': 'הרצליה',
      'isAproved': true,
      'details':'ביום שני ה 25.5 ישלחו מכתבים לכולם'
    },
  ]
}
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
myEvent=null
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const approvedEvents = dataBase.events.filter((event) => event.isAproved);

  const handlePress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.text}>Our Brothers</Text>
      </View>
      <ScrollView style={styles.Scroll}>
        <View style={styles.mainPage}>
          {approvedEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.button}
              onPress={() => handlePress(event)}
            >
              <View>
                <Text style={styles.EventText}>{event.name}</Text>
                <Text style={styles.EventText}>{event.date} </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedEvent && (
      
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              שם המיזם: {selectedEvent.name}
              {"\n\n"}
              תאריך המיזם: {selectedEvent.date}
              {"\n\n"}
              מיקום המיזם: {selectedEvent.place}
              {"\n\n"}
              שעת המיזם: {selectedEvent.time}
              {"\n\n"}
              פרטים: {selectedEvent.details}
              {"\n\n"}
              <TouchableOpacity  style={styles.joinButton}>
                <Text style={styles.joinButtonText}>הצטרף למיזם</Text>
              </TouchableOpacity>
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>סגור</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </Modal>
      )}
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#87ceeb',
      flex: 1,
    },
    navBar: {
      // flex: 1,
      width: deviceWidth,
      height:deviceHeight/8,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#87ceeb',
      
    },
    mainPage: {
      // flex: 7,
      paddingTop: 0,
      height:deviceHeight,
      marginTop:deviceHeight/8,
      marginBottom:deviceHeight/8,
      width: deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#87ceeb',
    },
    Scroll:{
      paddingTop: 0
    },
    footer: {
      // flex: 1,
      width: deviceWidth,
      height:deviceHeight/10,
      // backgroundColor: 'green',
      borderTopColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row', // added to make the buttons display side by side
      backgroundColor: '#87ceeb',
    },
    text: {
      marginTop: 50,
      fontSize: 40,
    },
    button: {
      width: deviceWidth - 40,
      height: 80,
      backgroundColor: '#29AB87',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
      
    },
    EventText: {
      fontSize: 25,
      color: 'white',
      textAlign: "center",
    },


  
    buttonfootrText:{
      fontSize: 18,
      color: 'white',
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
      
    },
    modalView: {
      height: deviceHeight*0.8,
      width: deviceWidth*0.8,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.75,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 25,
      marginBottom: 15,
      textAlign: "center",
    },
    modalButton:{
      width: deviceWidth*0.5,
      height:deviceHeight*0.05,
      backgroundColor: 'red',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      margin: deviceHeight*0.1,
    },
    modalButtonText:{
      fontSize:25,
      color:'white',
    },
    joinButton:{
      width: deviceWidth*0.5,
      height:deviceHeight*0.05,
      backgroundColor: '#29AB87',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      margin: deviceHeight*0.55,
    },
    joinButtonText:{
      fontSize:25,
      color:'white',
    },



});

export default HomeScreen;
