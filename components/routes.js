import { createDrawerNavigator } from '@react-navigation/drawer';
import { Main } from './pages/Todo/Main'
import { MainBinary } from './pages/binaryConverter/Main'
import { MainRandom} from './pages/random/Main'
import { MainSettings } from './pages/settings/Index'
import {useColorScheme} from 'react-native'
import { Entypo,Octicons,MaterialIcons } from '@expo/vector-icons'

const Tab = createDrawerNavigator();

export function Routes() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,
      tabBarStyle:{
        backgroundColor: useColorScheme()=='light'?'white':'#42445A',
        borderWidth:0
      }
    }}>
      <Tab.Screen name="Todo List" component={Main} options={{
        drawerIcon:({focused,size,color})=>(
          <Entypo name="list" size={size} color={color} />
        )}}/>
      <Tab.Screen name="Binary" component={MainBinary} options={{
      drawerIcon:({focused,size,color})=>(
        <Octicons name="file-binary" size={size} color={color} />)
      }}/>
      <Tab.Screen name="Random" component={MainRandom} options={{
        drawerIcon:({focused,size,color})=>(
        <MaterialIcons name="123" size={24} color="black" />
        )
      }}/>
      <Tab.Screen name="Settings" component={MainSettings} options={{
        /*drawerIcon:({focused,size,color})=>(
        <Ionicons name={focused?"settings":"settings-outline"} size={size} color={color} />
        )*/
      }}/>
    </Tab.Navigator>
  );
}
