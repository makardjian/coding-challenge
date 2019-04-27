import React, { Component } from 'react'
//look into React SVG

const GroupEntry = (props) => {
  let { group, index, icon } = props;
  if (icon) {
    icon = icon.completed;
  }
  let tasksCompleted = group.reduce((acc, task) => {
   if (task.completedAt !== null) return acc + 1;
   else return acc + 0;
  }, 0);
  let numberOfTasks = group.length;
  return (
    <div className="overview-group-entry">
    <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <path id="a" d="M0 0h21v21H0z"/>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <use fill="#9DE1B6" xlink:href="#a"/>
        <path stroke="#FFF" stroke-width="4" d="M2 2h17v17H2z"/>
        <path stroke="#E2E2E2" d="M.5.5h20v20H.5z"/>
      </g>
      <div className="overview-group-entry-text">
        <div className="overview-group-entry-header">Group {index + 1} - {group[0].group}</div>
        <div className="overview-group-entry-complete-count">{tasksCompleted} of {numberOfTasks} tasks completed</div>
      </div>
      <hr/>
    </svg>
    </div>
  )
}

export default GroupEntry;