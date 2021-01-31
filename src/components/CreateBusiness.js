import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { registerManager } from "../actions/auth";
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




class CreateBusiness extends Component {
  
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangebranch = this.onChangebranch.bind(this);
    this.onChangebusinessName = this.onChangebusinessName.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      businessName:"",
      branch:"",
      successful: false,
    };
  }

  componentDidMount() {
    this.onChangePassword();
  }
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
  
  onChangebusinessName(e) {
    this.setState({
      businessName: e.target.value,
    });
  }

  onChangebranch(e) {
    this.setState({
        branch: e.target.value,
    });
  }

  onChangePassword(){
    const generator = require('generate-password');
    const passwordAutoGen = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true
    });
    this.setState({
      password: passwordAutoGen,
    });
    console.log(this.state.password);
  }

  handleRegister(e) {
    this.onChangePassword();
    e.preventDefault();
    this.setState({
      successful: false,
    });
    this.form.validateAll();
    console.log(this.state.password);

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
            registerManager(this.state.username, this.state.email, this.state.password, this.state.businessName, this.state.branch)
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
    }
  }

  render() {
    const { message } = this.props;

    return (
        <Container className="d-flex" style={{justifyContent:"center", fontFamily:"'Kanit', sans-serif;"}}>
            
            <div className="col-md-5">
        {/* <h1 className="text-center">Sign Up</h1> */}
        <h1 className="h1 text-center">Create Business</h1>
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
                    validations={[required]}
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

                {/* <div className="form-group">
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
                </div> */}

                <div className="form-group">
                  <label htmlFor="businessName">ชื่อร้าน</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="businessName"
                    value={this.state.businessName}
                    onChange={this.onChangebusinessName}
                    validations={[required]}
                    maxLength={10}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="branch">สาขา</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="branch"
                    value={this.state.branch}
                    onChange={this.onChangebranch}
                    validations={[required]}
                    maxLength={10}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" style={{backgroundColor: "#b38f2d", borderColor:"#b38f2d"}} >สร้างร้าน</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
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
          {/* <h5 className="text-right">Already has account ? <Link to={"/login"}>
                    Sign in
                  </Link></h5> */}
        </div>
      </div>
        </Container>
      
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(CreateBusiness);