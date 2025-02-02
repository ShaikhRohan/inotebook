import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login', {replace : true});
  }
  let location = useLocation();
  useEffect(() => {
   //console.log(location.pathname);
  }, [location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname==='/home'?'active':''}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'? 'active': ''}`} to="/about">
                  About Us
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex" role="search">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
              <Link className={`btn btn-primary mx-1 ${location.pathname === '/login'? 'active': ''} `} to='/login' role="button">Login</Link>
              <Link className={`btn btn-primary ${location.pathname === '/signup'? 'active': ''} `}  to='/signup' role="button">Signup</Link>
            </form>
            : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
