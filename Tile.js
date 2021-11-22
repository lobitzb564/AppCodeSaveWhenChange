import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';


export default function Tile(props) {
    const [numpress, setPress] = useState(0);
    const [borderc, setBorderC] = useState('#8a8a8a');

    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    function setUpdate(i){
      if (i == 1){
        setBorderC('black');
      } else {
        setBorderC('#8a8a8a');
      }
    }

    React.useEffect(() =>{
      setUpdate(props.selected);
    }, [props.selected]);

    return (
            <Pressable style={[styles.button, {borderColor: borderc, height: props.height, width: props.width}]} onPressIn={() => {setPress(numpress+1); setBorderC('black');}} onPressOut={props.onpress}> 
                <Text style={{color: borderc}}> {props.num}</Text>
                <Text style = {{color: borderc}}>{days[props.dow]}</Text>
            </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderColor: '#787878',
      borderWidth: 1,
    },
    button: {
      backgroundColor: 'white',
      borderWidth: 1,
      alignItems: 'center',
    },
  });
  