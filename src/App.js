import React, { Component } from 'react'
import './App.css';
import Overview from './Components/Overview';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
      groups: {},
      tasks: [],
      icons: {},
    }
  }

  componentDidMount () {
    let allTasks;
    let allGroups = {};
    
    axios.get('/data.json')
    .then(data => {
      allTasks = data.data;
      for (let task of allTasks) {
        let group = task.group;
        if (allGroups[group]) allGroups[group].push(task);
        else allGroups[group] = [task];
      }
      this.setState({
        groups: allGroups,
      })
    })
    axios.get('./completed.svg')
    .then(icon => {
      let obj = {completed: icon.data}
      this.setState({
        icon: obj,
      });
    })
  }

  render() {
    const { view, groups, icon } = this.state;
    if (view === 'overview') {
      return (
        <div id='App'>
          <Overview groups={groups} icon={icon}/>
        </div>
      )
    }
  }
}
