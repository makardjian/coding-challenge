import React from 'react'
import GroupEntry from './GroupEntry'
import TaskEntry from './TaskEntry';

const Overview = (props) => {
  const { groups, icons, renderDetails, toggleTask, dependencyCounts } = props;
  // I need dependency counts and toggle completed function. 

  let groupNames = Object.keys(groups); //['build airplane, purchases]
  let tasks = [];
  for (let key in groups) {
    for (let i = 0; i < groups[key].length; i += 1) {
      tasks.push(groups[key][i]);
    }
  }
  return (
    <main>
      <div className="container">
      <h2>Things To Do</h2>
      <hr />
      {
        groupNames.map((groupName, i) => {
          return <GroupEntry key={i} group={groups[groupName]} icons={icons} 
          renderDetails={renderDetails}/>
        })
      }
      </div>
      <div>
      {
       tasks.map((task, i) => {
         return <TaskEntry task={task} icons={icons} toggleCompleted={toggleTask} 
         dependencyCounts={dependencyCounts} />
       })
      }
      </div>
    </main>
  )
}

export default Overview;
