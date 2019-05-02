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
        groupNames.map((groupName, i) => {
          return <GroupEntry key={i} group={groups[groupName]} icons={icons} 
          renderDetails={renderDetails}/>
        })
      }
      </div>
    </main>
  )
}

export default Overview;
