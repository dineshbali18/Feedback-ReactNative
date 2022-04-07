import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity,FlatList, ViewPropTypes,TextInput} from 'react-native';
// import VoteTelugu from './VoteTelugu'
// import { getContestants1,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableHighlight} from 'react-native';
import tw from 'tailwind-rn'
import { getTeachers } from './helper/apiTeacherCalls';
import { SafeAreaView } from 'react-native-safe-area-context';
// import UselessTextInputMultiline from './UselessTextInputMultiline';
import { Submit_Feedback,Submit_Rating } from './helper/apiTeacherCalls';





export default function Feedback(teacher) {
    // console.log(teacher);
  const [value, onChangeText] = React.useState('Give Your Feedback Here...');
    const [submit,setSubmit]=useState(0)
    const [rat,setRat]=useState([0,0,0,0,0])
    const [msg,setMsg]=useState("")
    const rating=useRef(0);
    const [feedback1,setFeedback1]=useState("")

    const submitRating=()=>{
        var x=0;
        for(var i=0;i<rat.length;i++){
            x+=rat[i];
        }
        rating.current=x;
    }

    const submitFeedback=(id1)=>{
        Submit_Rating(rating.current,id1)
        Submit_Feedback(value,id1)
    }

    const removeSubjectFromUser=(subject)=>{

        /////////aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalllllllllllllllloooooooooooooottttttttttttttttt
        DelSubjectFromRemainArray(subject);
    }

    // useEffect(()=>{
    //     console.log("hi")
    // },rat)
    
    
    return (
        <>
        <SafeAreaView>
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
              {/* <TouchableOpacity onPress={()=>{Actions.feedback(teacher)}}><Text style={{fontWeight:'bold',backgroundColor:'indigo',color:'white',borderRadius:10,paddingLeft:20,marginLeft:50}}>Feedback</Text></TouchableOpacity> */}
              </View>
              </View>
            <View style={{margin:15}}>
            
            <Text style={{fontWeight:'bold'}}>Rating:</Text>
            <View style={tw("flex flex-row")}>
            <TouchableOpacity onPress={()=>{setRat([1,0,0,0,0])}}>
                {rat[0]==0?
            <Image source={require('../../images/star.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
                :
            <Image source={require('../../images/astar.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
        }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRat([1,1,0,0,0])}}>
                {rat[1]==0?
            <Image source={require('../../images/star.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
                :
            <Image source={require('../../images/astar.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
        }
            </TouchableOpacity><TouchableOpacity onPress={()=>{setRat([1,1,1,0,0])}}>
                {rat[2]==0?
            <Image source={require('../../images/star.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
                :
            <Image source={require('../../images/astar.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
        }
            </TouchableOpacity><TouchableOpacity onPress={()=>{setRat([1,1,1,1,0])}}>
                {rat[3]==0?
            <Image source={require('../../images/star.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
                :
            <Image source={require('../../images/astar.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
        }
            </TouchableOpacity><TouchableOpacity onPress={()=>{setRat([1,1,1,1,1])}}>
                {rat[4]==0?
            <Image source={require('../../images/star.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
                :
            <Image source={require('../../images/astar.png')} style={tw("h-14 w-14 mt-1 ml-1")}/>
        }
            </TouchableOpacity>
            </View>
            <Text style={{marginTop:25,fontWeight:"bold"}}>Any thing to Improve from the Teacher side:</Text>
      <View>
      {/* // */}
      <View
      style={{
        backgroundColor: value,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
    </View>
      {/* // */}
      </View>

      <TouchableOpacity style={tw("h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row mt-4 p-2")} onPress={()=>{submitRating(),submitFeedback(teacher._id),removeSubjectFromUser(teacher.subject)}}>
          <Text style={tw("text-white font-bold")}>Submit</Text>
      </TouchableOpacity>
      </View>
            
            </SafeAreaView>     
        </>
    )
}