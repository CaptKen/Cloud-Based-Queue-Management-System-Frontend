import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="col-6 mt-5 mx-auto card">
        <div className="card-body">
          <form onSubmit={this.onSubmitHandle}>
            <h3 className="text-center">Sign In</h3>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="username" onChange={this.onChange} />
            </div>
            <div className="Frorm-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={this.onChange} />
            </div>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-primary my-1">Login</button>
            </div>
            <p className="text-right">
              No Account <Link to="/signUp">Sign Up?</Link>
            </p>
          </form>

        </div>

      </div>
    )
  }
}

export default LoginPage;

