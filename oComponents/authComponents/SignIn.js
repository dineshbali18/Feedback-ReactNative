import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button, AppRegistry, Alert,Image,Text,TouchableOpacity} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';
import Home from '../Home';
import { signin } from './helper/authCalls';
import tw from 'tailwind-react-native-classnames'


export default function SignIn(props) {
    // const [homepage,setHomePage]=useState(0);
    const [load,setLoad]=useState(0)
    const userId=useRef(0)
    const role=useRef(0)
    const section=useRef('')
    const nameOfUser=useRef('')
    // const [token,setToken]=useState('');
    const token = useRef('')
    const [user,setUser]=useState({
        email:"121810301018@gitam.in",
        password:"12345",
        error:"",
        success:false
    })

    const {email,password,error}=user;

    const handleChangeEmail=(text)=>{
        setUser({...user,email:text})
    }
    const handleChangePassword=(text)=>{
        setUser({...user,password:text})
    }

    // const signIN=()=>{
    //     signin({email,password}).then(data=>{
    //         // console.log("signin call");
    //         // console.log(data);
    //         if(data.error){
    //             setUser({...user,error:data.error})
    //         }
    //         else{
    //             // {console.log(data.user._id)}
    //             setToken(data.token);
    //             setUserId(data.user._id);
    //             setUser({...user,
    //             email:"",
    //             password:"",
    //             error:"",
    //             success:true})
    //             // setHomePage(1);
    //         }})
    // }
    
     const onSubmit = async()=>{
         setLoad(1);
        const data=await signin({email,password})
        if(data.error){
            setLoad(0);
            setUser({...user,error:data.error})
        }
        else{
            // setToken(data.token);
            console.log(data);
            nameOfUser.current=data.user.name
            userId.current=data.user._id;
            token.current=data.token;
            role.current=data.user.role;
            section.current=data.user.section

            // console.log("aaaaaaaa",token);
            // setUserId(data.user._id);
            setUser({...user,
            email:"",
            password:"",
            error:"",
            success:true})
            
            Actions.home({token,userId,role,nameOfUser,section});
            // setHomePage(1);
        }
    
    }

    return (
        <>
        {/* {homepage==1?<><Home/></>:
        <> */}
        {load==0?
        <View>
        <View >
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <ScrollView>
        <View style={{width:'100%'}}>
            <Image source={require('../../images/signup1.png')} style={tw`h-52 w-96 mt-1 mb-2`}/>
        </View>
        <View style={tw`ml-6 mr-4 mt-0`}>
            <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full`}>
        <Image source={require('../../images/at.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,width:'100%',borderColor:"orange",borderRadius:50,paddingLeft:10}}
        placeholder="Enter Email"
        onChangeText={email => handleChangeEmail(email)}
        defaultValue="text"
        value={email}
      />
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2 mb-4`}>
        <Image source={require('../../images/password.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
        <TextInput
        style={{height: 40,width:'100%',borderColor:"orange",borderRadius:50,paddingLeft:10}}
        placeholder="Enter Password"
        onChangeText={password => handleChangePassword(password)}
        defaultValue="text"
        value={password}
      />
      </View>
      {error?<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{error}  <Image source={require('../../images/cancel.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/></Text>
      </View>:<View style={tw`flex-row`}>
      </View>}
      <Text style={tw`text-indigo-600 font-bold ml-2`}>Forgot password ?</Text>
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{onSubmit()}} >
          <Text style={tw`text-white font-bold`}>  SignIn </Text>
          <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/>
          </TouchableOpacity>
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      </ScrollView>
      </View>
      :
      <>
      <View style={{backgroundColor:"snow",height:'100%' , width:'100%'}}>
      <Image source={require('../../images/Infinity.gif')} style={tw`h-12 w-12 mt-3 ml-40 mt-48 pl-1`}/>
      </View>
      </>
}
      {/* </> */}
        {/* } */}
        </>
    )
}



const styles=StyleSheet.create({
    container:{
        marginBottom:30,
    }
})

const votestyles = StyleSheet.create({
    container: {
        marginTop:20,
      padding: 20,
      flex: 1,
      backgroundColor: '#fff',
    },
    backbutton:{
        marginTop:20,
        width:100,
    }
  });