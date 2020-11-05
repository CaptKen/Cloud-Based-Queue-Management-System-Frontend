import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { Modal, Button } from "react-bootstrap";
import Login from "./LoginPage";
import { logout } from "../actions/auth";
import SignUpPage from "./SignUpPage"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            showModeratorBoard: false,
            showAdminBoard: true,
            showCustomerTab: false,
            currentUser: undefined,
            show:false,
            showLogin: true,
            showLogout: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
      this.props.dispatch(logout());
    }

    // toggleMenu() {
    //     this.setState({ menu: !this.state.menu })
    // }
    handleShow = () => {
        console.log("show");
        this.setState({
          show: true,
          showLogin : true
        });
      };
    
      handleClose = (e) => {
        this.setState({
          show: false,
        });
        
      };

      showRegister = () => {
        this.setState({
            showLogin: !this.state.showLogin
          });
      }
    
      toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }
    render() {
        const show = (this.state.menu) ? "show" : "";
        const { currentUser, showModeratorBoard, showAdminBoard , showCustomerTab} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
            <Link to={"/"} className="navbar-brand">
              QMS
            </Link>
            
            
            <div className={"collapse navbar-collapse " + show} >
            <div className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li> */}

              {/* <li className="nav-item">
                <Link to={"/admin2"} className="nav-link">
                  Admin
                </Link>
              </li> */}

              {showCustomerTab && (
                  <li className="nav-item">
                <Link to={"/getQueue"} className="nav-link">
                getQueue
                </Link>
              </li>
              )}

              {showCustomerTab && (
                  <li className="nav-item">
                  <Link to={"/currentQueue"} className="nav-link">
                  currentQueue
                  </Link>
                </li>
              )}

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Queue Management
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    login
                  </Link>
                </li> */}

                <li className="nav-item">
                <Button variant="primary" onClick={this.handleShow}>
                <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
              Login
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <h1 style={{textAlign: "center"}}>
            {this.state.showLogin ? "Login":"Register"}
            </h1>
            </Modal.Header>
            <Modal.Body>
                {this.state.showLogin ? <Login/>:<SignUpPage/>}
            </Modal.Body>
            <Modal.Footer>
              <p className="text-right" >
              {this.state.showLogin ? "No Account ?":""}  
              </p>
              <Button variant="primary" onClick={this.showRegister}>
              {this.state.showLogin ? "Sign Up":"Login"}
              </Button>
            </Modal.Footer>
          </Modal>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            )}
          </nav>
            </div>
            
        )
    }
}

export default NavBar;