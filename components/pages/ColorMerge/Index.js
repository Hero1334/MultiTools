import {useState} from 'react'
import {ScrollView,View,Text,TextInput,Pressable,Keyboard,StyleSheet,TouchableOpacity} from 'react-native'
import {MultiUtiles} from '../../ascTools/Index'
import { BetterList } from '../../ascTools/BetterList'
import {SafeAreaView} from 'react-native-safe-area-context'

function colorItem({color}) {
  
}

export function Color(){
  const [list,setList] = useState([])
  const [color1,setColor1] = useState('')
  const [color2,setColor2] = useState('')
  
  function addToList(item){
    setList(i=>[...i,item])
  }
  
  function merge(){
    let tmpMerged = ''
    const decColor1 = color1.length==7?parseInt(color1.split("#")[1],16):color1.length==4?parseInt(`${color1[1]}${color1[1]}${color1[2]}${color1[2]}${color1[3]}${color1[3]}`,16):16777215
    const decColor2 = color2.length==7?parseInt(color2.split("#")[1],16):color2.length==4?parseInt(`${color2[1]}${color2[1]}${color2[2]}${color2[2]}${color2[3]}${color2[3]}`,16):16777215
    if (decColor2 == 16777215 || decColor1  == 16777215 || decColor1+decColor2>= 16777215) {
      addToList("#ffffff")
      return;
    }
    addToList("#"+Number(decColor1+decColor2).toString(16))
  }
  
  return (
    <SafeAreaView>
      <Text style={styles.mainTitle}></Text>
      <View>
      <Text style={styles.hint}>Insert Value in hex Format </Text>
      <TextInput maxLength={7} style={styles.TextInput} value={color1} placeholder="#000000"/>
      <TextInput maxLength={7} style={styles.TextInput} value={color2} placeholder="#000000"/>
      <Pressable onPress={()=>merge()} />
      </View>
      <BetterList />
      
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  
})