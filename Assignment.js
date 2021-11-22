import React, {useState} from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity, Pressable } from 'react-native';




export default function Assignment(props) {
    const [winVis, setWin] = useState(false);

    function getPr(pr){
        if (pr == 0){
            return ['limegreen', 'low'];
        } else if (pr == 1){
            return ['gold', 'medium'];
        } else {
            return ['red', 'Max'];
        }
    }
    return (

        <TouchableOpacity onPress={() => setWin(true)} style={[styles.container, {borderColor: props.color}]}>
            <Modal animationType="slide" transparent={true} visible={winVis} onRequestClose={() => {setWin(!winVis);}}> 

            <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontSize: 25}]}>{props.title}</Text>
            <Text style={[styles.modalText, {fontSize: 14, marginBottom: 10}]}>Points: {props.pts}</Text>
            <Text style={[styles.modalText, {fontSize: 14, marginBottom: 10, color: getPr(props.priority)[0]}]}>Priority: {getPr(props.priority)[1]}</Text>
            <Text style={[styles.modalText, {fontSize: 14, marginBottom: 10}]}>Due Date: {props.date}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose, {justifyContent: 'flex-end'}]}
              onPress={() => setWin(!winVis)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
            </Modal>
            <Text numberOfLines={1} style={{color: props.color}}>
            {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      width: 300,
      marginBottom: 5,
      height: 100,
      borderWidth: 2,
      borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        height: 400,
        width: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
  });