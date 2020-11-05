import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import GetInQueue from "./components/GetInQueue";
import NavBar from './components/NavBar';
import CurrentQueue from './components/CurrentQueue';
import Admin from './components/Admin'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { Modal, Button } from "react-bootstrap";
import Login from "./components/LoginPage";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showLogin: true,
      show:false,
      showLogout: false
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
    console.log("logout");
  }
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
      showLogout : false
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
showLogout = () => {
  this.setState({
    showLogout : true
  });
};
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      // <BrowserRouter>
      //   <NavBar />
      //   <Switch>
      //     <Route exact path="/login" component={LoginPage} />
      //     <Route path="/signUp" component={SignUpPage} />
      //     <Route path="/getQueue" component={GetInQueue} />
      //     <Route path="/currentQueue" component={CurrentQueue} />
      //     <Route path="/adminPage" component={Admin} />
      //   </Switch>
      // </BrowserRouter>
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              QMS
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/getqueue"} className="nav-link">
                  เข้าคิว/ต่อคิว
                </Link>
              </li>

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
                    Admin Board
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

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                  
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">{
                  true ? <Link to={"/login"} className="nav-link">
                  Login
                </Link>:<Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                }
                  
                </li>

                {/* <li className="nav-item">
                  
                </li> */}
                {/* <li className="nav-item">
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
                </li> */}
              </div>
            )}
          </nav>

          <div className="container mt-3">
            {/* <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={SignUpPage} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch> */}
            <Switch>
//               <Route exact path={["/", "/home"]} component={Home} />
//               <Route exact path="/login" component={Login} />
//               <Route exact path="/register" component={SignUpPage} />
//               <Route exact path="/profile" component={Profile} />
//               <Route path="/user" component={BoardUser} />
//               <Route path="/mod" component={BoardModerator} />
//               {/* <Route path="/admin" component={BoardAdmin} /> */}
//               <Route path="/admin" component={Admin} />
//               <Route path="/getQueue" component={GetInQueue} />
//               <Route path="/currentQueue" component={CurrentQueue} />
//             </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);


// // export default App;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Router, Switch, Route, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import SignUpPage from "./components/SignUpPage";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";
// import Admin from './components/Admin';
// import CurrentQueue from './components/CurrentQueue';
// import GetInQueue from './components/GetInQueue';
// import NavBar from './components/NavBar';

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

// import { history } from './helpers/history';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       show:false,
//       menu: false
//     };

//     history.listen((location) => {
//       props.dispatch(clearMessage()); // clear message when changing location
//     });
//   }

//   componentDidMount() {
//     const user = this.props.user;

//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//         showCustomerTab: ''
//       });
//     }
//   }

//   logOut() {
//     this.props.dispatch(logout());
//   }

//   render() {

//     return (
//       <Router history={history}>
//         <div>
//         <NavBar />
//           <div className="container mt-3">
//             <Switch>
//               {/* <Route exact path={["/", "/home"]} component={Home} /> */}
//               {/* <Route exact path="/login" component={Login} /> */}
//               {/* <Route exact path="/register" component={SignUpPage} /> */}
//               <Route exact path="/profile" component={Profile} />
//               <Route path="/user" component={BoardUser} />
//               <Route path="/mod" component={BoardModerator} />
//               {/* <Route path="/admin" component={BoardAdmin} /> */}
//               <Route path="/admin" component={Admin} />
//               <Route exact path={["/", "/getQueue"]} component={GetInQueue} />
//               <Route path="/currentQueue" component={CurrentQueue} />
//             </Switch>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }

// export default connect(mapStateToProps)(App);