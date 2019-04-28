import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const GroupEntry = (props) => {
  let { group, icons } = props;
  let tasksCompleted = group.reduce((acc, task) => {
   if (task.completedAt !== null) return acc + 1;
   else return acc + 0;
  }, 0);
  let numberOfTasks = group.length;
  return (
    <div className="overview-group-entry">
    {icons ? ReactHtmlParser(icons.group): ''}
      <div className="overview-group-entry-text">
        <div className="overview-group-entry-header">{group[0].group}</div>
        <div className="overview-group-entry-complete-count">{tasksCompleted} of {numberOfTasks} tasks complete</div>
      </div>
      <hr />
    </div>
  )
}

export default GroupEntry;