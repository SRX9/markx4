import React from 'react';
import axios from "axios";


//All Components
import Mainchat from "../../Mainchat";
import './Home.css';


class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            sid: '',
            streamopen: false
        }
    }
    

    setsid=(event)=>
    {
        var id=event.currentTarget.dataset.mode;
        /*axios({
          method: "post",
          url: "http://localhost:3000/createStream",
          data: {
            sid:id,
            sname:"election",
            admin:"aqua",
            ctime:String(new Date().getTime())
          }
        });*/
        this.setState({sid:id,streamopen:true});
    }

    backtoyou()
    {
        this.setState({streamopen:false});
    }
    render() {
        
        if(this.state.streamopen)
        {
            return(<div>
                <button onClick={this.backtoyou.bind(this)} >
                    Home
                </button>
                {console.log(this.state.sid)}
                <Mainchat sid={this.state.sid} user={this.props.user}/>
            </div>);
        }
        else
        {
            var l =['Raj','Tay','Selena','Shone'];
            return (
              <div className="pt2  br pr7">
                <div class="flex flex-column">
                  <div class="w-25 pa1    ">
                    {l.map(friends => (
                      <div
                        onClick={this.setsid.bind(this)}
                            className="pa2 pb2 pointer ca friend "
                            data-mode="s"
                      >
                        <div  className="pt1 pl1">
                          <img
                            className=" i pointer "
                            src="https://junkee.com/wp-content/uploads/2017/04/static1.squarespace.jpg"
                            alt="Avatar"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
            }
    }
}

export default Home;