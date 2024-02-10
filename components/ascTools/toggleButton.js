import { useState } from 'react'
import { Pressable } from 'react-native'

export function ToggleButton({style,value, onValueChange,children}){
  
  const [val,setVal] = useState(false)
  
  useEffect(()=>{
    if (typeof val != 'boolean') {
      console.error('INCORRECT DATATYPE: typeof value must be an \'boolean\'')
      return;
    };
    setVal(value)
  },[])
  function changeVal(){
    setVal(v=>!v)
    onValueChange(val)
  }
  
  return (
    <Pressable style={style} onPress={()=>changeVal()}>
      {children}
    </Pressable>
    );
}

/*
import { ToggleButton } from '.../toggleButton'

{...}
<ToggleButton 
  style={...} 
  value={valueState: boolean}
  onValueChange={(val)=>doSomethingWithVal(val)} /> || >
  
    <ChildrenNode />
    <ChildrenNode />
    <ChildrenNode />
    
  </ToggleButton>
*/
