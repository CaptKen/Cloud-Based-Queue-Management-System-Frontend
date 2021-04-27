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
import { clearMessage, setMessage } from "../actions/message";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { login, forgetpass } from "../actions/auth";
import SignUpPage from "./SignUpPage"
import authService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        กรุณากรอกข้อมูล!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        อีเมลไม่ถูกต้อง!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        รหัสผ่านต้องมีความยาวระหว่าง 6 ถึง 40 ตัวอักษร
      </div>
    );
  }
};

// const vOTP = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         รหัสผ่านต้องมีความยาวระหว่าง 6 ถึง 40 ตัวอักษร
//       </div>
//     );
//   }
// };

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.showForgetPassword = this.showForgetPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleForgetPassword = this.handleForgetPassword.bind(this);
    this.vCheckPassword = this.vCheckPassword.bind(this);
    this.getOTP = this.getOTP.bind(this);
    this.onChangecheckOTP = this.onChangecheckOTP.bind(this);
    this.state = {
      username: "",
      password: "",
      email: "",
      loading: false,
      show: false,
      showLogin: true,
      showLogout: false,
      showForgetPassword: false,
      showSetNewPasswordForm: false,
      otp: "",
      checkOTP: "",
      changePassSuccess: false
    };
  }

  vOTP = (value) => {
    console.log("value : ", value);
    console.log(this.state.otp);
    if (value !== this.state.otp) {
      return (
        <div className="alert alert-danger" role="alert">
          otp ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง
        </div>
      );
    }
  };

  handleShow = () => {
    console.log("show");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      show: true,
      showLogin: true
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
    this.props.dispatch(clearMessage()); // clear message when changing location
  }

  showForgetPassword = () => {
    this.getOTP();
    this.setState({
      showForgetPassword: !this.state.showForgetPassword,
      changePassSuccess: false
    });
    this.props.dispatch(clearMessage()); // clear message when changing location
  }

  closeForgetPassword = () => {
    this.setState({
      showSetNewPasswordForm: false,
      showForgetPassword: false,
      changePassSuccess: false
    });
    this.props.dispatch(clearMessage()); // clear message when changing location
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

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  getOTP() {
    const generator = require('generate-password');
    const passwordAutoGen = generator.generate({
      length: 6,
      numbers: true,
      lowercase: true,
      uppercase: true
    });
    this.setState({
      otp: passwordAutoGen,
    });
  }

  onChangeNewPassword = (e) => {
    console.log(e.target.value);
    this.setState({
      newpass: e.target.value,
      passwordObj: {
        // oldPassword: this.state.passwordObj.oldPassword,
        newPassword: e.target.value
      }
    });
  }

  onChangecheckOTP = (e) => {
    console.log(e.target.value);
    this.setState({
      checkOTP: e.target.value
    });
  }

  onChangeVNewPassword = (e) => {
    console.log(e.target.value);
    this.setState({
      checkNewpass: e.target.value,
    });
  }

  vCheckPassword = (value) => {
    // console.log("value: ", value);
    if (value != this.state.passwordObj.newPassword) {
      return (
        <div className="alert alert-danger" role="alert">
          รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน
        </div>
      );
    }
  };

  handleChangePass = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.dispatch(clearMessage());
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      console.log("no err");
      authService.changeByForgetPassword(this.state.email, this.state.passwordObj.newPassword)
        .then((res) => {
          console.log("res: ", res.data.res);
          this.setState({
            showSetNewPasswordForm: false,
            showForgetPassword: false,
            changePassSuccess: true,
          });
          this.props.dispatch(setMessage(res.data.res));
          // alert(res.data.res)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(clearMessage());
    this.setState({
      loading: true,
      changePassSuccess: false
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

  handleForgetPassword(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      console.log("this.state.email : ", this.state.email, " this.state.otp : ", this.state.otp);
      dispatch(forgetpass(this.state.email, this.state.otp))
        .then(() => {
          this.setState({
            loading: false,
            showForgetPassword: false,
            showSetNewPasswordForm: true
          });
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
        <Button style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d" }} onClick={this.handleShow}>
          เข้าสู่ระบบ
      </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h1 style={{ textAlign: "center" }}>
              {this.state.showLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </h1>
            {/* <h1 className="text-center">เข้าสู่ระบบ</h1> */}
          </Modal.Header>
          <Modal.Body>
            {this.state.showLogin ? (
              this.state.showForgetPassword ? (
                <>
                  <Form
                    onSubmit={this.handleForgetPassword}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="email" className="form-inline">กรุณากรอกอีเมลล์ที่ลงทะเบียนไว้กับระบบ<p style={{ color: "red" }}>*</p></label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-block"
                        disabled={this.state.loading}
                        style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d", color: "white" }}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>ยืนยัน</span>
                      </button>
                    </div>

                    {message && (
                      <div className="form-group">
                        <div className="alert alert-warning" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{
                        display: "none",
                      }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                  <Button style={{ float: "right", padding: "0", borderWidth: "0" }} variant="link" onClick={this.showForgetPassword}>เข้าสู่ระบบ</Button>
                </>
              ) : (this.state.showSetNewPasswordForm ? (
                <>
                  <div>
                    <h1 className="h3 mb-3">ตั้งรหัสผ่านใหม่</h1>
                    <p></p>
                    <Form className="form"
                      onSubmit={this.handleChangePass}
                      ref={(c) => {
                        this.form = c;
                      }}>

                      <div className="form-group" >
                        {/* <label className="col-6 form-label" style={{ textAlignLast: 'right'}}><strong>รหัสผ่านเใหม่*</strong></label> */}
                        <label htmlFor="newPassword" className="form-inline">กรอก OTP ที่ได้รับทางอีเมลล์<p style={{ color: "red" }}>*</p></label>
                        <Input
                          type="text"
                          className="form-control"
                          name="checkOTP"
                          placeholder="OTP ที่ได้รับ"
                          tabIndex="1"
                          required
                          onChange={this.onChangecheckOTP}
                          validations={[required, this.vOTP]}
                        />
                      </div>

                      <div className="form-group" >
                        {/* <label className="col-6 form-label" style={{ textAlignLast: 'right'}}><strong>รหัสผ่านเใหม่*</strong></label> */}
                        <label htmlFor="newPassword" className="form-inline">รหัสผ่านใหม่<p style={{ color: "red" }}>*</p></label>
                        <Input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          placeholder="รหัสผ่านใหม่"
                          tabIndex="2"
                          required
                          onChange={this.onChangeNewPassword}
                          validations={[required, vpassword]}
                        />
                      </div>

                      <div className="form-group">
                        {/* <label className="col-6 form-label" style={{ textAlignLast: 'right' }}><strong>ยืนยันรหัสผ่านเใหม่*</strong></label> */}
                        <label htmlFor="newVPassword" className="form-inline">ยืนยันรหัสผ่านใหม่<p style={{ color: "red" }}>*</p></label>
                        <Input
                          type="password"
                          className="form-control"
                          name="newVPassword"
                          placeholder="ยืนยันรหัสผ่านใหม่"
                          tabIndex="3"
                          required
                          onChange={this.onChangeVNewPassword}
                          validations={[required, this.vCheckPassword]}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          className="btn btn-block"
                          disabled={this.state.loading}
                          style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d", color: "white" }}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>เปลี่ยนรหัสผ่าน</span>
                        </button>
                      </div>
                      {/* <div>
                        
                        <button
                          style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d" }}
                          className={"btn btn- btn-success md"}
                          onClick={this.handleChangePass}
                          ref={(c) => {
                            this.checkBtn = c;
                          }}
                        >เปลี่ยนรหัสผ่าน
                  </button>

                      </div> */}
                      <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                      />
                    </Form>
                    <Button style={{ float: "right", padding: "0", borderWidth: "0" }} variant="link" onClick={this.closeForgetPassword}>เข้าสู่ระบบ</Button>
                  </div>
                </>
              ) : (
                <div>
                  <Form
                    onSubmit={this.handleLogin}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="username" className="form-inline">ชื่อผู้ใช้งาน<p style={{ color: "red" }}>*</p></label>
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
                      <label htmlFor="password" className="form-inline">รหัสผ่าน<p style={{ color: "red" }}>*</p></label>
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
                        className="btn btn-block"
                        disabled={this.state.loading}
                        style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d", color: "white" }}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>เข้าสู่ระบบ</span>
                      </button>
                    </div>

                    {message && (
                      this.state.changePassSuccess ? (
                        <div className="form-group">
                          <div className="alert alert-success" role="alert">
                            {message}
                          </div>
                        </div>
                      ) : (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                      )
                    )}
                    <CheckButton
                      style={{
                        display: "none",
                      }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                  <Button style={{ float: "right", padding: "0", borderWidth: "0" }} variant="link" onClick={this.showForgetPassword}>ลืมรหัสผ่าน ?</Button>
                  {/* <h5 className="text-right">No Account ? <Link to={"/register"}>
                        Sign Up
                      </Link></h5> */}
                  {/* <Button style={{backgroundColor: "#255", float:"right"}} onClick={this.showRegister}>
                  สมัครสมาชิก
              </Button> */}
                </div>
              )

              )

            ) : <SignUpPage />}

          </Modal.Body>
          <Modal.Footer>
            <p className="text-right" >
              {this.state.showLogin ? "ต้องการสร้างบัญชีใหม่ ?" : ""}
            </p>
            <Button style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d", float: "right" }} onClick={this.showRegister}>
              {this.state.showLogin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
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

