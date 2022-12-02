import React from 'react'

function PageTitle({title}) {
  return (
    <div className='px-2'>
      <h1 className='text-large'>{title}</h1>
      <hr />
    </div>
  )
}

export default PageTitle
