import React,{useContext,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router,Routes , Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import View from './Pages/ViewPost'
import Post from './store/PostContext'
import { authContext } from './store/Context';
import {  onAuthStateChanged} from 'firebase/auth'; 
import { auth } from './firebase/config'; 
import Create from './Pages/Create'
import Home from './Pages/Home';


function App() {
  const { user,setUser } = useContext(authContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user,setUser]);
  return (
    <div>
      <Post>
      <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/login" element={<Login />} />
          <Route path='/create' element={<Create/>}/>
          <Route path='/view' element={<View/>}/>
      </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;