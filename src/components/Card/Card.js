import React from 'react';
import './Card.css';
const Card=(props)=>
{
        if(props.msgob.msg==="$$$")
        {
                return (
                        <div className="center pa2 all">
                                <div className="pill1">
                                  <p className="center"><b>{props.msgob.user}</b> joined.</p>
                                </div>
                        </div>);
        }
        else{

        if (props.cuser===props.msgob.user)
        {
                return (
                  <div className="pa2 all">
                    <p className="ts white fr">
                      {props.msgob.time}
                    </p>
                    <div className="pillr flex fr">
                      {props.msgob.msg}
                    </div>
                  </div>
                );
        }
        else
        {
                return (
                  <div className="pa2 all">
                    <p className="t white fl">
                      {props.msgob.time}
                    </p>
                    <div className="pills flex fl">
                      <b >{props.msgob.user}</b>
                      {" : "}
                      {props.msgob.msg}
                    </div>
                  </div>
                );
        }
}

}
export default Card;