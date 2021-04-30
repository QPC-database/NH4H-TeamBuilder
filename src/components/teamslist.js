import React from 'react';
import { Accordion, Icon, Card } from 'semantic-ui-react'
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: [],
      challenges:[],
      activeIndex: -1
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.teams !== this.props.teams){
      if(this.props.teams){
        let newt=this.groupBy(this.props.teams,'challengeName');
        let newc= Object.getOwnPropertyNames(newt);
        this.setState({
          teams:newt,
          challenges:newc
        });
    }
  }
  }

  joinOrLeaveTeam=(type,id)=>{
    this.props.Callback(type,id);
  }

  editTeam=(e)=>{
   this.props.edit();
  }
  groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}
  // {this.getTeamListItems(this.state.teams[c])}
  getChallengesList=()=>{
    return this.state.challenges.map((c, index)=>(
      <div key={index} >
      <Accordion.Title        
        active={this.state.activeIndex === index}        
        index={index}
        onClick={this.handleClick}
        >
        <h3><Icon name='dropdown' />{c}</h3>
      </Accordion.Title>
      <Accordion.Content         
        active={this.state.activeIndex === index}
      >          
         <Card.Group>
          {this.getTeamListItems(this.state.teams[c])}
        </Card.Group>   
      </Accordion.Content>
      </div>
    ));
  }
  getTeamListItems=(teamlist)=>{
  return teamlist.map( ({teamId, teamName, teamDescription,skillsWanted,tblTeamHackers,challengeName,msTeamsChannel}) => ( 
    <TeamListItem 
      Callback={this.joinOrLeaveTeam} 
      edit={this.editTeam}
      key={teamId} id={teamId} 
      name={teamName} description={teamDescription}
      isTeamMember={teamId===this.props.myteam}
      hasTeam={this.props.myteam>0}
      challengeName={challengeName}      
      skills={skillsWanted}
      teamslink={msTeamsChannel}
      msTeamsChannel={msTeamsChannel}
      />
  ))
  }
  //{this.getTeamListItems(this.state.teams)}
  render() {
    return(
      <Accordion 
        fluid 
        styled                 
        exclusive={false}>
        {this.getChallengesList()}      
      </Accordion>
    );
  }
}

export default TeamsList;
