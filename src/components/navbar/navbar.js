import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { Context } from '../../context/reactcontext';
import './navbar.css'
export const NavigationBar = () => {
  const {loginvalue,setLogIn} = useContext(Context);
  const navigate = useNavigate();

  const logout =() =>{
    sessionStorage.clear();
  }

  return (
    <>
      <div>
            { loginvalue == "notlogged"&&
              <nav className="navbar navbar-expand-lg cutsomnav">
                <div className="navlist">
                    <Link  className="nav-login-items" style={{ textDecoration: 'none'}}>React Store</Link>
                </div>
              </nav>
            }
            {loginvalue == "yes" && 
              <nav className="navbar navbar-expand-lg cutsomnav">
                <div className="navlist">
                    <Link  className="nav-login-items" style={{ textDecoration: 'none'}}>React Admin</Link>
                    <Link to="/admindashboard"  className="nav-login-items" style={{ textDecoration: 'none'}}>Home</Link>
                    <Link to="/addproduct"  className="nav-login-items" style={{ textDecoration: 'none'}}>Add Product</Link>
                    <Link to="/" onClick={logout} className="nav-login-items" style={{ textDecoration: 'none'}}>Logout</Link>
                </div>
              </nav>
            }
            {loginvalue == "no" && 
              <nav className="navbar navbar-expand-lg cutsomnav">
                <div className="navlist">
                    <Link  className="nav-login-items" style={{ textDecoration: 'none'}}>React User</Link>
                    <Link to="/userdashboard"  className="nav-login-items" style={{ textDecoration: 'none'}}>Home</Link>
                    <Link to="/viewcart" className="nav-login-items" style={{ textDecoration: 'none'}}>View cart</Link>
                    <Link to="/" onClick={logout} className="nav-login-items" style={{ textDecoration: 'none'}}>Logout</Link>
                </div>
              </nav>
            }
      </div>
    </>
  )

}