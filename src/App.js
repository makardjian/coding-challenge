import React, { Component } from 'react';
import './App.css';
import Overview from './Components/Overview';
import Details from './Components/Details';
import Axios from 'axios';
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
    this.toggleTask = this.toggleTask.bind(this);
    this.returnToOverview = this.returnToOverview.bind(this);
    this.clearDependencyCompletes = this.clearDependencyCompletes.bind(this);
  }

  componentDidMount () {
    this.fetchData();
    this.fetchIcons();
  }

  fetchData () {
    const groups = {};
    Axios.get('/data.json')
    .then(data => {
      let allTasks = data.data;
      for (let task of allTasks) {
        let groupName = task.group;
        task.dependencyCount = task.dependencyIds.length;
        if (groups[groupName]) groups[groupName].push(task);
        else groups[groupName] = [task];
      }
      this.setState({ groups });
    });
  }

  fetchIcons () {
    const icons = {};
    const svgRoutes = ['completed', 'group', 'incomplete', 'locked'];
    Bluebird.each(svgRoutes, (route) => {
      return Axios.get(`./${route}.svg`)
      .then(svgData => {
        icons[route] = svgData.data;
      });
    })
    .then(() => {
      this.setState({ icons });
    });
  }

  renderDetails (groupName) {
    this.setState({ view: groupName });
  }

  toggleTask (group, toggledTaskId, taskStatus) {
    // the taskStatus indicates status of the task before user toggles the task;
    taskStatus === null ? taskStatus = 'complete' : taskStatus = 'incomplete';

    let groups = { ...this.state.groups };

    // itterate only over the corect group in order to find the toggled task;
    for (let task of groups[group]) { 
      if (task.id === toggledTaskId) {
        task.completedAt === null ? task.completedAt = (new Date()).toString() : 
        task.completedAt = null;
        break;
      }
    }
    this.adjustDependencies(groups, toggledTaskId, taskStatus);
    this.setState({ groups });
  }

  adjustDependencies(groups, id, taskStatus) {
    // itterate over all tasks to adjust dependencyCounts for dependent tasks;
    for (let key in groups) {
      let groupTasks = groups[key];
      for (let i = 0; i < groupTasks.length; i += 1) {
        if (groupTasks[i].dependencyIds.includes(id)) {
          // if the toggledTask is 'complete', then dependent tasks have 1 less dependency;
          if (taskStatus === 'complete') {
            groupTasks[i].dependencyCount -= 1;
          } else {
            groupTasks[i].dependencyCount += 1;
            groupTasks[i].completedAt = null;
            this.adjustDependencies(groups, groupTasks[i].id, 'incomplete');
          }
        }
      }
    }
  }

  returnToOverview () {
    this.setState({view: 'overview'});
  }

  clearDependencyCompletes (taskId, groups) {
    for (let group in groups) {
      for (let task of groups[group]) {
        if (task.dependencyIds.includes(taskId)) {
          task.completedAt = null;
          this.clearDependencyCompletes(task.id, groups);
        }
      }
    }
    this.setState({groups});
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
          <Details group={groups[view]} icons={icons} toggleTask={this.toggleTask} 
          returnToOverview={this.returnToOverview}/>
        </div>
      )
    }
  }
}

/*
Dev Notes:
-Fix dependency issue
-CSS
-Document API endpoints
-clean up code
-remove clearDependencies funciton?
*/