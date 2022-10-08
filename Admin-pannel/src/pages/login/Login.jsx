import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux';
import {login} from '../../redux/apiCalls';

const Login = () => {
    const [username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const dispatch =useDispatch();

     const handleClick = e => {
      e.preventDefault()
      login(dispatch, {username, password});

     }
return (
    <div 
       style={{
        height: '100vh',
        display:"flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

      
      }}
    >  <h1>Admin Login</h1>
       <input
       style={{padding:'10px 20px 10px 20px', margin:'10px'}}
       type="text" placeholder='Enter Your Name'
        onChange={e => setUsername(e.target.value)}
       />
       <input
       style={{padding:'10px 20px 10px 20px', margin:'10px'}}
       type="password" placeholder='Enter Your Password'
         onChange={e => setPassword(e.target.value)}
       />
       <button onClick={handleClick}
         style={{padding:'10px 20px 10px 20px', border:"none", backgroundColor: 'green', borderRadius:'3px'}}
       >Login</button>
    </div>
  )
}

export default Login
