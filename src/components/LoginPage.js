// import React, { Component } from 'react';
// import { Link, Redirect } from "react-router-dom";
// import axios from 'axios';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import { connect } from "react-redux";
// import { login } from "../actions/auth";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// class LoginPage extends Component {
//   constructor(props) {
//     super(props)
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.state = {
//       username: '',
//       password: '',
//       loading: false
//     }
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       loading: true,
//     });

//     this.form.validateAll();

//     const { dispatch, history } = this.props;

//     if (this.checkBtn.context._errors.length === 0) {
//       dispatch(login(this.state.username, this.state.password))
//         .then(() => {
//           history.push("/profile");
//           window.location.reload();
//         })
//         .catch(() => {
//           this.setState({
//             loading: false
//           });
//         });
//     } else {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { isLoggedIn, message } = this.props;
//     if (isLoggedIn) {
//       return <Redirect to="/profile" />;
//     }

//     return (
//       <div className="col-6 mt-5 mx-auto card">
//         <div className="card-body">
//           <form  onSubmit={this.handleLogin}
//             ref={(c) => {
//               this.form = c;
//             }}>
//             <h3 className="text-center">Sign In</h3>

//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>
//             <div className="Frorm-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>

//             {message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={(c) => {
//                 this.checkBtn = c;
//               }}
//             />
//             <p className="text-right">
//               No Account <Link to="/signUp">Sign Up?</Link>
//             </p>
//           </form>

//         </div>

//       </div>
//     )
//   }
// }
// function mapStateToProps(state) {
//   const { isLoggedIn } = state.auth;
//   const { message } = state.message;
//   return {
//     isLoggedIn,
//     message
//   };
// }
// export default connect(mapStateToProps)(LoginPage);

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { login } from "../actions/auth";
import SignUpPage from "./SignUpPage"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      show:false,
      showLogin: true,
      showLogout: false
    };
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

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          window.location.reload();
          history.push("/profile");
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    // if (isLoggedIn) {
    //   return <Redirect to="/profile" />;
    // }

    return (
      <div>
        
        <Button style={{backgroundColor: "#3D9280"}} onClick={this.handleShow}>
            Login
      </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        <h1 style={{textAlign: "center"}}>
        {this.state.showLogin ? "เข้าสู่ระบบ":"สมัครสมาชิก"}
        </h1>
        {/* <h1 className="text-center">เข้าสู่ระบบ</h1> */}
        </Modal.Header>
        <Modal.Body>
            {this.state.showLogin ? (
              <div>

              <Form
                onSubmit={this.handleLogin}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </div>
    
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                    style={{backgroundColor: "#255"}}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>เข้าสู่ระบบ</span>
                  </button>
                </div>
    
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none",
                 }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
              {/* <h5 className="text-right">No Account ? <Link to={"/register"}>
                        Sign Up
                      </Link></h5> */}
              {/* <Button style={{backgroundColor: "#255", float:"right"}} onClick={this.showRegister}>
                  สมัครสมาชิก
              </Button> */}
            </div>
            ):<SignUpPage/>}
            
        </Modal.Body>
        <Modal.Footer>
          <p className="text-right" >
          {this.state.showLogin ? "No Account ?":"Already has account ?"}  
          </p>
          <Button style={{backgroundColor: "#255", float:"right"}} onClick={this.showRegister}>
          {this.state.showLogin ? "สมัครสมาชิก":"เข้าสู่ระบบ"}
              </Button>
        </Modal.Footer>
      </Modal>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);

