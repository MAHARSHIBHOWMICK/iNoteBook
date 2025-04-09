import React, {useState} from "react";
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Allert from './components/Allert';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';

function App() {
  const [alert, setAlert]= useState(null);

  const showAlert = (message , type)=>{
    setAlert({
      msg : message , 
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/> 
        <Allert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
          </div> 
      </Router>
    </NoteState>
    </>
  );
}

export default App;
