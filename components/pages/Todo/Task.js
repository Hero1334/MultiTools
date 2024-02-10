import {useState} from 'react';
import { View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function Task ({text}){
  const [marked,setMarked] = useState(false)
  return(
  <View style={[styles.main,!marked?{backgroundColor:"#fff"}:{backgroundColor:"#bbb"}]}>
    <View style={styles.itemLeft}>
    <TouchableOpacity style={[styles.mark, marked?styles.marked:styles.unmarked]} onPress={()=>setMarked(!marked)}>{
      (marked && <AntDesign name="check" size={24} color="black" />)
    }
    </TouchableOpacity>
    <Text style={[styles.text,marked?styles.textTransparent:{}]}>{text}</Text>
    <View style={styles.circle}></View>
    </View>
  </View>)
}
const styles = StyleSheet.create({
  main:{
    backgroundColor:"#efefef",
    marginBottom:15,
    padding:12,
    borderRadius:7,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  itemLeft:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
  },
  mark:{
    width:31,
    height:31,
    borderRadius:7,
    marginRight:20,
    justifyContent:'center',
    alignItems:'center'
  },
  unmarked:{
    backgroundColor:'#ffa0a0'
  },
  marked:{
    backgroundColor:'#0f0'
  },
  textTransparent:{
    color:'#555',
    width:'75%',
  },
  text:{
    color:'#000',
    width:'75%',
  },
  circle:{
    width:12,
    height:12,
    background:'none',
    borderWidth:2,
    borderColor:'#ff5500',
    borderRadius:5,
    float:"right",
  }
})