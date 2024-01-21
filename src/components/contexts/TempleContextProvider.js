import {TempleContext} from './TempleContext'
import {useState} from "react"


function TempleContextProvider({children}){
  
  let [error,setError]=useState('')
  let [isTemple, setIsTemple] = useState(true);

    return (
        <TempleContext.Provider
          value={[isTemple, setIsTemple,error,setError]}
        >
            {children}
        </TempleContext.Provider>
      );
}

export default TempleContextProvider;