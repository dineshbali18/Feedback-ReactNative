import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
// const { performance } = require('perf_hooks');
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet,TextInput, Text,Image, View,ScrollView, Button, AppRegistry, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client'
import tw from 'tailwind-react-native-classnames'
const Connection_Port ='https://chatservicebigboss.herokuapp.com/';

let socket;

import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const {getNameById, sendReport}=require('./helper/chat')


export default function CommonChat(props) {
  // console.log(props.role)

const token=useRef(props.token);
  const [userId,setUserId]=useState(props.userId.current)
  const [role,setRole]=useState(props.role.current)
 const [name,setName]=useState('')
 const[msg,setMsg]=useState("");
 const  [msgList,setMsgList]=useState([]);
 const [load,setLoad]=useState(0);
 const [report,setReport]=useState(0);
 

  useEffect(() => {
   socket=io(Connection_Port,{transports: ['websocket', 'polling', 'flashsocket']})
  //  console.log(socket)
  },[])


  useEffect(()=>{

    socket.on('recieve-msg',(data)=>{
      // console.log(data);
      setMsgList([...msgList,data])
    })
  });

  const connectToRoom=()=>{
  socket.emit('join-room',props.r_name);
  socket.emit('get-datadb',props.r_name)
}


  useEffect(()=>{
    setLoad(1);
    connectToRoom();
    getNameById(userId)
      .then(data=>{
          // console.log(data)
          setName(data.name);
        }
      )
    socket.on('recieve-datadb',(data)=>{
      setLoad(0);
      setMsgList(data[0].msgs)
    })
  },[])
  

  
  const sendMessage=()=>{
    let messageContent={
      room:props.r_name,
      content:{
      author:name,
      message:msg,
      id:userId
      } 
    }
    socket.emit('send-message',messageContent);
    // setMsgList([...msgList,messageContent.content])
    setMsg("");
  }

  const goback=()=>{
      Actions.loadnames({token,userId,role})
  }
  const displayReportSend=()=>{
    setReport(1);
    setTimeout(()=>{
      setReport(0);
    },1200)
  }

  return (
      <>
      <SafeAreaView>
      <Button style={{zindex:'200'}} title="  go Back" onPress={()=>{goback()}}/>
      <Text style={tw`ml-10 font-bold text-2xl`}> {props.r_title}</Text>
      <View style={tw`m-4 h-5/6`}>
      {report==1?<Text style={{color:'red'}}>Report Sent !</Text>:<></>}
        <>
        {load==0?
      <ScrollView >
        <View>
      {/* {console.log(name)} */}
          {msgList.map((payload,index)=>{
            // console.log(payload)
            const {author,message}=payload;
              return(
                <View key={index} style={tw`border-black border-2 border-yellow-600 mt-4 h-8 mx-4  flex-row`,{maxWidth:'80%'}}>
                  <View style={tw`flex-row`}>
                  <Text  style={tw`text-base text-green-500 font-bold`}>{payload.author} </Text>
                  <Image  source={require('../../images/dots.png')} style={tw`h-5 w-5 mt-1.5 ml-1`}/>
                  <View >
                  <TouchableOpacity style={tw`h-6 w-16 rounded-full border-indigo-600 bg-indigo-600 flex-row justify-center mt-1.5`} onPress={()=>{displayReportSend(),sendReport({userId,author,message})}} >
          <Text style={tw`text-white font-bold`}>report</Text>
          </TouchableOpacity>
                  </View>
                  </View>
                  <View style={tw`flex-row`}>
                  <Text style={tw`text-base font-bold`}>  {payload.message}</Text>
                  {/* <Button title='report'></Button> */}
                <View/>
                </View>
                </View>
              )
          })}
          </View>
          </ScrollView>:
          <>
          <View style={{backgroundColor:"snow",height:'80%' , width:'100%'}}>
      <Image source={require('../../images/Infinity.gif')} style={tw`h-12 w-12 mt-3 ml-40 mt-48 pl-1`}/>
      </View>
          </>}
          </>
      <View style={tw`flex-row top-0 right-0 border-black flex-row border-2 border-indigo-600 mt-2 mb-4`}>
        <TextInput
        style={tw`flex-row top-0 right-0 border-black flex-row border-2 border-indigo-600 mt-2 mb-4`,{borderColor:"yellow",width:'85%',borderColor:"black",margin:10}}
        onChangeText={(msg) => setMsg(msg)}
        defaultValue="text"
        value={msg}
        multiline={true}
         placeholder='Enter message.......'/>
      <TouchableOpacity onPress={()=>{msg.length!=0&& sendMessage()}} >
          <Image source={require('../../images/send-message.png')} style={tw`h-6 w-6 mt-2 ml-0`}/>
          </TouchableOpacity>
      </View>
      </View>
      {/* <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{goback()}} > */}
          {/* <Text style={tw`text-white font-bold`}>  go back </Text> */}
          {/* <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/> */}
          {/* </TouchableOpacity> */}
      </SafeAreaView>
  
     </>
  );
}
