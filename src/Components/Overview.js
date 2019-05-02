import React from 'react'
import GroupEntry from './GroupEntry'

const Overview = (props) => {
  const { groups, icons, renderDetails } = props;
  let groupNames = Object.keys(groups);
  return (
    <main>
      <div className="container">
      <h2>Things To Do</h2>
      <hr />
      {
        groupNames.map(groupName => {
          return <GroupEntry group={groups[groupName]} icons={icons} 
          renderDetails={renderDetails}/>
        })
      }
      </div>
    </main>
  )
}

export default Overview;

/*
Thoughts about switching to a task-centric stateful architecture:
-In order to render the Overview Component, I would need to itterate 
over all the tasks in the array and then group then create an object with groups as keys
then pass those down to the GroupEntry component. 
*/