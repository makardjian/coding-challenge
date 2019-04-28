import React, { Component } from 'react';
import './App.css';
import Overview from './Components/Overview';
import Details from './Components/Details';
import axios from 'axios';
import Bluebird from 'bluebird';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
      groups: {},
      icons: {},
    }
    this.fetchIcons = this.fetchIcons.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  componentDidMount () {
    this.fetchData();
    this.fetchIcons();
  }

  fetchData () {
    let allGroups = {};
    axios.get('/data.json')
    .then(data => {
      let allTasks = data.data;
      for (let task of allTasks) {
        let group = task.group;
        if (allGroups[group]) allGroups[group].push(task);
        else allGroups[group] = [task];
      }
      this.setState({
        groups: allGroups,
      });
    });
  }

  fetchIcons () {
    const svgTags = {};
    const svgRoutes = ['completed', 'group', 'incomplete', 'locked'];
    Bluebird.each(svgRoutes, (route) => {
      return axios.get(`./${route}.svg`)
      .then(svgData => {
        svgTags[route] = svgData.data;
      });
    })
    .then(() => {
      this.setState({
        icons: svgTags,
      });
    });
  }

  renderDetails (groupName) {
    this.setState({
      view: groupName,
    })
  }

  render() {
    const { view, groups, icons } = this.state;
    if (view === 'overview') {
      return (
        <div id='App'>
          <Overview groups={groups} icons={icons} renderDetails={this.renderDetails}/>
        </div>
      )
    } else {
      return (
        <div id='App'>
          <Details group={groups[view]}/>
        </div>
      )
    }
  }
}
