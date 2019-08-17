import React from 'react';
import '../auth/auth.css';
const Login = ({passentry, userentry, entrydone,wrong }) => {
    return (
    
        <div className="tc pt7 ">
            <p className="red">{wrong}</p>
            <input className="pill" type="text" onChange={userentry} placeholder="Your Name" /><br></br>
            <input className="pill" type="password" onChange={passentry} placeholder="Your Code" /><br></br>
            <button className="pill" onClick={entrydone}>Go</button>
        </div>
        
        
    );
}

export default Login;