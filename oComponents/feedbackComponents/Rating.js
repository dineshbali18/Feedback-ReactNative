import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity,FlatList} from 'react-native';
// import VoteTelugu from './VoteTelugu'
// import { getContestants1,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableHighlight} from 'react-native';
import tw from 'tailwind-rn'
import { getTeachers } from './helper/apiTeacherCalls';
import { SafeAreaView } from 'react-native-safe-area-context';





export default function Rating(props) {

  console.log(props.props.userId.current);
  const[token,setToken]=useState(props.props.token.current);
  const[userId,setUserId]=useState(props.props.userId.current)
  const [role,setRole]=useState(props.props.role.current)
  const [section,setSection]=useState(props.props.section.current)


  const goToCheckPercenta = () => {
    Actions.checkpercenta()
 }

    const remaining_s=useRef([]);
    const [BBMates,setBBMates]=useState([])
    const RemUsingSet=useRef(new Set());




    
    

    const loadAllContestants = async() => {
      //changes by section
        await getTeachers(section).then(data => {
            // console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            // console.log(data.contestants1)
           setBBMates(data);
           getRemainingSubjects(userId).then(data => {
            // console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            // console.log(data.contestants1)
           remaining_s.current=data;
           setRemUsingSet.current=new Set(remaining_s.current)
          }
        });;
          }
        });

      };
    
    // const castVote=(id)=>{
    //   if(votesleft>0){
    //     increVote(props.userId,id,props.token);
    //   }
    // }

    // const decre=()=>{
    //   if(votesleft>0){
    //   decrement(props.token,props.userId);
    //   }
    // }

    useEffect(()=>{
      const f1=async()=>{
        await loadAllContestants()
        f2();
        // .then(loadVotes())
      }
      
      f1();
    },[]);


    //   const Voteleft=()=>{
    //     if(votesleft>0){
    //     setVotesleft(votesleft-1)
    //     }
    //   }

    return (
        <>
        <SafeAreaView>
        <View>
        <Button  title="  go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <View><Text style={{fontWeight:"bold",marginLeft:50,fontSize:30}}>Feedback</Text></View>
        <ScrollView style={{height:'70%'}}>
        <View>
          {/* {console.log(RemUsingSet)} */}
          {BBMates.map((teacher,index)=>{
            return (
              <>
              <View style={{display:'flex',flexDirection:'row',borderStyle:'dotted',borderRadius:0.1,borderColor:'black'}}>
                <View>
              <Image source={{uri:teacher.photo}} 
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.2,
                backgroundColor:'#f00',
                margin:20,
                marginTop:30,
                border:'solid',
                marginLeft:25
              }}/>
              </View>
              <View style={{marginTop:25,maxWidth:250}}>
              <Text style={{fontWeight:'bold'}}>Name:</Text><Text>{teacher.t_name}</Text>
              <Text style={{fontWeight:'bold'}}>Subject:</Text><Text>{teacher.subject}</Text>
              <TouchableOpacity onPress={()=>{Actions.feedback(teacher)}}><Text style={{fontWeight:'bold',backgroundColor:'indigo',color:'white',borderRadius:10,paddingLeft:20,paddingRight:20,marginLeft:50}}>Feedback</Text></TouchableOpacity>
              </View>
              </View>
              </>
            )
          })
        }
        </View>
        </ScrollView>
        <View style={{marginTop:20}}>
        <Button color="#ff5c5c"  title="Chat" onPress={()=>{Actions.loadnames({token,userId,role,section})}}/>
        </View>
        </SafeAreaView>
        </>
    )
}
