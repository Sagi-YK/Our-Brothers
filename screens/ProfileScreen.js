// /**
//  * this component will display the profile page
//  */

// import React from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// const ProfilePage = () => {
//   // <Text style={{ paddingTop: 20, fontSize: 50 }}>HI</Text>;
//   <View style={styles.container}>
//     <View style={styles.containerHead}>
//       <Text style={styles.headText}>שלום</Text>
//     </View>
//     <View style={styles.containerButtons}>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>התחברות</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>המיזמים שלי</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>עדכון פרטים</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>הגדרות</Text>
//       </TouchableOpacity>
//     </View>
//   </View>;
// };

// // const ProfileScreen = ({ navigation }) => {
// //   const goToPage1 = () => {
// //     navigation.navigate("Page1");
// //   };

// //   const goToPage2 = () => {
// //     navigation.navigate("Page2");
// //   };

// //   const goToPage3 = () => {
// //     navigation.navigate("Page3");
// //   };

// //   const goToPage4 = () => {
// //     navigation.navigate("Page4");
// //   };
// const ProfileScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="ProfilePage" component={ProfilePage} />
//       {/* <Stack.Screen name="Page1" component={Page1} />
//         <Stack.Screen name="Page2" component={Page2} />
//         <Stack.Screen name="Page3" component={Page3} /> */}
//       {/* <Stack.Screen name="Page4" component={Page4} /> */}
//     </Stack.Navigator>

//     // <View style={styles.container}>
//     //   <View style={styles.containerHead}>
//     //     <Text style={styles.headText}>שלום</Text>
//     //   </View>
//     //   <View style={styles.containerButtons}>
//     //     <TouchableOpacity style={styles.button} onPress={goToPage1}>
//     //       <Text style={styles.buttonText}>התחברות</Text>
//     //     </TouchableOpacity>
//     //     <TouchableOpacity style={styles.button} onPress={goToPage2}>
//     //       <Text style={styles.buttonText}>המיזמים שלי</Text>
//     //     </TouchableOpacity>
//     //     <TouchableOpacity style={styles.button} onPress={goToPage3}>
//     //       <Text style={styles.buttonText}>עדכון פרטים</Text>
//     //     </TouchableOpacity>
//     //     <TouchableOpacity style={styles.button} onPress={goToPage4}>
//     //       <Text style={styles.buttonText}>הגדרות</Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   containerHead: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     marginTop: 60,
//   },
//   containerButtons: {
//     flex: 4,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   button: {
//     width: 200,
//     height: 60,
//     marginBottom: 30,
//     borderRadius: 10,
//     backgroundColor: "#007aff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   headText: {
//     color: "#000",
//     fontSize: 32,
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;

// import React from "react";
// import { Button, View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
// import Page1 from './Page1';
// import Page2 from './Page2';
// import Page3 from './Page3';
// import Page4 from './Page4';

// const Stack = createStackNavigator();

// <Stack.Navigator>
//   <Stack.Screen name="Page1" component={Page1} />
//   <Stack.Screen name="Page2" component={Page2} />
//   <Stack.Screen name="Page3" component={Page3} />
//   <Stack.Screen name="Page4" component={Page4} />
// </Stack.Navigator>

// const goToPage1 = () => {
//   navigation.navigate('Page1');
// };

// const goToPage2 = () => {
//   navigation.navigate('Page2');
// };

// const goToPage3 = () => {
//   navigation.navigate('Page3');
// };

// const goToPage4 = () => {
//   navigation.navigate('Page4');
// };

//   return (
//     <View style={styles.container}>
//       <View style={styles.containerHead}>
//         <Text style={styles.headText}>שלום</Text>
//       </View>
//       <View style={styles.containerButtons}>
//         <TouchableOpacity style={styles.button} onPress={goToPage1}>
//           <Text style={styles.buttonText}>התחברות</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={goToPage2}>
//           <Text style={styles.buttonText}>המיזמים שלי</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={goToPage3}>
//           <Text style={styles.buttonText}>עדכון פרטים</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={goToPage4}>
//           <Text style={styles.buttonText}>הגדרות</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   containerHead: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     marginTop: 60,
//   },
//   containerButtons: {
//     flex: 4,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   button: {
//     width: 200,
//     height: 60,
//     marginBottom: 30,
//     borderRadius: 10,
//     backgroundColor: "#007aff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   headText: {
//     color: "#000",
//     fontSize: 32,
//     fontWeight: "bold",
//   },
// });

// export default ProfilePage;

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Page1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 1</Text>
    </View>
  );
};

const Page2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 2</Text>
    </View>
  );
};

const Page3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 3</Text>
    </View>
  );
};

const Page4 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Page 4</Text>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
    </Stack.Navigator>
  );
};

const ProfilePage = ({ navigation }) => {
  const goToPage1 = () => {
    navigation.navigate("Page1");
  };

  const goToPage2 = () => {
    navigation.navigate("Page2");
  };

  const goToPage3 = () => {
    navigation.navigate("Page3");
  };

  const goToPage4 = () => {
    navigation.navigate("Page4");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headText}>שלום</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={goToPage1}>
          <Text style={styles.buttonText}>התחברות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage2}>
          <Text style={styles.buttonText}>המיזמים שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage3}>
          <Text style={styles.buttonText}>עדכון פרטים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage4}>
          <Text style={styles.buttonText}>הגדרות</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  containerHead: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 60,
  },
  containerButtons: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  button: {
    width: 250,
    height: 60,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headText: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
