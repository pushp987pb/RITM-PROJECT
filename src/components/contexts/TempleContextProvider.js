import { useState } from "react";
import axios from 'axios';
import {compareSync} from 'bcryptjs'
import {TempleContext} from './TempleContext'

function TempleContextProvider({ children }) {

  
  let [isTemple, setIsTemple] = useState(true);
  let [currentTemple, setCurrentTemple] = useState({});
  let [templeLoginStatus, setTempleLoginStatus] = useState(false);

  let [error, setError] = useState('');

  

  async function onTempleLogin(userCredObj) {
    //make api call to verify credentials
    let res = await axios.get(`http://localhost:4000/temples?email=${userCredObj.email}`);
    let usersList = res.data;
    //if user not existed
    if (usersList.length === 0) {
      setError("Invalid Username");
    }
    //if username is matched, then compare passwords
    else {
      let result = compareSync(userCredObj.password, usersList[0].password);
      //if passwords are not matcted
      if (result === false) {
        setError("Invalid password");
      }
      //if passwords are matched, navigate to user profile
      else {
        setCurrentTemple(usersList[0]);
        setTempleLoginStatus(true);
      }
    }
  }

  return (
    <TempleContext.Provider
    value={[isTemple,setIsTemple,currentTemple,setCurrentTemple,
             templeLoginStatus,setTempleLoginStatus,onTempleLogin,error, setError]}>

      {children}
    </TempleContext.Provider>
  );
}

export default TempleContextProvider;
