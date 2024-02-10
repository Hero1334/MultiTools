import {useState,useEffect } from 'react'
import {Pressable,ScrollView,View,StyleSheet,FlatList} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
export const BetterList = ({data,itemsPerPage,style,renderItem})=>{
  /*
  import { BetterList } from '.../BetterList'
  {...}
  <BetterList 
    data={['aaaa','bbbb','cccc','dddd']}
    itemsPerPage={2}
    style={...}
    renderItem={(item)=><Text>{item}</Text>}
  */
  const [betterPages,setBetterPages] = useState([])
  const [page,setPage] = useState(0)
  
  function pageChange(n){
    let pAfter = page+n
    if (pAfter>betterPages.length-1) {
      setPage(betterPages.length)
      return
    }
    else if (pAfter<0) {
      setPage(0)
      return
    }
    setPage(p=>p+n)
  }
  
  useEffect(()=>{
    let tmpData = data 
    if (tmpData.length<itemsPerPage) {
      console.error("itemsPerPage must be <= to data.length to load a page with all items || itemsPerPage: "+itemsPerPage+";\n data.length: "+data.length)
      itemsPerPage = data.length
      
    }
    tmpData.map((el,ind)=>el+"/\\f"+ind)
    let tmpBetterPage =[]
    const pages = Math.ceil(tmpData.length/itemsPerPage) //1
    for (let i = 0; i<pages;i++){
      tmpBetterPage.push(tmpData.splice(0,itemsPerPage))
    }
    setBetterPages(tmpBetterPage)
  },[])
  
  return (
    <ScrollView>
    <View style={style}>
      {
        betterPages[page].map((el,ind)=>{
          <View key={el.split("/\\f")[1]}>{renderItem(el.split("/\\f")[0])}</View>
        })
      }
    </View>
    <View>
      <Pressable style={[styles.arrowleft,styles.arrows]} onPress={()=>pageChange(-1)}>
        <AntDesign name="doubleleft" size={24} color="black" />
      </Pressable>
      <Text style={styles.text} >{page}</Text>
      <Pressable onPress={()=>pageChange(1)} style={[styles.arrowright,styles.arrows]}>
        <AntDesign name="doubleright" size={24} color="black" />
      </Pressable>
    </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
  arrows:{
    borderWidth:1,
    borderColor:"#fff",
    backgroundColor:"#333",
    width:'35%',
    height:'25%'
  },
  arrowleft:{
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5
  },
  arrowright:{
    borderTopRightRadius:5,
    borderBottomRightRadius:5
  },
  text:{
    fontFamily:'monospace',
    fontWeight:'bold',
    fontSize:16
  }
})