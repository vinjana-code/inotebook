import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About  from './components/About';
import  Nomatch  from './components/Nomatch';
import  Login  from './components/Login';
import Signup from "./components/Signup";  

import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
      <Navbar />  
      <Alert message="Amazing message" />
      <div className="container">
        <Routes>                  
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />       
            <Route path="*" element={<Nomatch />} />
            <Route path="login" element={<Login />} /> 
            <Route path="signup" element={<Signup />} />         
      </Routes>
      </div>
    </NoteState>
    </>
  );
}


export default App;
