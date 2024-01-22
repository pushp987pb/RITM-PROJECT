import React from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

 function ViewTemple(){
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
        <div className='container mt-5 d-flex flex-row flex-wrap gap-5 justify-content-center'> 
             
             {
                templeList.map(
                    (temple,index) => (
                    <div key={index} className='col-md-3 mb-4'>
                        <div className="card">
                        <img class="card-img-top"  src={ temple.image ? temple.image : "https://images.unsplash.com/photo-1524443169398-9aa1ceab67d5?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Card image cap"/>
                          <div className="card-body">
                            <div className="card-text-box">
                              <h5 className="card-title">{temple.name}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{temple.email}</h6>
                              <p className="card-text">State - {temple.state}</p>
                              <p className="card-text">District - {temple.district}</p>
                              <Link to={`/temple-details/${temple.id}`} className="btn btn-primary">
                                 Know More...
                               </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                   )
                )
            }
           
        </div>
    )
}

export default ViewTemple