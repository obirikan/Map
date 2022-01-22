import './login.css';
import {Room,Cancel} from '@material-ui/icons'
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

 const Login= ({log,store,setuser}) => {
   const [error,seterror]=useState(false)

   const nameref=useRef()
   const passwordref=useRef()

 const handleusers=async(e)=>{
    e.preventDefault()
    const newuser={
      username:nameref.current.value,
      password:passwordref.current.value
    }
    try{
     const res= await axios.post('http://localhost:5000/api/user/login',newuser)
      store.setItem('user',res.data.username) 
      setuser(res.data.username) 
      log(false)
      seterror(false)
    }catch(err){
       seterror(true)
    }
 }
  return (
  <div className='logcont'>
    <div className='logo1'>
      <Room/>
      Obrics
    </div>
      <form onSubmit={handleusers}>
        <input type="text" placeholder='username' ref={nameref} className="inputs"/>
        <input type="password" placeholder='password' ref={passwordref} className="inputs"/>
        <button className='l-btn'>login</button>
         {error && (<span className='error'>something went wrong</span>)}
      </form>
      <Cancel className='cancel1' onClick={()=>{log(false)}}/>
  </div>
  )};
export default Login