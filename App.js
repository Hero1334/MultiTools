import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './components/routes'


export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}