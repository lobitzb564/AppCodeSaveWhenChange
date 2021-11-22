import { StatusBar } from 'expo-status-bar'; 
import React, {useState, useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, SafeAreaView, Dimensions, Button, TouchableOpacity} from 'react-native';
import Tile from './components/Tile';
import Assignment from './components/Assignment';



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const numColumns = 7;
const tilesize = screenWidth / numColumns;
const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 



const App = () => {
  const dayOffset = (1000*3600*24);
  const gentiles = () => {
    let tilelist = [];
    for (let i = -3; i <=3; i++){
      tilelist[i+3] = new Date(date.getTime() + (i * dayOffset));
    }
    return tilelist;
  }
  const [tiles, setTiles] = useState(gentiles);
  const [midday, setMid] = useState(date);
  const [currDay, setDay] = useState(date);
  const [a, seta] = useState([]); 

  const fetchData = async () => {
    const key = '3123~QeTuXEZ4SShoeG5IkQ40wy430enzvr9BjszA8KkST7OVHDWFrueF2kZnvO8902sv';
    try {
    const resp = await fetch("https://hcpss.instructure.com/api/v1/users/self/upcoming_events",
      {method :'GET', headers: {
        'Authorization' : `Bearer ${key}`,
      },})
      .then(response => {return response.json()})
      .then(data => {console.log("ran");return data});
      seta(resp)
    } catch(error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const L = () => {
    setDay(new Date(currDay.getTime() - dayOffset));
    if (currDay <= tiles[0]){
      newweek(currDay, -1);
    }
  }
  
  const R = () => {
    setDay(new Date(currDay.getTime() + dayOffset))
    if (currDay >= tiles[6]){
      newweek(currDay, 1);
    }
  }

  const newweek = (day, fob) => {
      let tilelist = [];
      for (let i = 0; i < 7; i++){
        if (fob == 1) {
        tilelist[i] = new Date(day.getTime() + (i * dayOffset));
        } else {
          tilelist[i] = new Date(day.getTime() - ((6-i) * dayOffset));
        }
        if (i == 3) {
          setMid(new Date(day.getTime() + (i * dayOffset * fob)));
        }
      }
      setTiles(tilelist);
  }
  // render day tiles
  const renderItem = ({item}) => {
    let s = 0;
    let sameday = (new Date(item).getFullYear() === currDay.getFullYear() &&
    new Date(item).getMonth() === currDay.getMonth() &&
    new Date(item).getDate() === currDay.getDate());
    if (sameday){
      s=1;
    }
    return (<Tile num={new Date(item).getDate()} dow={new Date(item).getDay()} width={tilesize} height={50} selected={s} onpress={()=>{setDay(item)}}/>);
  }

  // render assignments on list
  const renderA = ({item}) => {
    var as;
    var asdate;
    try {
      asdate = new Date(item.assignment.due_at)
      as = (<Assignment color={`#${parseInt(item.assignment.course_id/75).toString(16)}`} title={item.assignment.name} pts={item.assignment.points_possible} priority={item.assignment.points_possible > 39 ? 2 : item.assignment.points_possible > 19 ? 1 : 0} date={asdate.toLocaleString()}/>);
    } catch (error){

    }
    let sameday = false;
    try{
      sameday = (asdate.getFullYear() === currDay.getFullYear() &&
    asdate.getMonth() === currDay.getMonth() &&
    asdate.getDate() === currDay.getDate());
    } catch(error){

    }
    if (sameday) {
       return as;
    } else {
      return;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={{fontSize: 18, margin: 0, padding: 0}}>{months[currDay.getMonth()]}</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
      <Button title="<" onPress={L}/>
      <View style={{flex: 1}}/>
      <Button title=">" onPress={R}/>
      </View>
      <View style={{height: 100}}>
      <FlatList data={tiles} renderItem={renderItem} numColumns={7} key={7}/>
      </View>
      
      <View style={{height: 500}}>
      <FlatList data={a} renderItem={renderA} numColumns={1} key={1}/>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );

}
export default App;



const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  tbO: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: -440,
    backgroundColor: 'dodgerblue',

  },

  tbO2: {
    position: 'absolute',
    width: 60,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    bottom: -440,
    backgroundColor: 'limegreen',
  },

  tbO3: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 45,
    bottom: -440,
    backgroundColor: 'red',
  }
});
