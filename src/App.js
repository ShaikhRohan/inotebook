import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import About from './components/about/About';
import NoteState from './context/NoteState';
function App() {
  return (
    <>
    <NoteState>
  <Router>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/home' element={<Home></Home>}></Route>
      <Route exact path='/about' element={<About></About>}></Route>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
