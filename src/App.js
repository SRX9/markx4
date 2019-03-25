import React from 'react';
import './App.css';
import 'tachyons';
import axios from "axios";
//All Components
import Head from './components/Head/Head';
import Auth from './components/auth/auth';
import Mainchat from "./Mainchat";
var user1;
class App extends React.Component
{
  state={
    user:'',
    userfound:true
  }

  //Auth Component Handler 
  userentry=(event)=>{
    user1=event.target.value
    //console.log(user1);
  }

  userentrydone=()=>
  {
    //Time Generation For User That Joined
    var time = new Date();
    var userentrytime = time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    //Seding User Info To Server To Echo To other Curretnly Connected Users
    axios({
      method: "post",
      url: "https://markserver2-1.herokuapp.com/setUser",
      data: {
        user: user1,
        time: userentrytime
      }
    });
    //Setting That User Data For Local Use
    this.setState({user:user1,userfound:false});
  }
  render()
  {
    return (
      <div className="pa2">
        <Head className="" />

        {/* Checking If User Entered*/}
        {this.state.userfound ? (
          <div>
            <Auth
              className="a"
              userentry={this.userentry}
              userentrydone={this.userentrydone}
            />
          </div>
        ) : (
          <div>
            <Mainchat user={this.state.user} currentUser={this.currentUser}/>
          </div>
        )}
      </div>
    );
}
}

export default App;