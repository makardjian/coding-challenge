import React from 'react';
import TaskEntry from './TaskEntry';

const Details = (props) => {
  const { group, icons } = props;
  let groupName = group[0].group;
  console.log(group);
  return (
    <main>
    <div className="container">
      <h2>{groupName}</h2>
      <div className="details-all-groups-box">
        <div className="details-all-groups-text">All Groups</div>
      </div>
      <hr/>
    </div>
    <div className="task-container">
      {
        group.map(task => {
          return (
            <TaskEntry task={task} icons={icons}/>
          )
        })
      }
    </div>
    </main>
  )
}

export default Details;