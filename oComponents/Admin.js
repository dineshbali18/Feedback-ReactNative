import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
import {Dimensions, Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity} from 'react-native';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
// const HorizontalBarGraph = React.lazy(() => import('@chartiful/react-native-horizontal-bar-graph'));
import tw from 'tailwind-rn'

import { Actions } from 'react-native-router-flux';
import VoteTelugu from './VoteTelugu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { giveTenVotes } from './helper/admincalls';

const screenWidth = Dimensions.get("window").width;

export default function Admin(props) {
    const[token,setToken]=useState(props.token);
  const[userId,setUserId]=useState(props.userId)

  const updateVotes=()=>{
      giveTenVotes(userId,token);
  }
    return (
        <>
        <Text>Click the button to get the updated Votes</Text>
            <Button onPress={()=>{updateVotes()}} title='update Votes'></Button>
        </>
    )
}

