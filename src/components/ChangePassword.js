import React, { Component } from 'react';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authService from "../services/auth.service";
import { Redirect } from 'react-router-dom';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import sha1 from 'crypto-js/sha1';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        กรุณากรอกข้อมูล!
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

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.vCheckPassword = this.vCheckPassword.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      password: "",
      email: "",
      checkPassword: "",
      checkNewpass: '',
      complete: false,
      passwordObj: {
        oldPassword: '',
        newPassword: '',
      }
    };

  }

  // onChangeOldPassword = (e) => {
  //     this.setState({
  //         passwordObj: {
  //             oldPassword: e.target.value,
  //             newPassword: this.state.passwordObj.newPassword
  //         }
  //     });
  // }
  componentDidMount() {
    const email = (this.props.match.params.e).toString();
    this.setState({
      email: email
    })
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

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      console.log("no err");
      authService.changeByForgetPassword(this.state.email, this.state.passwordObj.newPassword)
        .then((res) => {
          console.log("res: ", res.data.res);
          this.setState({
            showChangePW: false,
            complete: true
          })
          alert(res.data.res)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  render() {
    const e = this.props.match.params.e
    console.log("e param : ", e);
    if (this.state.complete) {
      return (<Redirect to="/home" />)
    }
    return (
      <div className="container" style={{ background: "#f9f9f9", borderRadius: "15px", boxShadow: "1px 1px #E8E8E8", padding: "5%", maxWidth: 'fit-content' }}>
        <h1 className="h3 mb-3">กรุณาตั้งรหัสผ่านใหม่</h1>
        <Form className="form"
          onSubmit={this.handleChangePass}
          ref={(c) => {
            this.form = c;
          }}>

          <div >
            {/* <label className="col-6 form-label" style={{ textAlignLast: 'right'}}><strong>รหัสผ่านเใหม่*</strong></label> */}
            <strong className="form-label form-inline" style={{ textAlignLast: 'right' }}>รหัสผ่านใหม่<p style={{ color: "red" }}>*</p></strong>
            <Input
              type="password"
              className="form-control ml-3"
              name="newPassword"
              placeholder="รหัสผ่านใหม่"
              tabIndex="2"
              required
              onChange={this.onChangeNewPassword}
              style={{ marginBottom: "10px", minWidth: "100%" }}
              validations={[required, vpassword]}
            />
          </div>

          <div >
            {/* <label className="col-6 form-label" style={{ textAlignLast: 'right' }}><strong>ยืนยันรหัสผ่านเใหม่*</strong></label> */}
            <strong className="form-inline" style={{ textAlignLast: 'right' }}>ยืนยันรหัสผ่านใหม่<p style={{ color: "red" }}>*</p></strong>
            <Input
              type="password"
              className="form-control ml-3"
              name="newPassword"
              placeholder="ยืนยันรหัสผ่านใหม่"
              tabIndex="3"
              required
              onChange={this.onChangeVNewPassword}
              style={{ marginBottom: "10px", minWidth: "100%" }}
              validations={[required, this.vCheckPassword]}
            />
          </div>
          <div>
            <button
              style={{ margin: "10px", width: "100%" }}
              className={"btn btn- btn-success md"}
              onClick={this.handleChangePass}
              ref={(c) => {
                this.checkBtn = c;
              }}
            >เปลี่ยนรหัสผ่าน
                  </button>

          </div>
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>

    )
  }
}

export default ChangePassword;