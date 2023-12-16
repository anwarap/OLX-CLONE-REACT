import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {auth,firestore} from '../../firebase/config'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { collection,addDoc } from 'firebase/firestore';



export default function Signup() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [error,setError]=useState('');
  const [nameError,setNameError]=useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('')
  const [phoneError,setPhoneError]=useState('');


  const navigate=useNavigate()


  const handleSubmit = async (e) =>{
    e.preventDefault();
    setNameError('')
    setEmailError('')
    setPhoneError('')
    setPasswordError('')
    let hasErrors;
    if(!username){
      setNameError('Username is required')
      hasErrors = true;

    }
    if(!email){
      setEmailError('Email is required')
      hasErrors = true;

    }
    if(!phone){
      setPhoneError('Phone is required')
      hasErrors = true;

    }
    if(!password){
      setPasswordError('Password is required')
      hasErrors= true;
    }
    if(!hasErrors){
      
      try{
        const result = await createUserWithEmailAndPassword(auth,email,password);
        const userReference = collection(firestore,'users');
        await updateProfile(result.user,{displayName:username})
        await addDoc(userReference,{
          id:result.user.uid,
          displayName:username,
          phoneNumber:phone
        })
        navigate('/login')
      }catch(error){
       setError(error.message);
      }
    }
  }
 

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
        <div className='text-danger text-center'>{error}</div>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
              setNameError('')
            }
            }
            id="fname"
            name="name"
            autoComplete="username"

          />
            <div className="error-message text-danger">{nameError}</div>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {setEmail
            (e.target.value)
            setEmailError('')}}
            id="fname"
            name="email"
            autoComplete="email"
          />
          <div className="error-message text-danger">{emailError}</div>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {setPhone(e.target.value)
            setPhoneError('');}
            }
            id="lname"
            name="phone"
            placeholder="Enter phone number"
            autoComplete="phone"
          />
            <div className="error-message text-danger">{phoneError}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) =>{ setPassword(e.target.value)
            setPasswordError('')}}
            id="lname"
            name="password"
            autoComplete="current-password"
          />
          <div className="error-message text-danger">{passwordError}</div>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>

      </div>
    </div>
  );
}
