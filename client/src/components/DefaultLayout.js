import React from 'react'

function DefaultLayout(props) {
  return (
    <div className='layout'>
        <div className="header d-flex justify-content-between">
            <h1>Computer Science Department <b>Results</b></h1>
            <h1>Employee</h1>
        </div>
        <div className="content">
            {props.children}

        </div>
      
    </div>
  )
}

export default DefaultLayout
