/**
 * this component will display an Our Brother message
 */
import React , { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,ScrollView,Modal, Alert } from "react-native";
import{db,auth} from '../firebaseConfig'
import { collection ,onSnapshot,doc,updateDoc,getDocs} from "@firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { string } from "yup";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const projectRef = collection(db,'projects') // reference to collection projects
const usersRef = collection(db,'users') // reference to collection users






const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [state,setState] =useState([])
  const navigation = useNavigation();


  const handlePress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
    
  };

  const handleEventPress = async (event) => {
    const user = auth.currentUser;
  if (user) {
    // User is signed in, perform the action
    console.log("user log in");
    const uEmail = user.email; // save the current user email 
    console.log(uEmail);

    let Myparticipants=[]; //create empty array to save all the participats of the porject
    Myparticipants.push(uEmail);
    console.log(Myparticipants);
    // check if we have participants to this project and concat event.participants to  mtparticipants
    let flag=false;
    if (event.participants)
    {
      //loop on all the pariticpants
      
      event.participants.forEach(item=>{
        // check if the user allrady sign to the event
        if(item===uEmail){
          Alert.alert("","המשתמש כבר רשום למיזם", [{text: "סגור",onPress:() => setModalVisible(false)}])
          flag=true;
          return;
        }
        //push the participant to Myparticipants
        Myparticipants.push(item);
      })
      
    }
    if(flag){
      return;
    }

    //update the doc 
    const docRefprojects = doc(db,`projects/${event.id}`)
    updateDoc(docRefprojects,{participants : Myparticipants}); // update specific filed in the doc

    setModalVisible(false);

   

    const allData=await getDocs(usersRef);
    let dealisArray=[];
    let userId;
    console.log("id  "+event.id)
    dealisArray.push(event.id);
    console.log("event  "+event)
    allData.forEach(doc=>{
      if(doc.data().email==uEmail){
        userId=doc.id;
       doc.data().myEvents.forEach(currentEvent=>{
        dealisArray.push(currentEvent);
       }) 
      }
     
    })
   
    const docRefUsers = doc(db,`users/${userId}`)
    updateDoc(docRefUsers, {myEvents : dealisArray});


  } else {
    // User is not signed in, handle the case accordingly
    console.log("user not log in");
    Alert.alert("","עלייך להתחבר תחילה", [{text: "סגור",onPress:() => {
      setModalVisible(false)
      navigation.navigate("Profile");
    }}])
    
  
    
    
  }
  };

  useEffect(()=>{

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
      {/* <View style={styles.navBar}>
        <Text style={styles.text}>Our Brothers</Text>
      </View> */}
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
          <TouchableOpacity style={styles.CloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.CloseButtonText}>סגור</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}onPress= {()=>handleEventPress(selectedEvent)}>הצטרף למיזם</Text>
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
      backgroundColor: '#dcdcdc',
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
      // backgroundColor: 'red ',
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
    backgroundColor: '#72A0C1',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderWidth: 2,
    borderColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
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
