import React from 'react';
import Card from '../Card/Card';
import './chat.css'
const Chatlog =(props)=>{
  return(    
          <div 
            className="  q  white  "
            
            >
            {props.msgarr.map((msgob,index) => (
              <Card  cuser={props.cuser} msgob={props.msgarr[props.msgarr.length-1-index]} key={msgob.msg}/>
            ))}
          </div>
        );
}

export default Chatlog;