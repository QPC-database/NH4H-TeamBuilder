import React, { useState } from 'react';
import gitapi from '../apis/gitapi';
import { Button, Modal, Input, Dropdown, Menu, Label, Form, Divider } from 'semantic-ui-react';
import nh4h from '../apis/nh4h';

 
// function modalReducer (state, action) {
//   switch (action.type) {
//     case 'OPEN_MODAL':
//       return { open: true, dimmer: action.dimmer, size: action.size }
//     case 'CLOSE_MODAL':
//       return { open: false }
//     default:
//       throw new Error()
//   }
// }

const GitHubUserEntryHook = (props) => {
  const placeholdertxt = "Select your user id";
  const [ghuserlist, setUserList] = useState([]);
  const [isSaving, setSavingStatus] = useState(false);
  
  const modalReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer, size: action.size }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  };

  const [state, dispatch] = React.useReducer(modalReducer, 
    {
      open: true,
      dimmer: 'blurring',
      size: 'tiny',
      type:"OPEN_MODAL"
    }
  );
  const {dimmer, open, size} = state;

  const letsgo = () => {
    let user = document.getElementById("selected-user").querySelectorAll('[aria-atomic="true"]')[0].innerText;
  
    var letsgobutton = document.getElementById("letsgo");
    letsgobutton.className = "ui positive button active";
  };

  const getGitHubUser = () => {    
    let ghuser = document.getElementById("gituserid-input").value;
    var tempghuserlist = [];
    
    gitapi.get("/users?q=" + ghuser + "&per_page=100").then((resp) => {
      resp.data.items.map(i => {
        setUserList(tempghuserlist);
        tempghuserlist.push({ key: i.login , text: i.login , value: i.login, image: { avatar: true, src: i.avatar_url }});
        setUserList(tempghuserlist);
        document.getElementById("displayusers").style["display"] = "";
      })       
      
    }).catch (err => {
      console.log("err:", err);
    })
  }
  
  const saveGitUserId = () => {
    // Loading status
    setSavingStatus(true);
    
    let userid = document.getElementById("selected-user").querySelectorAll('[aria-atomic="true"]')[0].innerText;
    let body = {
      UserId: props.userid,
      GitHubId: userid 
    };

    nh4h.put("/users/github/" + props.userid, body ).then((resp) => {
      // Loading status
      setSavingStatus(false);
      // Close Dialog
      dispatch({ type: 'CLOSE_MODAL' })
    }).catch((err) => {
      // Empty the list
      setUserList([]);
      setUserList((state) => {
        document.getElementById("error").style["display"] = "";
        setSavingStatus(false);
        return state;
      });
      
    });
  };

  return (
    <div>
      <Modal
        dimmer={dimmer}
        open={open}
        size={size}
        // onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>Do you have a GitHub Account?</Modal.Header>
        <Modal.Content>
          <div className="ui ">
            <Form>
              <Form.Field>
                <Input id="gituserid-input" label='@' placeholder='Search username' action={{ onClick: () => getGitHubUser(), icon:"search" }} />
                <Label pointing>
                  Don't have one? It's easy! Here's <a href="https://github.com/join">how</a> :)
                </Label> <br /><br />
                
              </Form.Field>
              <Form.Field id="displayusers" style={{"display": "none"}}>
                <Divider />
                <Label color='teal' pointing="right">Select your username: </Label>
                <Menu compact>
                  <Dropdown id="selected-user" placeholder={placeholdertxt} onChange={letsgo} closeOnChange selection options={ghuserlist} item />
                </Menu>      
              </Form.Field>
            </Form>
          </div>   
          
        </Modal.Content>
        <Modal.Actions>
           <Label id="error" style={{"display": "none"}} prompt pointing="right">
              Uh oh. Reselect your id and please try again.
          </Label> 
          <Button id="letsgo" className="disabled inactive" positive onClick={() => { saveGitUserId(); }} loading={isSaving}>
            I'm ready!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
export default GitHubUserEntryHook