import React, { Component } from 'react';
import "tachyons";
import axios from "axios";
import './App.css';
import { Affix} from 'antd';
//Components
import Chatlog from './components/Chat/Chatlog';
import Send from './components/Send/Send';
var tempu = [];
//Class Mainchat 
class Mainchat extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            //for Message intake
            input: '',
            chan: false,
            val: '',

            //Final Message Conatiner
            msgarr: [],
            couser:[],

            //UserTracker
            user:'',
            cuser:''
        }
    }

    componentWillMount() 
    {
        axios
          .get("https://markserver2-1.herokuapp.com/iniusers", {})
          .then(res => {
            this.setState({ couser: res.data });
          });
        //Setting User Name To Its state
        this.setState({ cuser: this.props.user });
        //console.log(this.state.cuser+" inside Mainchat.js")
    }
    
    async componentDidMount() 
    {
        try {

            //Stream Open Per 2.2 Seconds
            setInterval(async () => {

                //For Newly Generated Messages
                    axios
                        .get("https://markserver2-1.herokuapp.com/getmsg", {
                        params: {
                          user: this.state.cuser
                        }
                      })
                      .then(res => {
                          //Checking For Whether Anything Came or not
                        if (res.data.length !== 0) {
                          
                          //Making New Replica for Responded Data
                          for(var i=0;i<res.data.length;i++)
                          {
                                if(res.data[i].msg==="$$$")
                                {
                                    /*console.log(
                                      res
                                        .data[
                                        i
                                      ].user
                                    );*/
                                    tempu.push(res.data[i].user);
                                }
                          }
                          var f=this.state.couser.concat(tempu);
                          this.setState({couser:f});
                          //Appending Responded Data to Temporary Array Called resdata
                          var final = this.state.msgarr.concat(
                              [...res.data]
                          );

                          //Updating Final Message Conatainer
                          this.setState({ msgarr: final });

                        } else {
                          //console.log("nothing got");
                        }
                      });
            }, 2200);
        } catch (e) {
            //console.log(e+"Unexpected Error Vala Unexpected Error ");
        }

    }

    //Send Component Helper Methods
    oninputChange = (event) => {
        if (event.target.value === "") 
        {
            return
        }
        this.setState({ input: event.target.value, val: event.target.value, chan: true });
    }

    //On Sending Message Handler
    onSubmit = () => {

        //Gerating HH:MM AM/PM Formatted Time For Message
        var time = new Date();
        var msgtime=time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        });
        //console.log(msgtime);
        
        if (this.state.input === "") {
            return
        }

        //Sending Data Pack To Server To Get echoed To All Connected Users
        axios({
          method: "post",
          url: "https://markserver2-1.herokuapp.com/sendmsg",
          data: {
            msg: this.state.input,
            user: this.state.cuser,
            time: msgtime
          }
        });

        //For Dispalying Currently Message To Client on Screen
        var ias = [...this.state.msgarr];
        ias.push({ msg: this.state.input, user: this.state.cuser,time:msgtime });
        if (this.state.chan) {
            this.setState({ msgarr: ias, chan: false, val: '' });
            console.log(this.state.msgarr);
        }
        else {
            return
        }
    }

    render() {
        return (
            
            <div className="">
              <Chatlog className="med " cuser={this.state.cuser} msgarr={this.state.msgarr} />
              <Affix offsetTop={10}>
                <Send className="center" val={this.state.val} oninputChange={this.oninputChange} onSubmit={this.onSubmit} />
              </Affix>
            </div>
        );
    }
}

export default Mainchat;
