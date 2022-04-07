import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity,FlatList} from 'react-native';
// import VoteTelugu from './VoteTelugu'
// import { getContestants1,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableHighlight} from 'react-native';
import tw from 'tailwind-rn'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFeedbackData} from './helper/apicalls'

export default function select(props) {
    
    const[token,setToken]=useState(props.props.token.current);
    const[userId,setUserId]=useState(props.props.userId.current)
    const [role,setRole]=useState(props.props.role.current)

  const [secData,setSecData]=useState([]);


  const setSectionData=()=>{
      getFeedbackData(userId).then(data => {
        console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
       setSecData(data);
      }
    });
  };


  
  useEffect(()=>{
    const f1=async()=>{
      await setSectionData()
      // .then(loadVotes())
    }
    f1();
  },[]);

  
  
  
    return (
      <>
      <SafeAreaView>
      <View style={{margin:20}}>
      <Text style={{fontWeight:"bold"}}>Hello (name)</Text>
      </View>
      <ScrollView style={{height:'70%'}}>
        <View>
          {secData.map((teacher,index)=>{
            return (
              <>
              <View style={{display:'flex',flexDirection:'row',borderStyle:'dotted',borderRadius:0.1,borderColor:'black'}}>
                <View>
              <Text
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.2,
                backgroundColor:'white',
                margin:20,
                marginTop:30,
                border:'solid',
                marginLeft:25,
                paddingLeft:8,
                alignContent:'center',
                paddingTop:10,
                fontSize:30
              }}>{teacher.section}</Text>
              </View>
              <View style={{marginTop:25,maxWidth:250}}>
              <Text style={{fontWeight:'bold'}}>Rating:</Text><Text>{teacher.rating}</Text>
              <Text style={{fontWeight:'bold'}}>Subject:</Text><Text>{teacher.subject}</Text>
              <TouchableOpacity onPress={()=>{Actions.feedback(teacher)}}><Text style={{fontWeight:'bold',backgroundColor:'indigo',color:'white',borderRadius:10,paddingLeft:20,marginLeft:0,marginTop:4,paddingRight:10}}>check Feedback</Text></TouchableOpacity>
              </View>
              </View>
              </>
            )
          })
        }
        </View>
        </ScrollView>
        <View>
        <TouchableOpacity onPress={()=>{Actions.feedback(teacher)}}><Text style={{fontWeight:'bold',backgroundColor:'indigo',color:'white',borderRadius:0,paddingLeft:20,marginLeft:0,marginTop:4,paddingRight:10}}>Management Feedback</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
      </>

    );
  }
