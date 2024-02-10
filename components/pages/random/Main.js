import { useState } from 'react';
import { StyleSheet, Text,ScrollView, View, TextInput ,TouchableOpacity,Image,Pressable,ToastAndroid } from 'react-native';
import {MultiUtiles} from '../../ascTools/Index'
import * as Clipboard from 'expo-clipboard'
import { Entypo, Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context'

const Element = ({text,between, color})=>{
  function copy(){
    Clipboard.setStringAsync(text)
    ToastAndroid.show("Text Coppied to Clipboard", ToastAndroid.SHORT)
  }
  
  return(
    <View style={[elementStyles.main,{backgroundColor:color}]}>
      <TouchableOpacity style={[elementStyles.eye,{borderColor:"#000",justifyContent:'center'}]} onPress={()=>copy()}>
        <Entypo name="copy" size={19} color="black" />
      </TouchableOpacity>
      <Text style={elementStyles.mainText}>{text}</Text>
      <Text style={elementStyles.between}>{between}</Text>
    </View>
    )
}

export function MainRandom(){
  const [pastList,setPastList] = useState([])
  const [list,setList] = useState([])
  const [min,setMin] = useState(0)
  const [max,setMax] = useState(5)
  
  function handleAddList(){
    let color = "#fff"
    if (Number(min)>Number(max)) {
      alert("Minimum Value is greather than Maximum, please reconsiderate")
      color = "#ff6060"
    }
    setPastList(list)
    setList([...list,{random:Math.floor(Math.random()* (Math.floor(Number(max))-Math.ceil(Number(min))+1)+Number(min)),between:`(${min}/${max})`,color:color}])
  }
  function removeItem(index) {
    let itemsCopy = [...list]
    itemsCopy.splice(index,1)
    setPastList(list)
    setList(itemsCopy)
  }
  
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.mainTitle}>Random Numbers Generator</Text>
      <View style={styles.inputs}>
        <TextInput style={styles.minmax} inputMode='numeric' placeholder='Minimum' onChangeText={(a)=>setMin(a)} value={min}/>
        <TextInput style={styles.minmax} inputMode='numeric' placeholder='Maximum' onChangeText={(a)=>setMax(a)} value={max}/>
        <Pressable onPress={()=>handleAddList()} style={styles.generate}><Text style={styles.generateText}>Generate</Text></Pressable>
      </View>
      <MultiUtiles data={{
        onPressTras:()=>setList([]),
        onPressReturn:()=>setList(pastList)
      }} />
      <ScrollView style={styles.items}>
        {
          (list?.length!=0)?list?.map((el,ind)=>{
            return (
              <TouchableOpacity key={ind} onLongPress={()=>removeItem(ind)}>
                <Element text={el.random} between={el.between} color={el.color}/>
              </TouchableOpacity>
            )
          }):<Text style={styles.noList}>Looks like there is no random generates Numbers</Text>
        }
      </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"#d0d0d0"
  },
  mainTitle:{
    alignItems:'center',
    fontWeight:'bold',
    fontSize:22,
    fontFamily:'monospace',
    marginTop:20,
    marginBottom:20,
    left:15,
    borderBottomWidth:1
  },
  inputs:{
    justifyContent:'space-evenly',
    flexDirection:'row',
    gap:5
  },
  minmax:{
    paddingHorizontal:9,
    borderRadius:6,
    borderWidth:1,
    backgroundColor:'#fefefe',
    justifyContent:'center',
    alignItems:"center",
    height:40,
    width:'35%',
  },
  generate:{
    backgroundColor:"#fefefe",
    justifyContent:'center',
    alignItems:"center",
    borderRadius:7,
    width:70,
    height:40,
    borderWidth:1,
  },
  tras:{
    left:10,
    top:2,
    backgroundColor:'#fff',
    borderRadius:8,
    width:20,
    height:20
  },
  items:{
    height:'56%',
    marginTop:15,
    marginLeft:7,
    gap:12
  },
  noList:{
    textAlign:'center',
    alignSelf:'center',
    width:'90%',
    fontFamily:'monospace',
    marginTop:30
  }
})
const elementStyles = StyleSheet.create({
  main:{
    backgroundColor:"#fff",
    borderWidth:2,
    borderColor:"#000",
    borderRadius:7,
    width:'95%',
    height:30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  eye:{
    background:'none',
    width:26,
    height:26,
    borderRadius:5,
    borderWidth:1,
  },
  mainText:{
    flex:1,
    color:"#000",
    fontFamily:'monospace',
    fontSize:22,
    width:'100%',
    bottom:'1%'
  },
  between:{
    right:0,
    fontFamily:'monospace'
  }
})