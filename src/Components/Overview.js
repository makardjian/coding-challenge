import React from 'react'
import GroupEntry from './GroupEntry'

const Overview = (props) => {
  const { groups, icons } = props;
  let groupNames = Object.keys(groups);
  return (
    <main>
      <div className="overview-container">
      <h2>Things To Do</h2>
      <hr />
      {
        groupNames.map(groupName => {
          return <GroupEntry group={groups[groupName]} icons={icons}/>
        })
      }
      </div>
    </main>
  )
}

export default Overview;
