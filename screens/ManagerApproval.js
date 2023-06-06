import React, { useEffect, useState } from 'react';
import { Button, FlatList } from 'react-native';
import { View,StyleSheet,ScrollView ,Alert } from 'react-native';
import ProjectApproval from '../components/ProjectApproval';
import {db,app} from '../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import AppInputText from '../components/AppInputText';



//const arr = [{text: "מיזם 1"},{text: "מיזם 2"},{text: "מיזם 3"}]


// function ManagerApproval(props){
//     const [todos,setTodos] = useState ([])
//     const [todo,setTodo] = useState ('')

//     useEffect(()=>{
//         const refTodo = collection(db,'todos'); // reference to the todos collection

//         // onSnapshot is a lisiting to refTode (collection)
//         const subscriber = onSnapshot(refTodo,{

//             // next is the callback function the got called evry time the collection is changed
//             // snapshot is object of the collection that contain the data of the collection (docs)
//             next:(snapshot)=>{
//                 const todos = [];
//                 snapshot.docs.forEach((doc)=>{
//                     todos.push({
//                         id:doc.id,
//                         ...doc.data(),
//                     });
//                 });
//                 setTodos(todos);
//                 console.log(todos)
//             },
//         });
//         return ()=>subscriber();

//     },[]);



//     // add doc to the collection projects
//     const add_doc = async ()=>{

//         try {
//             const doc = await addDoc(collection(db,"todos"),{done:false,name:todo})
//             setTodo('')
//           } catch (error) {
//             console.error(error);
//           }
//     }

  


//     const render = ({ item }) => {
//         const docref = doc(db, `todos/${item.id}`); // reference to specific doc, now i can update its fileds,delete it,etc
        
//         const del = async () => {
//             //   await updateDoc(docref, { done: !item.done }); update the done atribute of a filed
//             deleteDoc(docref) // delete this doc
//         };
      
//         return !item.done && (<Text onPress={del}>{item.name}</Text>);
//       };

//     return(
//         <View style={styles.container}>   

//         <View style = {styles.form}>
//             <AppInputText place_holder={"add new todo"} onChangeText={(Text)=>setTodo(Text)} value={todo}></AppInputText>
//             <Button onPress={()=>add_doc()} title='add Tode' disabled={todo===''}></Button>
//         </View>

//         <View>
//             <FlatList
//             data={todos}
//             keyExtractor={(item)=>item.id} 
//             renderItem={render}
//             >

//             </FlatList>
//         </View>

            
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container:{
//        justifyContent:'center',
//        alignItems:'center',
//        paddingLeft:40,
//        paddingTop:120,
//        flex:1,
//        width:"100%"     
//     },
//     form:{
//         flexDirection:'row'
//     }
    
// })


function ManagerApproval(props) {
    const [state,setState] =useState([])//current user


    

    useEffect(()=>{

        const projectRef = collection(db,'projects') // reference to collection projects

         // onSnapshot is a lisiting to refTode (collection)
        const subscriber = onSnapshot(projectRef,{
            // next is the callback function the got called evry time the collection is changed
            // snapshot is object of the collection that contain the data of the collection (docs)
            next:(snapshot)=>{
                const state =[]
                snapshot.docs.forEach((item)=>{
                    if(!item.data().status){

                        state.push({
                            id:item.id,
                            ...item.data()
                        })
                    }
                    
                })
                setState(state)
                console.log(state)
            },
        })

        return () => subscriber();

    },[])

    // when user press on aprrove button ask him if he sures he wants to approve project,
    //and if he does goes to aprroveProject function
    const handleAprrove =   (item)=>{
        Alert.alert("","לאשר פרויקט זה?",[{text:"סגור"},{text:"אישור", onPress:()=>approveProject(item)}])
        
    }

    // update the database that this project(item) is approved
    const approveProject =  async (item)=>{
        
        const docRef = doc(db,`projects/${item.id}`) // reference to specific doc, now i can update its fileds,delete it,etc

       await updateDoc(docRef,{status: !item.status}); // update specific filed in the doc

    }

    const handleCancell =   (item)=>{
        Alert.alert("","למחוק פרויקט זה?",[{text:"סגור"},{text:"אישור", onPress:()=>removeProject(item)}])
        
    }

    const removeProject =  async (item)=>{
        
        const docRef = doc(db,`projects/${item.id}`)

        await deleteDoc(docRef) // delete this doc

    }



    return (
        
    <ScrollView style = {styles.scroll}>
        <View style={styles.container}>

                {state.map((item)=>{
                    
                        return <ProjectApproval  key = {item.id} titleText={item.name} descriptionText={item.description} aprrovePress={()=>handleAprrove(item)} cancellPress={()=>handleCancell(item)} />
                    
                })}

        </View>
     </ScrollView>
    );
    {/* <FlatList 
    data={state}
    keyExtractor={(item)=>item.id}
    renderItem={({ item }) => !item.isAprrove? <ProjectApproval text={item.name} aprrovePress={()=>handleAprrove(item)} cancellPress={()=>handleCancell(item)} />: null} 
    

    /> */}
}
const styles = StyleSheet.create({
    container:{
      // justifyContent:'center',
       alignItems:'center',
       paddingTop:50,
       flex:1,
       //width:"100%"     
    },
    scroll:{

        backgroundColor:'#DCDCDC'
    }
    
})


export default ManagerApproval;