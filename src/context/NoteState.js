import React, { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
    // const state = {
    //     "name" : "Rohan",
    //     "status" : "Single"
    // }
    const [state, setState] = useState({
        "name" : "Rohan",
        "status" : "Single"
    }
    )
    const update= ()=>{
        setTimeout(() => {
            setState({
                "name" : "Shaikh",
                "status" : "Married 4(Wives)"
            })
        }, 1000);
    }
  return (
    <div>
      <NoteContext.Provider value={{state, update}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
