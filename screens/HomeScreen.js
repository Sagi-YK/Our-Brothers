/**
 * this component will display an Our Brother message
 */
import React , { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,ScrollView,Modal } from "react-native";
import{db} from '../firebaseConfig'
import { collection ,onSnapshot} from "@firebase/firestore";


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;




const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [state,setState] =useState([])


  const handlePress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
    
  };

  useEffect(()=>{

    const projectRef = collection(db,'projects') // reference to collection projects

     // onSnapshot is a lisiting to refTode (collection)
    const subscriber = onSnapshot(projectRef,{
        // next is the callback function the got called evry time the collection is changed
        // snapshot is object of the collection that contain the data of the collection (docs)
        next:(snapshot)=>{
            const state =[]
            snapshot.docs.forEach((item)=>{
               if(item.data().status){
                state.push({
                  id:item.id,
                  ...item.data()
                })
               }   
            })
            setState(state)
        },
    })
    return () => subscriber();
},[])

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.text}>Our Brothers</Text>
      </View>
      <ScrollView style={styles.Scroll}>
        <View style={styles.mainPage}>
          {state.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.Eventbutton}
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
            <Text style={{ fontWeight: 'bold' }}>שם המיזם:</Text> {selectedEvent.name}
             {"\n\n"}
             <Text style={{ fontWeight: 'bold' }}>תאריך המיזם:</Text> {selectedEvent.date}
             {"\n\n"}
             <Text style={{ fontWeight: 'bold' }}>שעת המיזם:</Text> {selectedEvent.time}
             {"\n\n"}
             <Text style={{ fontWeight: 'bold' }}>מיקום המיזם:</Text> {selectedEvent.place}
             {"\n\n"}         
             <Text style={{ fontWeight: 'bold' }}>פרטים:</Text> {selectedEvent.details}
             {"\n\n"}    
              
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>הצטרף למיזם</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.CloseButtonText}>סגור</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    Eventbutton: {
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    joinButton: {
      backgroundColor: '#2196F3',
      borderRadius: 15,
      padding: 10,
      elevation: 2,
      flex: 1,
      margin: 10,
    },
    joinButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      
    },
    CloseButton: {
      backgroundColor: '#f44336',
      borderRadius: 15,
      padding: 10,
      elevation: 2,
      flex: 1,
      margin: 10,
    },
    CloseButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default HomeScreen;
