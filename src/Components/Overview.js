import React, { Component } from 'react'
import GroupEntry from './GroupEntry'

const Overview = (props) => {
  let groupNames = Object.keys(props.groups);
  return (
    <main>
      <div className="overview-container">
      <h2>Things To Do</h2>
      <hr/>
      {
        groupNames.map((groupName, index) => {
          return <GroupEntry group={props.groups[groupName]} index={index} icon={props.icon}/>
        })
      }
      </div>
    </main>
  )
}

export default Overview;
