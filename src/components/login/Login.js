import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";

const Login = (props) => {
    // const [email, setEmail] = useState('');
    // const [password , setPassword] = useState('');
    const [credentials, setCredentials] = useState({email : '', password : ''})
    let navigate = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password}) 
          });
           const json = await response.json();
           console.log(json);
           if(json.success){
            //redirect we use historyhook
            localStorage.setItem('token', json.authToken);
            props.showAlert(' Login Successfuly', 'success')
            navigate('/home', {replace : true});
            //save the auth token in localstorage
           

           }
           else{
            props.showAlert(' Login Failed Please Use Correct Credentials', 'danger')
           }
    }
    const onChange=(e)=>{
        //spread opeartor ...
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
  return (
    <div className='container'>
       <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange}  id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        {/* use reducer & onSubmit is for the form*/}
      </form>
    </div>
  )
}

export default Login
