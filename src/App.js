import React, { Component } from 'react'
import './App.css';
import Overview from './Components/Overview';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
      groups: [],
      tasks: [],
    }
  }

  componentDidMount () {
    let allTasks;
    let allGroups = {};
    
    axios.get('/data.json')
    .then(data => {
      allTasks = data.data;
      allGroups = data.data.map()
    })
  }

  render() {
    const { view } = this.state;
    if (view === 'overview') {
      return <Overview />
    }
  }
}


/*
Notes on how this will work:
  /When the DOM loads, I need to render the Overview component which will need to have access
  /to the group names
    /Overview will then map over the groups and each group will be an array of objects that have 
    the following info:
      1. The number of objects in the array
      2. the number of complete tasks. 
*/
