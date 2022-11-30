import React from 'react'

function DefaultLayout(props) {
  return (
    <div className='layout'>
        <div className="header d-flex justify-content-between align-items-center">
            <h1 className='text-white'>
              {" "}
            <b className='secondary-text'>Computer Science Department </b>   
            Results {" "}
            </h1>
            <h1 className='text-white text-medium'>Employee</h1>
        </div>
        <div className="content">
            {props.children}

        </div>
      
    </div>
  )
}

export default DefaultLayout
