import React from "react"
import axios from "axios";
import { useState,useEffect } from "react";

 function FindTemple(){
    let [templeList , setTempleList]  = useState([]);

    useEffect(()=>{
        let data = async ()=> {
        try{
            let res = await axios.get(`http://localhost:4000/temples`);
            setTempleList(res.data)

        }catch(error){
            console.error("Error in fetching data",error);
        }
    };
        data();
    },[]); // empty array ensures effect to run onces component is loaded
    return(
        <> 
             
             {
                templeList.map(
                    (temple,index) => (
                        <div key={index} class="card">
                               <div class="card-body">
                                {/*                                 
                                <img  class="card-img-top" alt="..." src='https://ckgroup.co.uk/wp-content/uploads/2020/05/Job-hunting-graphic-Crush-940.png'></img> 
                                <div className='img-cirle'>
                                <img  className="img-circle" alt="..." src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU'></img> 
                                </div> */}
                                <div className="card-text-box">
                                <h5 class="card-title">{temple.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{temple.technology}</h6>
                                <p class="card-text">{temple.description}</p>
                                <button className="btn btn-primary">Click herer more details....</button>
                                </div>
                            </div>
                        </div>
                   )
                )
            }
           
        </>
    )
}

export default FindTemple