import React from 'react'
import {useSelector} from 'react-redux'

const Home = () => {

  const {name} = useSelector(state=>state.alert)
  return (
    <div>Home
      <h1>{name}</h1>
    </div>
  )
}

export default Home