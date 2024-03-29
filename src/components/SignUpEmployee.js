import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { registerEmployee } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { Container } from "react-bootstrap";


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

const vusername = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        ชื่อผู้ใช้งานต้องมีความยาวระหว่าง 8 ถึง 20 ตัวอักษร.
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


const vtelephone = (value) => {
  if (value.length != 10 && !Number.isInteger(value) && !(value > 0)) {
    return (
      <div className="alert alert-danger" role="alert">
        เบอร์โทรศัพท์ไม่ถูกต้อง !
      </div>
    );
  }
};

const vbranch = (value) => {
  if (value.length != 10 && !Number.isInteger(value) && !(value > 0)) {
    return (
      <div className="alert alert-danger" role="alert">
        เบอร์โทรศัพท์ไม่ถูกต้อง !
      </div>
    );
  }
};


class SignUpEmployee extends Component {
  constructor(props) {
    super(props);
    const { user: currentUser } = this.props;
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCheckPassword = this.onChangeCheckPassword.bind(this);
    this.vCheckPassword = this.vCheckPassword.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      checkPassword: "",
      telephone: "",
      businessName: '',
      branch: '',
      successful: false,
    };

    console.log(this.state);
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      
    // console.log(user.businessName);
      this.setState({
        currentUser: user,
        isManager: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        businessName: user.businessName,
        branch: user.branch
      });

    }
    // this.callAPI();
    // console.log("row: ", this.state.rows)
    // console.log("apiResponse data: ", this.state.apiResponse);
  }

  vCheckPassword = (value) => {
    console.log("value: ", value);
    if (value != this.state.password) {
      return (
        <div className="alert alert-danger" role="alert">
          รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน
        </div>
      );
    }
  }; 

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeCheckPassword(e) {
    this.setState({
      checkPassword: e.target.value,
    });
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value,
    });
  }



  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          registerEmployee(this.state.username, this.state.email, this.state.password, this.state.telephone, this.state.businessName, this.state.branch)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
        window.location.reload();
      console.log(this.state);
    }
  }

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

  render() {
    const { message } = this.props;
    // const { isManager } = this.s
    // if (!isManager) {
    //   return (<Redirect to="/loginPageManager" />);
    // }
    return (
      <>
        <Container className="d-flex" style={{ justifyContent: "center", fontFamily: "'Kanit', sans-serif;" }}>
          <div className="col-md-5">

            <div>

              {/* <h5 className="text-right">Already has account ? <Link to={"/login"}>
                    Sign in
                  </Link></h5> */}
            </div>
          </div>
        </Container>


        <button className="btn btn-outline-primary btn-sm" onClick={this.handleShow}>
          เพิ่มพนักงาน
      </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <h1 className="h1 text-center">เพิ่มข้อมูลพนักงาน</h1>
            {/* <h1 className="text-center">เข้าสู่ระบบ</h1> */}
          </Modal.Header>
          <Modal.Body>
              <div>

                <Form
                  onSubmit={this.handleRegister}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">ชื่อผู้ใช้งาน*</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required, vusername]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">อีเมลล์*</label>
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
                        <label htmlFor="password">รหัสผ่าน*</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="checkPassword">ยืนยันรหัสผ่าน*</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="checkPassword"
                          value={this.state.checkPassword}
                          onChange={this.onChangeCheckPassword}
                          validations={[required, this.vCheckPassword]}

                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="telephone">เบอร์โทรศัพท์</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="telephone"
                          value={this.state.telephone}
                          onChange={this.onChangeTelephone}
                          validations={[vtelephone]}
                          maxLength={10}
                        />
                      </div>


                      <div className="form-group">
                        <button className="btn btn-primary btn-block" style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d" }} >เพิ่มพนักงาน</button>
                      </div>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                      <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>

              </div>

          </Modal.Body>
          {/* <Modal.Footer>
            <p className="text-right" >
              {this.state.showLogin ? "ต้องการสร้างบัญชีใหม่ ?" : ""}
            </p>
            <Button style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d", float: "right" }} onClick={this.showRegister}>
              {this.state.showLogin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { user } = state.auth;
  return {
    message,
    user
  };
}

export default connect(mapStateToProps)(SignUpEmployee);