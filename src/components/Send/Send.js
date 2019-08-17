import React from 'react';
import './Send.css';
const Send =({oninputChange,onSubmit,val})=>
{
        return (
          <div className="bt white">
            <div className="footer tc pt3  ">
              <div className=" tc pa2  ">
                <form>
                  <input
                    className=" pill f4 pa2 w-40"
                    type="textarea"
                    onChange={oninputChange}
                  />
                  <input type="reset" className="pill f4 pa2   grow" onClick={onSubmit} value="Send" />
                </form>
              </div>
            </div>
          </div>
          
        );

}
export default Send;