import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput ,TouchableOpacity,Keyboard,Image,useColorScheme } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {Task} from './Task';

let theme;

export function Main (){
  // To do List
  const [task, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState('')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [id,setId] = useState(0);
  theme = useColorScheme();
  
  
  function handleAddTodos() {
    if (!task) return;
    Keyboard.dismiss()
    setTodos([...todos,task.split("/\\f")[0]+"/\\f"+id])
    setId(prev=>prev+1)
    setText('')
  }
  function removeTask(index) {
    let itemsCopy = [...todos]
    itemsCopy.splice(index,1)
    setTodos(itemsCopy)
  }
  
  useEffect(()=>{
    const filtered = todos.filter((text)=>{
      return text.toUpperCase().indexOf(search.toUpperCase()) >-1
    })
    setFilteredTodos(filtered)
  },[todos,search])
  return (
    <SafeAreaView style={[styles.main,{backgroundColor: theme=='light'?'#e0e0e0':'#101010'}]}>
      <View style={styles.tasks}> 
      <Text style={[styles.mainTitle,{backgroundColor:theme=='light'?'#e9e9e9':'#767676'}]}>To Do List</Text>
      <TextInput onChangeText={(a)=>setSearch(a)} value={search} placeholder='Filter' style={[styles.search,{borderColor:theme=='light'?"#000":'#fff',
    color:theme=='light'?'#000':"#fff",backgroundColor:theme=='light'?"#fff":"#000"}]}/>
      <View style={styles.tasksWrapper}>
        {
        
        (todos.length >0)? todos.map((tsk,index)=>{
          return (<TouchableOpacity key={index} onLongPress={()=>removeTask(index)} style={{display:filteredTodos.includes(tsk)?'flex':'none'}}>
            <Task  text={tsk.split("/\\f")[0]}/>
          </TouchableOpacity>)
        }): <Text style={styles.noTask}>Looks Like there is no Tasks Here...</Text>
        }
      </View>
      </View>
      <View style={styles.taskButtons}>
        <TextInput placeholder={'Insert Text Here'} value={task} onChangeText={(text)=>setText(text)} style={[styles.TextInput,{backgroundColor:theme=='light'?'#fff':"#000",borderColor:theme=='light'?'#000':"#fff"}]}/>
        <TouchableOpacity onPress={handleAddTodos} style={[styles.addTodo,{backgroundColor:theme=='light'?'#fff':"#000",borderColor:theme=='light'?'#000':'#fff'}]}><Text style={[styles.addTodoText,{color:theme=='light'?"#000":'#fff'}]}>+</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    //alignItems: 'center', //horizontal
    // justifyContent: 'center',//vertical
  },
  mainTitle:{
    fontSize:41,
    marginTop:65,
    borderRadius:12,
    width:320,
    paddingHorizontal:30,
    paddingVertical:5,
    fontFamily:'monospace',
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  taskButtons:{
    position:'absolute',
    width:'100%',
    flexDirection:'row',
    bottom:30,
    justifyContent:'space-evenly',
  },
  TextInput:{
    paddingHorizontal:25,
    paddingVertical:12,
    width:250,
    height:60,
    borderRadius:12,
    borderWidth:2,
    fontWeight:'bold',
    fontSize:20,
  },
  addTodo:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    
    borderRadius:28,
    borderWidth:2,
    
    color:theme=='light'?"#000":"#fefefe"
  },
  addTodoText:{
    fontSize:22,
    fontWeight:'bold',
    
  },
  search:{
    marginTop:25,
    borderWidth:1,
    paddingHorizontal:20,
    paddingVertical:6,
    borderRadius:15,
    width:160,
    fontSize:21,
    left:5,
  },
  noTask:{
    left:10,
    fontFamily:'monospace',
    fontSize:16,
  }
});