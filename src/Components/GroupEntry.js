import React, { Component } from 'react'

const GroupEntry = (props) => {
  const { group, index } = props;
  return (
    <div>Task Group {index + 1}: {group[0].group}</div>
    
  )
}

export default GroupEntry;