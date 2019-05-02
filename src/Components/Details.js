import React from 'react';
import TaskEntry from './TaskEntry';

const Details = (props) => {
  const { group, icons, toggleTask, returnToOverview } = props;
  let groupName = group[0].group;
  console.log(group);
  return (
    <main>
    <div className="container">
      <h2>{groupName}</h2>
      <div className="details-all-groups-box">
        <div className="details-all-groups-text" onClick={returnToOverview}>All Groups</div>
      </div>
      <hr/>
    </div>
    <div className="task-container">
      {
        group.map(task => {
          return (
            <TaskEntry task={task} icons={icons} toggleCompleted={toggleTask}/>
          );
        })
      }
    </div>
    </main>
  )
}

export default Details;