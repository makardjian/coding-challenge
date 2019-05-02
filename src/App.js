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
      dependencies: {},
      dependencyCounts: {},
      icons: {},
    }
    this.fetchIcons = this.fetchIcons.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.returnToOverview = this.returnToOverview.bind(this);
  }

  componentDidMount () {
    this.fetchData();
    this.fetchIcons();
  }

  fetchData () {
    const groups = {};
    const dependencies = {};
    const dependencyCounts = {};
    Axios.get('/data.json')
    .then(data => {
      let allTasks = data.data;
      for (let task of allTasks) {
        let groupName = task.group;
        if (groups[groupName]) groups[groupName].push(task);
        else groups[groupName] = [task];
        dependencyCounts[task.id] = task.dependencyIds.length; 
        dependencies[task.id] = [];
        task.dependencyIds.forEach(d => {
          dependencies[d].push(task.id);
        });
      }
      this.setState({ groups, dependencies, dependencyCounts });
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

  findTask (id) {
    let clone = {...this.state.groups}
    for (let key in clone) {
      for (let task of clone[key]) {
        if (id === task.id) {
          return task; 
        }
      }
    }
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

    // targetIds should return the ids of tasks that need to be reverted back to incomplete
    let targetIds = this.adjustDependencies(toggledTaskId, taskStatus);
    if (targetIds.length) {
      for (let key in groups) {
        for (let task of groups[key]) {
          if (targetIds.includes(task.id)) task.completedAt = null;
        }
      }
    }
    this.setState({ groups });
  }

  adjustDependencies(id, taskStatus) {
    // itterate over all tasks to adjust dependencyCounts for dependent tasks;
    let dependencies = { ...this.state.dependencies };
    let dCounts = { ...this.state.dependencyCounts };
    let queue = [...dependencies[id]];
    let result = [];
    
    // if taskStatus is complete, then just adjust the dependency counts for direct dependencies
    if (taskStatus === 'complete') {
      while (queue.length) {
        let current = queue.shift();
        dCounts[current] -= 1;
      }
    } else {
      // otherwise adjust dependency counts for dependencies of dependencies
      while (queue.length) {
        let current = queue.shift();
        if (!result.includes(current)) result.push(current);
        let targetTask = this.findTask(current);
        if (targetTask.completedAt !== null) {
          // dependencies of dependencies should only be considered if the current task was already completed
          queue = queue.concat(dependencies[current]);
        } else {
          // we can pop off the current value because we know it's already in result array
          result.pop();
        }
        dCounts[current] += 1;
      }
    }
    this.setState({dependencies, dependencyCounts: dCounts});
    return result;
  }

  returnToOverview () {
    this.setState({view: 'overview'});
  }

  render() {
    const { view, groups, icons, dependencyCounts } = this.state;
    if (view === 'overview') {
      return (
        <div id='App'>
          <Overview groups={groups} icons={icons} renderDetails={this.renderDetails}/>
        </div>
      )
    } else {
      return (
        <div id='App'>
          <Details group={groups[view]} icons={icons} dependencyCounts={dependencyCounts} 
          toggleTask={this.toggleTask} returnToOverview={this.returnToOverview}/>
        </div>
      )
    }
  }
}
