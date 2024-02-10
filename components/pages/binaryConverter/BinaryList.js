import { useState,useEffect } from 'react'
import {View,Text,Pressable,StyleSheet,FlatList,ToastAndroid } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'


export function BinaryShow ({text}){
  const [indem,setIndem] = useState(0)
  function showOtherText(){
    setIndem(indem==0?1:0)
  }
  function copy(){
    Clipboard.setStringAsync(text.split("/\\f")[indem])
    ToastAndroid.show("Text Coppied to Clipboard", ToastAndroid.SHORT)
  }
  return(
    
    <View style={{backgroundColor:indem==0?"#000":"#fff",borderWidth:2,borderColor:indem==0?"#fff":"#000",borderRadius:7,width:'95%',height:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <Pressable onPress={()=>showOtherText()} style={[styles.eye,{borderColor:indem==0?"#000":"#fff"}]}>{
      indem==0?<AntDesign name="eyeo" size={25} color="white" />:<AntDesign name="eye" size={24} color="black" />
    }</Pressable>
    <Pressable style={[styles.eye,{borderColor:indem==0?"#000":"#fff",justifyContent:'center'}]} onPress={()=>copy()}>{
    indem==0?<Entypo name="copy" size={19} color="white" />:<Entypo name="copy" size={18} color="black" />
    }
    </Pressable>
    <Text numberOfLines={1} style={{flex:1,color:indem==0?"#fff":"#000",fontFamily:'monospace',fontSize:22,left:0,width:'100%',bottom:'1%'}}>{text.split("/\\f")[indem]}
    </Text>
    </View>
    )
}
 

const styles = StyleSheet.create({
  eye:{
    background:'none',
    width:26,
    height:26,
    borderRadius:5,
    borderWidth:1,
  }
})