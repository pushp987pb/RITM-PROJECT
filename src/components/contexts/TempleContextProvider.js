import {TempleContext} from './TempleContext'
import {useState} from "react"
import axios from 'axios';

function TempleContextProvider({children}){
  
  let [msg,setmsg]=useState('')
  let [isTemple, setIsTemple] = useState(true);

  async function onRoomsUpdate(roomsData) {
    try {
      const res = await axios.put(`http://localhost:4000/temples`, {roomsData});
       console.log(res.data)
      // Fetch updated data after submission
      // You can set it in the userLoginContext or update the local state as needed
      setmsg('Rooms updated successfully!');
    } catch (error) {
      console.error('Error updating rooms', error);
    }
  }

  return (
        <TempleContext.Provider
          value={[onRoomsUpdate, msg,setmsg]}
        >
            {children}
        </TempleContext.Provider>
      );
}

export default TempleContextProvider;