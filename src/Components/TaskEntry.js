import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const TaskEntry = (props) => {
  const { task, icons } = props;
  console.log(task);
  if (task.dependencyIds.length) {
    return (
      <React.Fragment>
        <div className="task-entry-box" onClick={(e) => this.toggleCompleted(task.group, task.id)}>
        {icons ? ReactHtmlParser(icons.locked) : ''}
          <div className="task-text">{task.task}</div>
        </div>
        <hr/>
      </React.Fragment>
    )
  } else if (task.completedAt !== null) {
      return (
        <React.Fragment>
        <div className="task-entry-box">
        {icons ? ReactHtmlParser(icons.completed) : ''}
          <div className="task-text">{task.task}</div>
        </div>
        <hr/>
        </React.Fragment>
      )
  } else {
    return (
      <React.Fragment>
      <div className="task-entry-box">
      {icons ? ReactHtmlParser(icons.incomplete) : ''}
        <div className="task-text">{task.task}</div>
      </div>
      <hr/>
    </React.Fragment>
    )
  }
}
export default TaskEntry;