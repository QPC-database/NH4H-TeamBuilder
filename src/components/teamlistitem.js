import React from 'react';
import { Card, Button, Icon, Label } from 'semantic-ui-react'
//links to general of prod channel
const DEF_TEAMSLINK='https://teams.microsoft.com/l/channel/19%3a6c83ba5af8664dc3b1a0d8a8a0774094%40thread.tacv2/General?groupId=abc0763c-f446-424c-ba5f-e374147c11a0&tenantId=e773e193-89d3-44d9-ae4e-17766699f674';
class TeamListItem extends React.Component {
  
  
  getTeamsLink=()=>{
    return this.props.teamslink?this.props.teamslink:DEF_TEAMSLINK;
  }

  render() {
    const hackers = [];
    if(this.props.team) {
      for (let user of this.props.team.Users.hackers) {
        if(user.islead == 1) {
          hackers.push(<Label color='green' key={user.name}>{user.name}<Label.Detail>Lead</Label.Detail></Label>);
        } else {
          hackers.push(<Label color='blue' key={user.name}>{user.name}<Label.Detail>Member</Label.Detail></Label>);
        }
      }
    }
    let islead=this.props.islead?this.props.islead===1:false;
    if(!this.props.team){return "";}
    return(      
          <Card fluid color='teal'>
            <Card.Content>
            {!this.props.isTeamMember? 
                (!this.props.hasTeam? <Button floated='right' basic color="green" onClick={()=>{this.props.Callback(true,this.props.team.id, this.props.team.teamName)}}>Join</Button>: '' )            
              :              
                <div >                  
                  <Button floated='right' basic color='red' onClick={()=>{this.props.Callback(false, this.props.team.id, this.props.team.teamName)}}>Leave</Button>   
                  <Button floated='right' basic color='blue' onClick={()=>{this.props.edit()}}>Edit</Button>
                  {islead?
                  <Button floated='right' color="red" onClick={()=>{this.props.Callback(true, this.props.team.id, this.props.team.teamName, 0, 0)}} icon>
                  <Icon name='heart' />
                  Don't Lead
                </Button>
                  :
                  <Button floated='right' color="green" onClick={()=>{this.props.Callback(true, this.props.team.id, this.props.team.teamName, 0, 1)}} icon>
                    <Icon name='heart' />
                    Lead
                  </Button>
                  }
                </div>                
              }             
              <Card.Header>
              {this.props.team.msTeamsChannel} : {this.props.team.teamName}                                    
              </Card.Header>
              <br /><br />   
              <Card.Description>
                {this.props.team.teamDescription}
                <br /><br />
                {this.props.team.Users.hackers.length} members: <br /><br />
                <div>{hackers}</div>
                
                <br /><br />

                We are looking for people with the following skills: {this.props.team.skills}
                <br/>
              </Card.Description>    
            </Card.Content>            
          </Card>

       
      
    )
  }
}

export default TeamListItem;