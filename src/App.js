import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import About from './components/about/About';
import NoteState from './context/NoteState';
import Alert from './components/alert/Alert';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
function App() {
  return (
    <>
    <NoteState>
  <Router>
    <Navbar></Navbar>
    <Alert message={'Shaikh Rohan never back for anything'}></Alert>
    <div className='container'>
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/home' element={<Home></Home>}></Route>
      <Route exact path='/about' element={<About></About>}></Route>
      <Route exact path='/login' element={<Login></Login>}></Route>
      <Route exact path='/signup' element={<Signup></Signup>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
