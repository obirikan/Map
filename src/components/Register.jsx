import './register.css';
import {Room,Cancel} from '@material-ui/icons'
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

 const Register = ({reg}) => {
   const [sucess,setsucess]=useState(false)
   const [error,seterror]=useState(false)

   const nameref=useRef()
   const emailref=useRef()
   const passwordref=useRef()

 const handleusers=async(e)=>{
    e.preventDefault()
    const newuser={
      username:nameref.current.value,
      email:emailref.current.value,
      password:passwordref.current.value
    }
    try{
      await axios.post('http://localhost:5000/api/user/register',newuser)
      setsucess(true)
      seterror(false)
    }catch(err){
       seterror(true)
    }
 }
  return (
  <div className='regcont'>
    <div className='logo'>
      <Room/>
      Obrics
    </div>
      <form onSubmit={handleusers}>
        <input type="text" placeholder='username' ref={nameref} className="inputs"/>
        <input type="email" placeholder='Email'ref={emailref} className="inputs"/>
        <input type="password" placeholder='password' ref={passwordref} className="inputs"/>
        <button className='r-btn'>register</button>
        {sucess &&( <span className='sucess'>sucessfull you can login now</span>)}
         {error && (<span className='error'>something went wrong</span>)}
      </form>
      <Cancel className='cancel' onClick={()=>{reg(false)}}/>
  </div>
  )};
export default Register