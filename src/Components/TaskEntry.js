import React from 'react';
import HtmlParser from 'html-react-parser';

const TaskEntry = (props) => {
  const { task, icons, toggleCompleted } = props;
  if (task.dependencyCount > 0) {
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

/*
Dev Notes:
 -The HTML - React parser that I'm currently using is causing problems because it's not converting
 traditional html tag syntax into JSX camelCase. Try using another npm library or look up problems for this
 on stackOverflow.

 -Check to see if the functionality for your toggleStatus logic is working.
*/
