import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const GroupEntry = (props) => {
  let { group, icons, renderDetails } = props;
  let numberOfTasks = group.length;
  let groupName = group[0].group;
  let tasksCompleted = group.reduce((acc, task) => {
   if (task.completedAt !== null) return acc + 1;
   else return acc + 0;
  }, 0);
  return (
    <div className="overview-group-entry" onClick={(e) => {renderDetails(groupName)}}>
    {icons ? ReactHtmlParser(icons.group): ''}
      <div className="overview-group-entry-text">
        <div className="overview-group-entry-header">{groupName}</div>
        <div className="overview-group-entry-complete-count">{tasksCompleted} of {numberOfTasks} tasks complete</div>
      </div>
      <hr />
    </div>
  )
}

export default GroupEntry;
