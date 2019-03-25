import React from 'react';
import './auth.css';
const auth=({userentry,userentrydone})=>{
    return(
        <div className="tc pt7">
            <input className="pill" type="text" onChange={userentry} placeholder="Enter Name"/><br></br>
            <button className="pill" onClick={userentrydone}>Proceed To Chat Room</button>
            
        </div>
    );
}

export default auth;