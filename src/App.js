import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import GetQueue from "./components/GetQueue";
import NavigationBar from './components/NavBar';
import CurrentQueue from './components/CurrentQueue';
import Admin from './components/NextQueueDetail'
import Home from "./components/Home";
import Profile from "./components/Profile";

import StorePage from "./components/StorePage"
import Footer from './components/Footer';
import './footer.css';

import CheckQueuePage from './components/CheckQueuePage'

import ManageStore from './components/ManageStore';


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import CreateBusiness from './components/CreateBusiness';


import LoginPageAdmin from './components/LoginPageAdmin';
import LoginPageManager from './components/LoginPageManager';
import LoginPageEmployee from './components/LoginPageEmployee';
import ListEmployees from './components/ListEmployees'
import ShowQueuePage from './components/ShowQueuePage'
import BookQueueMain from './components/BookQueueMain';

import ChangePassword from './components/ChangePassword';
import ManageTable from './components/TableManage'
import ManageField from './components/FieldManage'
import ManagePromotion from './components/PromoImgManage'
import CountDownPage from './components/CountDownPage'
import ManageQueueTable from './components/ManageQueueTable';


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
    const { showAdminBoard } = this.state;
    const user = this.props.user;
    console.log("showAdminBoard : ", showAdminBoard);
    console.log("user", user);
    return (
      <div >
        <div className="myapp">
          <Router history={history}>
            <NavigationBar />
            <div>
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route path="/store/:businessName/:branch" component={StorePage} />
                <Route path="/getqueue/:businessName/:branch" component={GetQueue} />
                <Route path="/bookqueue/:businessName/:branch" component={BookQueueMain} />
                <Route path="/queuePage/:businessName/:branch" component={ShowQueuePage} />
                <Route path="/check" component={CheckQueuePage} />
                <Route path="/cpw/:e" component={ChangePassword} />
                <Redirect exact from="/currentQueue/" to="/" />
                <Route path="/currentQueue/:businessName/:username" render={(props) => <CurrentQueue{...props} />} />
                <Route exact path="/profile"
                  render={(props) => user ?
                    <Profile {...props} /> : <Redirect to="/home" />
                  } component={Profile} />

                <Route path="/LoginPageAdmin" component={LoginPageAdmin} />
                <Route
                  path="/CreateBusiness"
                  render={() => (user && user.roles.includes("ROLE_ADMIN")) ?
                    <CreateBusiness /> : <Redirect to="/LoginPageAdmin" />
                  } />

                <Route path="/LoginPageEmployee" component={LoginPageEmployee} />
                <Route
                  path="/queue/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_EMPLOYEE")) ?
                    <Admin {...props} /> : <Redirect to="/LoginPageEmployee" />
                  } />
                <Route
                  path="/queueList/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_EMPLOYEE")) ?
                    <ManageQueueTable {...props} /> : <Redirect to="/LoginPageEmployee" />
                  } />

                <Route path="/LoginPageManager" component={LoginPageManager} />
                <Route
                  path="/ManageStore"
                  render={(props) => (user && user.roles.includes("ROLE_MODERATOR")) ?
                    <ManageStore {...props} /> : <Redirect to="/LoginPageManager" />
                  } />
                <Route
                  path="/listEmployee/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_MODERATOR")) ?
                    <ListEmployees {...props} /> : <Redirect to="/LoginPageManager" />
                  } />

                <Route
                  path="/manageTable/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_MODERATOR")) ?
                    <ManageTable {...props} /> : <Redirect to="/LoginPageManager" />
                  } />

                <Route
                  path="/manageField/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_MODERATOR")) ?
                    <ManageField {...props} /> : <Redirect to="/LoginPageManager" />
                  } />

                <Route
                  path="/managePromotion/:businessName/:branch"
                  render={(props) => (user && user.roles.includes("ROLE_MODERATOR")) ?
                    <ManagePromotion {...props} /> : <Redirect to="/LoginPageManager" />
                  } />

                <Route component={Home} />
                <Route path="/CountDownPage" component={CountDownPage} />
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