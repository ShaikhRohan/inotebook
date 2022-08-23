import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import About from './components/about/About';
import NoteState from './context/NoteState';
import Alert from './components/alert/Alert';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {useState} from 'react'
function App() {
  const [alert , setAlert] = useState(null)
  const showAlert=(message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
  <Router>
    <Navbar></Navbar>
    <Alert alert={alert}></Alert>
    <div className='container'>
    <Routes>
      <Route exact path='/' element={<Home showAlert ={showAlert}></Home>}></Route>
      <Route exact path='/home' element={<Home showAlert ={showAlert}></Home>}></Route>
      <Route exact path='/about' element={<About></About>}></Route>
      <Route exact path='/login' element={<Login showAlert ={showAlert}></Login>}></Route>
      <Route exact path='/signup' element={<Signup showAlert ={showAlert}></Signup>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
