import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";
const deviceWidth = Dimensions.get("window").width;

function StatisticsScreen(props) {
  const [statistics, setStatistics] = useState([]); // projects statistics
  const [user_statistics, set_user_Statistics] = useState(0); // user statistics
  const [catgory_statistics, set_catgory_Statistics] = useState([]); // catagory statistics
  const [num_of_particanptns, set_num_of_particanptns_Statistics] = useState(0); // user num_of_particanptns
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const refProjects = collection(db, "projects"); // refernce to projects collection in the db

    const refusers = collection(db, "users"); // refernce to users collection in the db

    const subscriber = [];

    // onSnapshot is a lisiting to refTode (collection)
    subscriber[0] = onSnapshot(refProjects, {
      // next is the callback function the got called evry time the collection is changed

      // snapshot is object of the collection that contain the data of the collection (docs)
      next: (snapshot) => {
        let num_of_active_projects = 0;
        let catgory_statistics = [];
        for (let index = 0; index < 32; index++) {
          catgory_statistics[index] = 0;
        }
        let num_of_projects = snapshot.docs.length;
        const statistics = [];
        statistics.push(num_of_projects);
        let num_of_particanptns = 0;

        snapshot.docs.forEach((item) => {
          if (item.data().status) {
            // if the projects is active increse the counter
            num_of_active_projects = num_of_active_projects + 1;
          }

          if (item.data().status) {
            num_of_particanptns += item.data().numpraticipants;
            switch (item.data().category) {
              case "טכנולוגיה":
                catgory_statistics[0] =
                  catgory_statistics[0] + item.data().numpraticipants;
                break;
              case "ספורט":
                catgory_statistics[1] =
                  catgory_statistics[1] + item.data().numpraticipants;
                break;
              case "בריאות":
                catgory_statistics[2] =
                  catgory_statistics[2] + item.data().numpraticipants;
                break;
              case "מוזיקה":
                catgory_statistics[3] =
                  catgory_statistics[3] + item.data().numpraticipants;
                break;
              case "ריקוד":
                catgory_statistics[4] =
                  catgory_statistics[4] + item.data().numpraticipants;
                break;
              case "תזונה":
                catgory_statistics[5] =
                  catgory_statistics[5] + item.data().numpraticipants;
                break;
              case "מפגשים":
                catgory_statistics[6] =
                  catgory_statistics[6] + item.data().numpraticipants;
                break;
              case "קריאה וכתיבה":
                catgory_statistics[7] =
                  catgory_statistics[7] + item.data().numpraticipants;
                break;
              case "התנדבות":
                catgory_statistics[8] =
                  catgory_statistics[8] + item.data().numpraticipants;
                break;
              case 'גמ"ח':
                catgory_statistics[9] =
                  catgory_statistics[9] + item.data().numpraticipants;
                break;
              case "עמותה":
                catgory_statistics[10] =
                  catgory_statistics[10] + item.data().numpraticipants;
                break;
              case "אירוע":
                catgory_statistics[11] =
                  catgory_statistics[11] + item.data().numpraticipants;
                break;
              case "שטח":
                catgory_statistics[12] =
                  catgory_statistics[12] + item.data().numpraticipants;
                break;
              case "בינלאומי":
                catgory_statistics[13] =
                  catgory_statistics[13] + item.data().numpraticipants;
                break;
              case "טיפולי":
                catgory_statistics[14] =
                  catgory_statistics[14] + item.data().numpraticipants;
                break;
              case "בידור":
                catgory_statistics[15] =
                  catgory_statistics[15] + item.data().numpraticipants;
                break;
              case "אופנה":
                catgory_statistics[16] =
                  catgory_statistics[16] + item.data().numpraticipants;
                break;
              case "משפטי":
                catgory_statistics[17] =
                  catgory_statistics[17] + item.data().numpraticipants;
                break;
              case "חינוך":
                catgory_statistics[18] =
                  catgory_statistics[18] + item.data().numpraticipants;
                break;
              case "שירותים חברתיים":
                catgory_statistics[19] =
                  catgory_statistics[19] + item.data().numpraticipants;
                break;
              case "שירותים חינמיים":
                catgory_statistics[20] =
                  catgory_statistics[20] + item.data().numpraticipants;
                break;
              case "כלכלי":
                catgory_statistics[21] =
                  catgory_statistics[21] + item.data().numpraticipants;
                break;
              case "תחבורה":
                catgory_statistics[22] =
                  catgory_statistics[22] + item.data().numpraticipants;
                break;
              case "בעלי חיים":
                catgory_statistics[23] =
                  catgory_statistics[23] + item.data().numpraticipants;
                break;
              case "חברה ורוח":
                catgory_statistics[24] =
                  catgory_statistics[24] + item.data().numpraticipants;
                break;
              case "תקשורת":
                catgory_statistics[25] =
                  catgory_statistics[25] + item.data().numpraticipants;
                break;
              case "בנייה ושיפוץ":
                catgory_statistics[26] =
                  catgory_statistics[26] + item.data().numpraticipants;
                break;
              case "פנאי":
                catgory_statistics[27] =
                  catgory_statistics[27] + item.data().numpraticipants;
                break;
              case "ילדים ונוער":
                catgory_statistics[28] =
                  catgory_statistics[28] + item.data().numpraticipants;
                break;
              case "קבוצה":
                catgory_statistics[29] =
                  catgory_statistics[29] + item.data().numpraticipants;
                break;
              case "פוליטיקה":
                catgory_statistics[30] =
                  catgory_statistics[30] + item.data().numpraticipants;
                break;
              default:
                catgory_statistics[31] =
                  catgory_statistics[31] + item.data().numpraticipants;
                break;
            }
          }
        });
        set_catgory_Statistics(catgory_statistics);
        statistics.push(num_of_active_projects);
        setStatistics(statistics);
        set_num_of_particanptns_Statistics(num_of_particanptns);
      },
    });

    subscriber[1] = onSnapshot(refusers, {
      // next is the callback function the got called evry time the collection is changed
      // snapshot is object of the collection that contain the data of the collection (docs)

      next: (snapshot) => {
        set_user_Statistics(snapshot.docs.length);
      },
    });

    return () => {
      subscriber.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.maintext}>
        <Text style={styles.titletext}>
          כמות פרויקטים שנוצרו : {statistics[0]}{" "}
        </Text>
      </View>

      <View style={styles.maintext}>
        <Text style={styles.titletext}>
          כמות פרויקטים שאושרו : {statistics[1]}{" "}
        </Text>
      </View>

      <View style={styles.maintext}>
        <Text style={styles.titletext}>כמות משתמשים : {user_statistics} </Text>
      </View>
      <TouchableOpacity style={styles.maintext} onPress={toggleModal}>
        <Text style={styles.titletext}> לחץ כאן לעוד סטטסטיקה </Text>
      </TouchableOpacity>

      {/* Other statistics */}

      <ScrollView>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {catgory_statistics.map((item, index) => {
                  let number = ((item / num_of_particanptns) * 100).toFixed(2);
                  if (isNaN(number)) {
                    number = 0;
                  }
                  if (index == 0) {
                    return (
                      <View style={styles.textContainer} key={"טכנולוגיה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי טכנולוגיה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 1) {
                    return (
                      <View style={styles.textContainer} key={"ספורט"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי ספורט : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 2) {
                    return (
                      <View style={styles.textContainer} key={"בריאות"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי בריאות : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 3) {
                    return (
                      <View style={styles.textContainer} key={"מוזיקה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי מוזיקה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 4) {
                    return (
                      <View style={styles.textContainer} key={"ריקוד"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי ריקוד : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 5) {
                    return (
                      <View style={styles.textContainer} key={"תזונה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי תזונה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 6) {
                    return (
                      <View style={styles.textContainer} key={"מפגשים"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי מפגשים : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 7) {
                    return (
                      <View style={styles.textContainer} key={"קריאה וכתיבה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי קריאה וכתיבה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 8) {
                    return (
                      <View style={styles.textContainer} key={"התנדבות"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי התנדבות : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 9) {
                    return (
                      <View style={styles.textContainer} key={'גמ"ח'}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי גמ"ח : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 10) {
                    return (
                      <View style={styles.textContainer} key={"עמותה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי עמותה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 11) {
                    return (
                      <View style={styles.textContainer} key={"אירוע"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי אירוע : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 12) {
                    return (
                      <View style={styles.textContainer} key={"שטח"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי שטח : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 13) {
                    return (
                      <View style={styles.textContainer} key={"בינלאומי"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי בינלאומי : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 14) {
                    return (
                      <View style={styles.textContainer} key={"טיפולי"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי טיפולי : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 15) {
                    return (
                      <View style={styles.textContainer} key={"בידור"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי בידור : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 16) {
                    return (
                      <View style={styles.textContainer} key={"אופנה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי אופנה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 17) {
                    return (
                      <View style={styles.textContainer} key={"משפטי"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי משפטי : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 18) {
                    return (
                      <View style={styles.textContainer} key={"חינוך"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי חינוך : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 19) {
                    return (
                      <View
                        style={styles.textContainer}
                        key={"שירותים חברתיים"}
                      >
                        <Text style={styles.text}>
                          {" "}
                          מיזמי שירותים חברתיים : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 20) {
                    return (
                      <View
                        style={styles.textContainer}
                        key={"שירותים חינמיים"}
                      >
                        <Text style={styles.text}>
                          {" "}
                          מיזמי שירותים חינמיים : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 21) {
                    return (
                      <View style={styles.textContainer} key={"כלכלי"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי כלכלי : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 22) {
                    return (
                      <View style={styles.textContainer} key={"תחבורה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי תחבורה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 23) {
                    return (
                      <View style={styles.textContainer} key={"בעלי חיים"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי בעלי חיים : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 24) {
                    return (
                      <View style={styles.textContainer} key={"חברה ורוח"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי חברה ורוח : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 25) {
                    return (
                      <View style={styles.textContainer} key={"תקשורת"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי תקשורת : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 26) {
                    return (
                      <View style={styles.textContainer} key={"בנייה ושיפוץ"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי בנייה ושיפוץ : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 27) {
                    return (
                      <View style={styles.textContainer} key={"פנאי"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי פנאי : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 28) {
                    return (
                      <View style={styles.textContainer} key={"ילדים ונוער"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי ילדים ונוער : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 29) {
                    return (
                      <View style={styles.textContainer} key={"קבוצה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי קבוצה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else if (index == 30) {
                    return (
                      <View style={styles.textContainer} key={"פוליטיקה"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי פוליטיקה : {number} %{" "}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View style={styles.textContainer} key={"אחר"}>
                        <Text style={styles.text}>
                          {" "}
                          מיזמי אחר : {number} %{" "}
                        </Text>
                      </View>
                    );
                  }
                })}

                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.speacil}>סגור</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  speacil: {
    marginTop: 20,
    color: "blue",
    fontSize: 13,
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    // bottom:-10,
    //right: Platform.OS==='android'? '50%':null,
    left: Platform.OS === "ios" ? "45%" : "42%",
  },

  textContainer: {
    marginTop: 30,
    color: "black",
    fontSize: 13,
    fontWeight: "700",
    // backgroundColor: '##ADD8E6',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#00a099",
    paddingRight: 10,
  },

  maintext: {
    padding: 40,
    marginTop: 30,
    color: "black",
    fontSize: 13,
    fontWeight: "700",
    // backgroundColor: '##ADD8E6',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#00a099",
    justifyContent: "center",
    alignItems: "center",
  },
  titletext: {
    fontSize: 15,
    fontWeight: "bold",
    paddingRight: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    //justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseText: {
    fontSize: 16,
    color: "blue",
  },

  text: {
    textAlign: Platform.OS === "ios" ? "right" : null,
  },
});

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         paddingTop:40,
//         //justifyContent:'center',
//         alignItems:'center',
//     },
//     textContainer:{
//          width:'100%',
//         height:50,
//         justifyContent:'center',
//         //alignItems:'center',
//         backgroundColor:'white',
//         marginBottom:20,
//         paddingRight:30,

//     },
//     text:{
//         color: 'black',
//         fontSize:13,
//         fontWeight:'700',
//         // backgroundColor: '##ADD8E6',
//         borderRadius: 7,
//         borderWidth: 2,
//         borderColor: '#00a099',
//         paddingRight: 10,

//     },
//     titletext:
//     {
//         color: 'black',
//         fontSize:16,
//         fontWeight:'700',
//         paddingRight: 10,
//         // backgroundColor: '##ADD8E6',
//         borderRadius: 7,
//         borderWidth: 2,
//         borderColor: '#00a099',
//         alignContent: 'center',
//         justifyContent: 'center',
//         alignItems: 'center'

//     }

// })

export default StatisticsScreen;
