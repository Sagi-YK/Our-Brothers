import React, { useEffect, useState } from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from '@firebase/firestore';

function StatisticsScreen(props) 
{
    const [statistics,setStatistics] = useState([]) // projects statistics 
    const [user_statistics,set_user_Statistics] = useState(0) // user statistics
    const [catgory_statistics,set_catgory_Statistics] = useState([]) // catagory statistics
    const [num_of_particanptns,set_num_of_particanptns_Statistics] = useState(0) // user num_of_particanptns

    useEffect(()=>{

        const refProjects = collection(db,'projects') // refernce to projects collection in the db

        const refusers = collection(db,'users') // refernce to users collection in the db

        const subscriber = []

        // onSnapshot is a lisiting to refTode (collection)
         subscriber[0] = onSnapshot(refProjects,{
            // next is the callback function the got called evry time the collection is changed
         
         
         
            // snapshot is object of the collection that contain the data of the collection (docs)
            next:(snapshot)=>{
               

                //console.log(snapshot.docs.length)
                let num_of_active_projects = 0
                let catgory_statistics = [0,0,0] 
                let num_of_projects = snapshot.docs.length
                const statistics =[]
                statistics.push(num_of_projects)
                let num_of_particanptns = 0

                snapshot.docs.forEach((item)=>{
                    

                    if(item.data().status) // if the projects is active increse the counter
                    {
                        num_of_active_projects = num_of_active_projects +1
                    }
                        
                    if(item.data().status)
                    {
                        
                        num_of_particanptns+=item.data().numpraticipants
                        if(item.data().category==='sport')
                        {
                            catgory_statistics [0]  =  catgory_statistics [0] + item.data().numpraticipants
                        }
                        else if(item.data().category==='cook')
                        {
                            catgory_statistics [1]  =   catgory_statistics [1] + item.data().numpraticipants
                        }
                        else
                        {
                            catgory_statistics [2]  =  catgory_statistics [2] + item.data().numpraticipants
                        }
                        
                    }   

                })
                set_catgory_Statistics(catgory_statistics)
                console.log(catgory_statistics)
                console.log(catgory_statistics[0]/num_of_particanptns)
                console.log(catgory_statistics[1]/num_of_particanptns)
                console.log(catgory_statistics[2]/num_of_particanptns)
                statistics.push(num_of_active_projects)
                setStatistics(statistics)
                set_num_of_particanptns_Statistics(num_of_particanptns)
                // console.log(statistics[0])
                // console.log(statistics[1])
            }
        })


         subscriber[1] = onSnapshot(refusers,{
            // next is the callback function the got called evry time the collection is changed
            // snapshot is object of the collection that contain the data of the collection (docs)
            
            next:(snapshot)=>{
                //console.log(snapshot.docs.length)
                set_user_Statistics(snapshot.docs.length)
                //console.log(user_statistics)
                
                
            }
        })



        return () => {
            subscriber.forEach(unsubscribe => unsubscribe());
        }
    },[])

    return (
        <View style = {styles.container}>

            <View style= {styles.textContainer}>
                <Text style = {styles.text}>מסך סטטיסטיקה:</Text>
            </View>

            <View style= {styles.textContainer}>
                <Text style = {styles.text}>כמות פרויקטים :{statistics[0]} </Text>
            </View>

            <View style= {styles.textContainer}>
                <Text style = {styles.text}>כמות פרויקטים פעילים : {statistics[1]} </Text>
            </View>

            <View style= {styles.textContainer}>
                <Text style = {styles.text}>כמות משתמשים : {user_statistics} </Text>
            </View>
            
            {catgory_statistics.map((item,index)=>{
                if(index==0)
                {
                    return<View style= {styles.textContainer} key={'sport'}>
                    <Text style = {styles.text}>אחוז משתתפים במיזמי ספורט : {item/num_of_particanptns*100} </Text>
                    </View> 
                }
                else if(index==1)
                {
                    return<View style= {styles.textContainer}  key={'cook'}>
                    <Text style = {styles.text} > אחוז משתתפים במיזמי בישול : {item/num_of_particanptns*100} </Text>
                    </View> 
                }
                else
                {
                    return<View style= {styles.textContainer}  key={'other'}>
                    <Text style = {styles.text}>אחוז משתתפים במיזמי אחר : {item/num_of_particanptns*100} </Text>
                    </View> 
                }

            })}


        </View>

          
     );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        //justifyContent:'center',
        alignItems:'center',
    },
    textContainer:{
         width:'100%',
        height:50,
        justifyContent:'center',
        //alignItems:'center',
        backgroundColor:'white',
        marginBottom:20,
        paddingRight:30,



    },
    text:{
        color: 'black',
        fontSize:25,
        fontWeight:'700',
        
    }
    
})

export default StatisticsScreen;