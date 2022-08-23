import React from 'react'

const Alert = (props) => {
    const capitalize=(word)=>{
      if(word === 'danger'){
        word = 'error';
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height: '60px'}}>
    {props.alert && <div>
          <div style={{height:'50px'}} className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
       <strong>{capitalize(props.alert.type)}</strong>{props.alert.message} 
        <button type="button" style={{color: 'black'}} className="btn-close" data-bs-dismiss="alert" aria-label="Close" />

      </div>
    </div>}
    </div>
  )
}

export default Alert
