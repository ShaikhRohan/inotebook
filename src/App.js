import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {Routes, Route} from 'react-router-dom'
import About from './components/about/About';
function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/home' element={<Home></Home>}></Route>
      <Route excat path='/about' element={<About></About>}></Route>
    </Routes>
    </>
  );
}

export default App;
