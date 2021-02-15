import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/message";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { loginAdmin } from "../actions/auth";
import SignUpPage from "./SignUpPage"
import { getRoles } from "@testing-library/react";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        กรุณากรอกข้อมูล!
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
      show: false,
      showLogin: true,
      showLogout: false,
      showAdminBoard: false
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
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
    });

  };

  showRegister = () => {
    this.setState({
      showLogin: !this.state.showLogin
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


  handleLogin(e) {
    e.preventDefault();


    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(loginAdmin(this.state.username, this.state.password))
        .then(() => {
          history.push("/CreateBusiness");
          window.location.reload();
          // history.push("/CreateBusiness");
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
    const { isLoggedIn, message, showAdminBoard } = this.props;
    if (showAdminBoard) {
      return <Redirect to="/CreateBusiness" />;
    }

    return (
      <div>
        {this.state.showLogin ? (
          <div>

            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h3>Sign In Admin</h3>
              <div className="form-group">
                <label htmlFor="username">ชื่อผู้ใช้งาน*</label>
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
                <label htmlFor="password">รหัสผ่าน*</label>
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
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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



            {/* <h5 className="text-right">No Account ? <Link to={"/register"}>
                        Sign Up
                      </Link></h5> */}
            {/* <Button style={{backgroundColor: "#255", float:"right"}} onClick={this.showRegister}>
                  สมัครสมาชิก
              </Button> */}
          </div>
        ) : true}

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);