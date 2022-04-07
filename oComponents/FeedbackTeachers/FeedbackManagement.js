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
import {fetchFeedback} from './helper/apicalls'

export default function FeedbackManagement(props) {
    // console.log("/////////////////////////////")
    // console.log(props);
    // const[token,setToken]=useState(props.token.current);
    // const[userId,setUserId]=useState(props.userId.current)
    // const [role,setRole]=useState(props.role.current)

  const [secData,setSecData]=useState([]);


  const setSectionData=()=>{
      fetchFeedback().then(data => {
        // console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
       setSecData(data.messageFromManagement);
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
      <Text style={{fontWeight:"bold"}}>Feedback from Students</Text>
      <Text style={{fontWeight:"bold"}}>Section:(section name)</Text>
      </View>
      <ScrollView>
        <View>
          {secData.map((feedback,index)=>{
            return (
              <>
              <ScrollView>
              <View>
                <Text>{feedback}</Text>
              </View>
              </ScrollView>
              </>
            )
          })
        }
        </View>
        </ScrollView>
        
      </SafeAreaView>
      </>

    );
  }
