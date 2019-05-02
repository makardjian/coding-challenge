import React from 'react';
import HtmlParser from 'html-react-parser';

const TaskEntry = (props) => {
  const { task, icons, dependencyCounts, toggleCompleted } = props;
  let id = task.id;
  if (dependencyCounts[id] > 0) {
    return (
      <React.Fragment>
        <div className="task-entry-box">
        {icons ? HtmlParser(icons.locked) : ''}
          <div className="task-text">{task.task}</div>
        </div>
        <hr/>
      </React.Fragment>
    )
  } else if (task.completedAt !== null) {
      return (
        <React.Fragment>
        <div className="task-entry-box" onClick={toggleCompleted.bind(this,task.group, task.id, task.completedAt) }>
        {icons ? HtmlParser(icons.completed) : ''}
          <div className="task-text">{task.task}</div>
        </div>
        <hr/>
        </React.Fragment>
      )
  } else {
    return (
      <React.Fragment>
      <div className="task-entry-box" onClick={toggleCompleted.bind(this,task.group, task.id, task.completedAt)}>
      {icons ? HtmlParser(icons.incomplete) : ''}
        <div className="task-text">{task.task}</div>
      </div>
      <hr/>
    </React.Fragment>
    )
  }
}
export default TaskEntry;
