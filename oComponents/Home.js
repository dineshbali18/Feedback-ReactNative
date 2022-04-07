import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
// const { performance } = require('perf_hooks');
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert} from 'react-native';
import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';
import { focusProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import LoadNames from './chatCompo/LoadNames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feedback from './feedbackComponents/Feedback';
import Select from './FeedbackTeachers/Select';
import Rating from './feedbackComponents/Rating';


export default function Home(props) {

  console.log(props.state);
  const [name,setName]=useState(props.name.current)
  const[token,setToken]=useState(props.token.current);
  const[userId,setUserId]=useState(props.userId.current)
  const [role,setRole]=useState(props.role.current)


  return (
    <>
  {role==0?
  <>
  <Rating props={props}/>
  </>:
  role==1?
  <>
  <Select props={props}/>
  </>:
  role==2?
  <>
  <Text>Admin</Text>
  </>
  :<></>
  }
      </>
  );
}
