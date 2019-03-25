import React from 'react';
import '../../App.css'
import menu from './menu.png';
import Modal from "react-modal";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./c.css";
import axios from "axios";
var _ = require("lodash"); 
var finalarr=[];
var tempu=[];
class Head extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      usarr:[],
      //Slide Panel States
      isPaneOpen: false,
      isPaneOpenLeft: false,
    } 
  }
  doSomethingBeforeUnload = () => {
    // Do something
    alert("Nice Talk!!!");
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return this.doSomethingBeforeUnload();
    });
  };

  componentWillMount() {
    axios
      .get("https://markserver2-1.herokuapp.com/iniusers", {})
      .then(res => {
        this.setState({ usarr: res.data });
        finalarr=this.state.usarr;
        console.log(finalarr);
      });
  }

  async componentDidMount() {
    this.setupBeforeUnloadListener();
    Modal.setAppElement(this.el);
    try {
      
      //Stream Open Per 2.2 Seconds
      setInterval(async () => {
        //For Newly Generated Users
        axios
          .get("https://markserver2-1.herokuapp.com/iniusers", {})
          .then(res => {
            this.setState({ usarr: res.data });
            finalarr = this.state.usarr;
            console.log(finalarr);
          });
        
      }, 1500);
    } catch (e) {
      //console.log(e+"Unexpected Error Vala Unexpected Error ");
    }

  }
  render()
  {
    return (
      <div ref={ref => (this.el = ref)}>
        <div style={{ marginTop: "1px" }}>
          <div>
            <div className=" bb white">
              <img
              alt="loading.."
                src={menu}
                className=" pointer dib pl4 tl white"
                onClick={() => this.setState({ isPaneOpenLeft: true })}
              />
              {/**
                <div className="dib  pt2 pr2 white aaa">
                <p className="pr3  dib">SignIn</p>
                <p className="pr2 dib">SignUp</p>
              </div>
              */}
            </div>
            {/** <p className="foot white tc bt pt3">Copyright@2019. All Rights Reserved By MARKx Inc.</p>*/}
          </div>
          <SlidingPane
            closeIcon={
              <div>
                <img src="" />
              </div>
            }
            isOpen={this.state.isPaneOpenLeft}
            title="MARK v2"
            from="right"
            width="250px"
            onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
          >
            <div className=" tc">
              <h1 className="bd ">Active</h1>
              {_.uniq(this.state.usarr).map(user => (
                <p className="f4 bd tc " key={user}>
                  {user}
                </p>
              ))}
            </div>
          </SlidingPane>
        </div>
      </div>
    );
  }
  
}

export default Head;