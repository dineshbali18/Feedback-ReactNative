import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
import {Dimensions, Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity} from 'react-native';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
// const HorizontalBarGraph = React.lazy(() => import('@chartiful/react-native-horizontal-bar-graph'));
import tw from 'tailwind-rn'

// import VoteTelugu from './VoteTelugu'
import { getNamesWithPercentages} from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import VoteTelugu from './VoteTelugu';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get("window").width;

export default function CheckPercenta() {


    const [names,setNames]=useState([])
    const [percentages,setPercentages]=useState([])
    const [checkD,setCheckD]=useState(0)


    const loadAllProduct = async() => {
        await getNamesWithPercentages().then(data => {
          // console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            setNames(data.names)
            setPercentages(data.percentages)
            // console.log("hiih")
            setCheckD(1)
          }
        });
      };

        

    useEffect(()=>{
        loadAllProduct();
    },[]);


    return (
      <>
      <View >
        
        <Button  title="  go Back" onPress={()=>{Actions.pop()}}/>
        </View>
 <View> 
   {checkD==1?
   <SafeAreaView>
   <ScrollView>
    <HorizontalBarGraph
      data={percentages}
      labels={names}
      width={320}
      height={350}
      barRadius={15}
      barColor='#FF5C58'
      baseConfig={{
        hasYAxisBackgroundLines: false,
        xAxisLabelStyle: {
          rotation: 0,
          fontSize: 12,
          width: 50,
          yOffset: 4,
          xOffset: -15
        },
        yAxisLabelStyle: {
          rotation: 30,
          fontSize: 13,
          prefix: '(%)',
          position: 'bottom',
          xOffset: 5,
          decimals: 2,
          height: 100
        }
      }}
      style={styles.chart}
    />
    </ScrollView>
    </SafeAreaView>:<><View><Text style={{color:'green', height:'20%',fontWeight:'bold',marginLeft:'40%',marginTop:'50%'}} >Loading..........</Text>    
    </View></>}
  </View>
</>
  );
}


const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
    backgroundColor: '#B1E693'
  }
});

const votestyles = StyleSheet.create({
  container: {
      // marginTop:20,
    // padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  backbutton:{
      marginTop:1,
      width:100,
  }
});