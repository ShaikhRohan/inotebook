import React  from 'react'
import Notes from '../notes/Notes'


const Home = (props) => {

  return (
   <div>
   <Notes showAlert= {props.showAlert}></Notes>
   </div>
  )
}

export default Home
