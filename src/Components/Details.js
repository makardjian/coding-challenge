import React from 'react';
import TaskEntry from './TaskEntry';

const Details = (props) => {
  const { group, icons, dependencyCounts, toggleTask, returnToOverview } = props;
  let groupName = group[0].group;
  return (
    <main>
    <div className="container">
      <h2>{groupName}</h2>
      <div className="details-all-groups-box">
        <div className="details-all-groups-text" style={{cursor: 'pointer'}} onClick={returnToOverview}>All Groups</div>
      </div>
      <hr/>
    </div>
    <div className="task-container">
      {
        group.map((task, i) => {
          return (
            <TaskEntry key={i} task={task} icons={icons} dependencyCounts={dependencyCounts} 
            toggleCompleted={toggleTask}/>
          );
        })
      }
    </div>
    </main>
  )
}

export default Details;
