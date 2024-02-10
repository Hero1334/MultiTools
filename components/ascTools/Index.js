import {TouchableOpacity,View,StyleSheet} from 'react-native'
import { Entypo,Ionicons} from '@expo/vector-icons'

 export function MultiUtiles ({data}){
  return(
    <View style ={{flexDirection:'row',gap:15}}>
    {data.onPressTras&&<TouchableOpacity ref={data?.trasRef} style={styles.tras} onPress={()=>data?.onPressTras()}><Ionicons style={{padding:3}} name="trash" size={14} color="black" /></TouchableOpacity>}
    {data.onPressReturn&&<TouchableOpacity ref={data?.returnRef} style={styles.tras} onPress={()=>data.onPressReturn()}><Entypo style={{padding:3}} name="back" size={14} color="black" /></TouchableOpacity>}
      </View>
    )
}
const styles = StyleSheet.create({
  tras:{
    left:10,
    top:2,
    backgroundColor:'#fff',
    borderRadius:8,
    width:20,
    height:20
  }
})