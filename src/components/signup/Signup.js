import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [credentials, setCredentials] = useState({name: '', email : '', password : '' , confirmPassword :''})
  let navigate = useNavigate();
  const handleSubmit= async (e)=>{
      e.preventDefault();
      const {name , email , password} = credentials;
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email,password}) 
        });
         const json = await response.json();
         console.log(json);
         if(json.success){
          //redirect we use historyhook
          localStorage.setItem('token', json.authtoken);
          navigate('/login', {replace : true});
          //save the auth token in localstorage

         }
         else{
          alert('Invalid Credentials')
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
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange}  id="name" name='name' />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name='password' id="password" required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} name='confirmPassword' id="confirmPassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
