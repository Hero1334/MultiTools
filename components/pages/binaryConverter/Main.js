import {useState} from 'react'
import {ScrollView,View,Text,TextInput,Pressable,Keyboard,StyleSheet,TouchableOpacity} from 'react-native'
import {MultiUtiles} from '../../ascTools/Index'
import {SafeAreaView} from 'react-native-safe-area-context'
import {BinaryShow} from './BinaryList'
import {Picker} from '@react-native-picker/picker';
import { BetterList } from '../../ascTools/BetterList'

const stringToBinary = (str) => {
  let binary = '';
  for (let i = 0; i < str.length; i++) {
    const charBinary = str[i].charCodeAt().toString(2);
    binary += charBinary.padStart(8, '0');
  }
  return binary;
};
function binaryAgent(str) {
  str = str.replace(/\s+/g, '');
  str = str.match(/.{1,8}/g).join(" ");
  let binString = '';
  str.split(' ').map(function(bin) {
      binString += String.fromCharCode(parseInt(bin, 2));
  });

  return binString;
}

export function MainBinary(){
  const [list,setList] = useState([])
  const [beforeConvert,setBeforeConvert] = useState([])
  const [convertText,setConvertText] = useState('')
  let [convertTo,setConvertTo] = useState('bin') //bin||txt
  
  function handleConvert(){
    let final = 0
    if (convertTo == 'bin') {
      final = stringToBinary(convertText.toLowerCase())
    }
    else{
      let cT = convertText
      final = binaryAgent(cT)
    }
    setList(prev=>[...prev,final+"/\\f"+convertText])
    setConvertText('')
  }
  function removeBinary(index) {
    let itemsCopy = [...list]
    itemsCopy.splice(index,1)
    setList(itemsCopy)
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Binary Converter</Text>
      <View style={{width:'100%',flexDirection:'row'}}>
      <Text style={styles.convertToWhat}>convert to</Text>
      <Picker style={[styles.convertToWhat,{width:'35%',bottom:'5%',right:'50%'}]} selectedValue={convertTo} onValueChange={(itemValue)=>setConvertTo(itemValue)}>
      <Picker.Item label="Binary" value='bin'/>
      <Picker.Item label="Text" value='txt'/>
      </Picker>
      </View>
      <View style={styles.converter}>
      <TextInput onChangeText={(a)=>setConvertText(a)} style={styles.converterText} value={convertText} placeholder='Convert Binary/Text'></TextInput>
      <Pressable style={styles.generate} onPress={()=>handleConvert()}><Text style={styles.generateText}>Generate</Text></Pressable>
      </View>
      <MultiUtiles data={{
        onPressTras:()=>setList([])
      }} />
      <ScrollView style={styles.convertedItems}>
      {
        (list.length>0)?list.map((el,ind)=>{
          return (
          <TouchableOpacity key={ind} onLongPress={()=>removeBinary(ind)}>
          <BinaryShow text={el} key={ind}/>
          </TouchableOpacity>)
        }):<Text style={{textAlign:'center',alignSelf:'center',width:'90%',fontFamily:'monospace',marginTop:30}}>No Binaries Found, try creating one</Text>
      }
      </ScrollView>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#d0d0d0"
  },
  title:{
    alignItems:'center',
    fontWeight:'bold',
    fontSize:22,
    fontFamily:'monospace',
    marginTop:20,
    marginBottom:20,
    left:15,
    borderBottomWidth:1,
  },
  convertToWhat:{
    fontWeight:'bold',
    fontSize:12,
    fontFamily:'monospace',
    marginLeft:20,
  },
  converter:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    marginLeft:12,
  },
  converterText:{
    paddingLeft:12,
    borderRadius:15,
    borderTopRightRadius:7,
    borderBottomRightRadius:7,
    paddingRight:2,
    borderWidth:1,
    backgroundColor:'#fefefe',
    justifyContent:'center',
    alignItems:"center",
    height:50,
    width:'80%',
  },
  generate:{
    backgroundColor:"#fefefe",
    justifyContent:'center',
    alignItems:"center",
    borderRadius:7,
    width:70,
    height:50,
    borderWidth:1,
  },
  convertedItems:{
    height:'56%',
    marginTop:15,
    marginLeft:7,
    gap:8
  }
})