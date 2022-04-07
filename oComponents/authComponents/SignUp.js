import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button,Text, AppRegistry, Alert,Image} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Actions } from 'react-native-router-flux';
import { getotp, sendotp, signup,verifyotp } from './helper/authCalls';
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import DropDownPicker from 'react-native-dropdown-picker';



export default function SignUp(props) {
    const [verify,setVerify]=useState('')
    const [verify1,setVerify1]=useState(0)
    // const [getotp1,setGetOtp]=useState(0);
    const [otp,setOtp]=useState("");
    const [correct,setCorrect]=useState(0)
    const [load,setLoad]=useState(0);
    const [otpClick,setotpClick]=useState(0);
    const [isSelected, setSelection] = useState(false);
    const [terms,setTerms]=useState(0)

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        phoneNum:"",
        section:"",
        error:"",
        success:false
    })

    const {name,email,password,phoneNum,error,section}=user;

    const handleChangeName=(text)=>{
        setUser({...user,name:text})
    }
    const handleChangeEmail=(text)=>{
        setUser({...user,email:text})
    }
    const handleChangePassword=(text)=>{
        setUser({...user,password:text})
    }
    const handleChangePhoneNum=(text)=>{
        setUser({...user,phoneNum:text})
    }
    const handleChangeSection=(text)=>{
        setUser({...user,section:text})
    }

    const goToTerms=()=>{
        setTerms(1);
    }

    const Submit=()=>{
        // console.log(user);
        setLoad(1);
        if(verify1==0){
        setLoad(0);
            setUser({...user,error:"otp verification failed"})
        }
        else{
        // setUser({...user,error:false})
        signup({name,email,password,phoneNum,section}).then(data=>{
            if(data.err){
        setLoad(0);
                setUser({...user,error:data.err})
            }
            else{
                setLoad(0);
                setUser({...user,
                name:"",
                email:"",
                password:"",
                phoneNum:"",
                error:"",
                success:true})
                setOtp("")
                setVerify(0)
                setCorrect(1)
            }
        })
    }
}

    const getOtp=()=>{
        console.log(email);
        getotp({email}).then(data=>{
            if(data.error){
                console.log(data.error);
            }});
    }

    const sendOtp=()=>{
        sendotp({email}).then(data=>{
            if(data.error){
                console.log(data.error);
            }});
    }
    
    const verifyOtp=()=>{
        // console.log("lllooolll")
        verifyotp({email,otp}).then(data=>{
            if(data.error){
                setVerify(data.error);
                setVerify1(0)
            }
            if(data.sucess){
                // console.log("----------------")
                setVerify(data.sucess);
                setVerify1(1)
            }
        });
    }
    const [myArray, setMyArray] = useState([]);
 const [open, setOpen] = useState(false);
 const [value, setValue] = useState(null);

  const [items,setItems]=useState([
    {label:'Teacher',value:'teacher'},
    {label: 'B1', value: 'b1'},
    {label: 'B2', value: 'b2'},
    {label: 'B3', value: 'b3'},
    {label: 'B4', value: 'b4'},
    {label: 'B5', value: 'b5'},
]);

    return (
        <>
        {load==0?
        <>
        {terms==0?
        <>
        <View >
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <ScrollView>
        <View style={{width:'100%'}} >
            <Image source={require('../../images/signup11.png')} style={tw`h-36 w-96 mt-1 mb-2`}/>
        </View>
<View style={tw`ml-6 mr-4 mt-0`}>
            <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full`}>
        <Image source={require('../../images/profile-user.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,width:'100%',borderColor:"orange",borderRadius:50,paddingLeft:10}}
        placeholder="Enter Your Name"
        onChangeText={text => handleChangeName(text)}
        defaultValue="text"
        value={name}
      />
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2`}>
        <Image source={require('../../images/at.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,width:'100%',borderColor:"orange",borderRadius:50,paddingLeft:10,flexShrink:1}}
        placeholder="Enter  Your  Email. . . . . . ....."
        onChangeText={email => handleChangeEmail(email)}
        defaultValue="text"
        value={email.toString()}
      />
      
      {otpClick==0?
      <TouchableOpacity style={tw`mx-2 my-1 flex-row`} onPress={()=>{getOtp(),setotpClick(1)}} >
      <View style={tw`bg-indigo-600 rounded-full mb-0.5 `}>
          <Text style={tw`text-white font-bold mt-1`}>  Generate Otp  </Text>
          </View>
          </TouchableOpacity>
          :
          <TouchableOpacity style={tw`mx-2 my-1 flex-row`} onPress={()=>{sendOtp()}} >
      <View style={tw`bg-indigo-600 rounded-full mb-0.5 `}>
          <Text style={tw`text-white font-bold mt-1`}>  Get Otp  </Text>
          </View>
          </TouchableOpacity>

        }
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2`}>
        <Image source={require('../../images/otp.png')}  style={tw`h-6 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,width:'55%',borderColor:"orange",borderRadius:50,paddingLeft:10}}
        placeholder="Enter Otp"
        onChangeText={otp =>setOtp(otp)}
        defaultValue="text"
        value={otp}
      />
      <TouchableOpacity style={tw`bg-indigo-600 rounded-full mt-1 mb-1`}  onPress={()=>{verifyOtp()}}>
          <Text style={tw`text-white font-bold mt-1`}>   Verify Otp  </Text>
          </TouchableOpacity>
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
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-0 mb-4`}>
        <Image source={require('../../images/telephone-call.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
        <TextInput
        style={{height: 40,width:'100%',borderColor:"orange",borderRadius:50,paddingLeft:10}}
        placeholder="Enter Phone Number"
        onChangeText={phoneNum => handleChangePhoneNum(phoneNum)}
        defaultValue="text"
        value={phoneNum}
      />
      </View>
      <>
      <View style={tw`flex-row`}>
      {/* <Text style={{fontWeight:'bold'}}>Section  </Text> */}
      <View>
      <DropDownPicker
          style={tw`border-2 border-indigo-600 rounded-full w-48`}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          modalProps={{width:'20%'}}
          scrollViewProps={true}
          modalContentContainerStyle={{width:'20%'}}
          autoScroll={true}
          onChangeValue={()=>{handleChangeSection(value)}}
        />
        </View>
<Text/>
<Text/>
</View>
      </>

      <View>
      {/* <BouncyCheckbox
  size={25}
  fillColor="red"
  unfillColor="#FFFFFF"
  iconStyle={{ borderColor: "purple" }}
  textStyle={{ fontFamily: "JosefinSans-Regular" }}
//   onPress={(isChecked: boolean) => {}}
/> */}
<Text>By clicking "Sign up" I agree that I have read and accepted the <Text style={{fontWeight:'bold',color:'blue',textDecorationLine:'underline'}} onPress={()=>{goToTerms()}}>"Terms of Use"</Text>.</Text> 

</View>

      <View>
          {verify1==0?<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{verify}</Text>
      {verify!=''?
      <Image source={require('../../images/cancel.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>:<></>
    }
      </View>:<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{verify}</Text>
      {verify!=''?
      <Image source={require('../../images/check-mark.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>:<></>
    }
      </View>}
      {/* /////// */}
      {error?<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{error}  <Image source={require('../../images/cancel.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/></Text>
      </View>:<View style={tw`flex-row`}>
      </View>}
      {correct==1?
          <View style={tw`flex-row`}>
          <Text style={tw`text-indigo-600 font-bold ml-2`}>Account Succesfully created</Text>
          <Image source={require('../../images/check-mark.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>
          </View>:
          <></>
      }

      {/* /////// */}
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{Submit()}} >
          <Text style={tw`text-white font-bold`}>  SignUp </Text>
          <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/>
          </TouchableOpacity>
      </View>
      </View>
        
      </ScrollView>
      </>:
      <>
      <View style={tw`m-6`}>
          <View style={tw`m-6`}>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont send unwanted commercial content or spam</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont send Pornography or sexually explicit material</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont send unwanted child abuse messages</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont send hate speech or graphic violence messages</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont Promote terrorism</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont Harassment or bullying messages</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>Dont send misinformation</Text>
       <Text style={{fontWeight:'bold',marginBottom:10}}>you can also report if you found any message which is not obeying the above rules you can report that message and we will have a look and if we found it is not obeying rules then we will remove those accounts.</Text>
       </View>
       <Button title="Accept" onPress={()=>{setTerms(0);}}/>
       </View>
      </>
}
      <Text></Text>
      </>:
      <>
      <View style={{backgroundColor:"snow",height:'100%' , width:'100%'}}>
      <Image source={require('../../images/Infinity.gif')} style={tw`h-12 w-12 mt-3 ml-40 mt-48 pl-1`}/>
      </View>
      </>
    }
    </>
    )
}
