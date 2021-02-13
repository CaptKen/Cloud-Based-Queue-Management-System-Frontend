import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import GetQueue from "./components/GetQueue";
import NavigationBar from './components/NavBar';
import CurrentQueue from './components/CurrentQueue';
import Admin from './components/Admin'
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import StorePage from "./components/StorePage"
import Footer from './components/Footer';
import './footer.css';
import UserQueueList from './components/UserQueueList';
import ManageQueuetable from './components/ManageQueueTable';
import ManageStore from './components/ManageStore';


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import CreateBusiness from './components/CreateBusiness';

import BookQueue from './components/BookQueue';
import LoginPageAdmin from './components/LoginPageAdmin';
import LoginPageManager from './components/LoginPageManager';
import LoginPageEmployee from './components/LoginPageEmployee';
import SignUpEmployee from './components/SignUpEmployee';

import SetPW from './components/SetPw'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showLogin: true,
      show: false,
      showLogout: false,
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
      showLogin: true
    });
  };

  handleClose = (e) => {
    this.setState({
      show: false,
      showLogout: false
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
      showLogout: true
    });
  };
  render() {
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div >
        <div className="myapp">
          <Router history={history}>
            {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
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
              </div>
            )}
          </nav> */}

            <NavigationBar />
            {/* {showAdminBoard && (
              <SideNav/>
              )} */}

            <div className="container">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path='/setPassword/:username' render={(props) => <SetPW{...props} />} />
                {/* <Route exact path="/login" component={Login} /> */}
                {/* <Route exact path="/register" component={SignUpPage} /> */}
                <Route exact path="/profile" component={Profile} />
                <Route path="/check" component={UserQueueList} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={Admin} />
                <Route path="/getqueue" component={GetQueue} />
                <Route path="/currentQueue" render={(props) => <CurrentQueue{...props} />} />
                <Route path="/store" component={StorePage} />
                <Route path="/ManageQueuetable" component={ManageQueuetable} />
                <Route path="/ManageStore" component={ManageStore} />


                  <Route path="/CreateBusiness" component={CreateBusiness} />

                <Route path="/bookqueue" component={BookQueue} />
                <Route path="/LoginPageAdmin" component={LoginPageAdmin} />
                <Route path="/LoginPageManager" component={LoginPageManager} />
                <Route path="/SignUpEmployee" component={SignUpEmployee} />
                <Route path="/LoginPageEmployee" component={LoginPageEmployee} />


              </Switch>

            </div>

          </Router>
        </div>
        <Footer />
      </div>
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