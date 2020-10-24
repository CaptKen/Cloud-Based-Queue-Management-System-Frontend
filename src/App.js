import React, { Component } from 'react';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import GetInQueue from "./components/GetInQueue";
import NavBar from './components/NavBar';
import CurrentQueue from './components/CurrentQueue';
import Admin from './components/Admin'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {apiResponse:""};
  // }
  // callAPI(){
  //   fetch("http://localhost:9000/testAPI")
  //   .then(res => res.text())
  //   .then(res => this.setState({apiResponse: res}));
  // }

  // componentWillMount(){
  //   this.callAPI();
  // }
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signUp" component={SignUpPage} />
          <Route path="/getQueue" component={GetInQueue} />
          <Route path="/currentQueue" component={CurrentQueue} />
          <Route path="/adminPage" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;