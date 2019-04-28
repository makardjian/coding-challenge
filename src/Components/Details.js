import React from 'react';

const Details = (props) => {
  const { group } = props;
  let groupName = group[0].group;
  return (
    <main>
    <div className="container">
      <h2>{groupName}</h2>
      <hr/>
    </div>
    </main>
  )
}

export default Details;