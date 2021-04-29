import React from 'react';
import nh4h from '../apis/nh4h';
import { Card, Button, Icon } from 'semantic-ui-react'
//links to general of prod channel
const DEF_TEAMSLINK='https://teams.microsoft.com/l/channel/19%3a6c83ba5af8664dc3b1a0d8a8a0774094%40thread.tacv2/General?groupId=abc0763c-f446-424c-ba5f-e374147c11a0&tenantId=e773e193-89d3-44d9-ae4e-17766699f674';
class TeamListItem extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      members:1
    }
  }

  componentDidMount(){
    nh4h.get('/solutions/hackers/'+this.props.id)
    .then((response)=>{
      
      this.setState({members: response.data.userID.length});
    })
  }
  getTeamsLink=()=>{
    return this.props.teamslink?this.props.teamslink:DEF_TEAMSLINK;
  }


  render() {
    let islead=this.props.islead?this.props.islead===1:false;
    return(
      
        
          <Card fluid color='teal'>
            <Card.Content>
              <Card.Header>
                {!this.props.isTeamMember? (this.props.name): (this.props.name)}                      
              </Card.Header>              
              <Card.Description>
                {this.props.description}
                <br/>
                <strong>We are looking for people with the following skills: {this.props.skills}</strong>
                <br/>
              </Card.Description>              
         
            </Card.Content>
            <Card.Content extra textAlign={'right'}>
              {!this.props.isTeamMember? 
                (!this.props.hasTeam? <Button basic color="green" onClick={()=>{this.props.Callback(true,this.props.id)}}>Join</Button>: '' )            
              :              
                <div >
                  {islead?
                  <Button color="red" onClick={()=>{this.props.Callback(true,this.props.id,0)}} icon>
                  <Icon name='heart' />
                  Don't Lead
                </Button>
                  :
                  <Button color="green" onClick={()=>{this.props.Callback(true,this.props.id,1)}} icon>
                    <Icon name='heart' />
                    Lead
                  </Button>
                  }
                  <Button basic color='blue' onClick={()=>{this.props.edit()}}>Edit</Button>
                  <Button basic color='red' onClick={()=>{this.props.Callback(false,this.props.id)}}>Leave</Button>                               
                </div>                
              }
            </Card.Content>
          </Card>

       
      
    )
  }
}

export default TeamListItem;