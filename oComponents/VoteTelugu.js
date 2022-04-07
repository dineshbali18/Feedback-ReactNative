import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity,FlatList} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { getContestants1,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableHighlight} from 'react-native';
import tw from 'tailwind-rn'





export default function VoteTelugu(props) {

  // console.log(props);

  const goToCheckPercenta = () => {
    Actions.checkpercenta()
 }

    const [votesleft,setVotesleft]=useState(0);
    const [BBMates,setBBMates]=useState([])




    const loadVotes=()=>{
      loadUserVotes(props.token,props.userId)
      .then(data=>{
        if (data.error) {
          console.log(data.error);
        } else {
          setVotesleft(data.remaining_votes);
        }
      })
    }
    

    const loadAllContestants = async() => {
        await getContestants1().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            // console.log(data.contestants1)
           setBBMates(data.contestants1);
          }
        });
      };
    
    const castVote=(id)=>{
      if(votesleft>0){
        increVote(props.userId,id,props.token);
      }
    }

    const decre=()=>{
      if(votesleft>0){
      decrement(props.token,props.userId);
      }
    }

    useEffect(()=>{
      const f1=async()=>{
        await loadAllContestants().then(loadVotes())
      }
      f1();
    },[]);


      const Voteleft=()=>{
        if(votesleft>0){
        setVotesleft(votesleft-1)
        }
      }

    return (
        <>
        <>
        <View >
        
        <Button  title="  go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <ScrollView>
            <View style={tw("flex flex-row")} >
            <View><Text>{votesleft>0?<View><Text style={{paddingLeft:(Dimensions.get('window').width/5-(30)),fontSize:(Dimensions.get('window').height/30),fontFamily: 'notoserif',alignContent:'center',fontWeight:'bold'}}>You have {votesleft} Left Today</Text>
            <Text style={{paddingLeft:(Dimensions.get('window').width/4)}}>Voting closes at Midnight</Text></View>:<Text>No Votes Left today</Text>}</Text></View>
            </View>
            <View style={tw("flex flex-row")}>
            
      <View>
      <View style={{marginTop:10,marginLeft:15,marginRight:15,marginBottom:10}}>
        <Button color="#ffa801" title="Check Percentages" onPress={()=>{votesleft==0 && goToCheckPercenta()}}></Button>
        <Text>Complete your votes to check Percentages</Text>
        </View>
        <View>
              <FlatList
  data={BBMates}
  numColumns={3}
  renderItem={({ item,index }) => {
    return (
      <TouchableHighlight
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.2,
                backgroundColor:'#f00',
                margin:20,
                border:'solid',
                marginLeft:25
              }}
              // underlayColor = '#ccc'
              onPress = { ({}) => {Voteleft(),decre(),castVote(item._id)} }
            >
              <>
              <Image source={{uri:item.image}} style={{ resizeMode: 'cover', width: '100%', height: '100%',borderRadius:50}}/>
              <Text style={{alignContent:'center',marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
              </>
            </TouchableHighlight>
    );
  }}
  keyExtractor={conte => conte._id}
/>
</View>
        </View>
        </View>
        </ScrollView>
        </>
        </>
    )
}
