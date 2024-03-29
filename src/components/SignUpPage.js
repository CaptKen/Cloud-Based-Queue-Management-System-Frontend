// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class SignUpPage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             formElements: {
//                 username: {
//                     type: 'text',
//                     value: '',
//                     validator: {
//                         minLength: 8
//                     },
//                     touched: false,
//                     error: {
//                         status: true,
//                         message: ''
//                     }
//                 },
//                 tel: {
//                     type: 'tel',
//                     value: '',
//                     validator: {
//                         type: 'tel',
//                         length: 10
//                     },
//                     touched: false,
//                     error: {
//                         status: true,
//                         message: ''
//                     }
//                 },
//                 email: {
//                     type: 'email',
//                     value: '',
//                     validator: {
//                         pattern: 'email'
//                     },
//                     touched: false,
//                     error: {
//                         status: true,
//                         message: ''
//                     }
//                 },
//                 password: {
//                     type: 'password',
//                     value: '',
//                     validator: {
//                         minLength: 8
//                     },
//                     touched: false,
//                     error: {
//                         status: true,
//                         message: ''
//                     }
//                 },
//                 formValid: false
//             }
//         }
//     }

//     onFormChange = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;

//         let updateForm = { ...this.state.formElements };
//         updateForm[name].value = value;
//         updateForm[name].touched = true;

//         const validatorObject = this.checkValidator(value, updateForm[name].validator);
//         updateForm[name].error = {
//             status: validatorObject.status,
//             message: validatorObject.message
//         }
//         let formStatus = true;
//         this.setState({
//             ...this.state,
//             formElements: updateForm,
//             formValid: formStatus
//         })

//     }

//     checkValidator = (value, rule) => {
//         let valid = true;
//         let message = '';

//         // console.log(value.length);

//         if (rule.type === 'tel' && isNaN(value)) {
//             valid = false;
//         }
//         if (value.length < rule.minLength) {
//             valid = false;
//             message = 'น้อยกว่า ${rule.minLength} ตัวอักษร';
//         }

//         if (value.length > rule.maxLength) {
//             valid = false;
//             message = 'มากกว่า ${rule.maxLength} หลัก';
//         }

//         // if (value.length != rule.length) {
//         //     valid = false;
//         // }

//         if (rule.pattern === 'email') {
//             if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
//                 valid = false;
//                 message = 'กรอกอีเมลไม่ถูกต้อง'
//             }
//         }
//         if (value.length === 0) {
//             valid = false;
//         }
//         return { status: !valid, message: message }
//     }

//     getInputClass = (name) => {
//         const elementErrorStatus = this.state.formElements[name].error.status;
//         if (!this.state.formElements[name].touched) {
//             return 'form-control'
//         }
//         return elementErrorStatus && this.state.formElements[name].touched ? 'form-control is-invalid' : 'form-control is-valid';
//     }

//     getErrorMessage = (name) => {
//         return this.state.formElements[name].error.message;
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         const formData = {};
//         for (let name in this.state.formElements) {
//             if (name === 'formValid') {
//                 console.log("formValidformValidformValid");
//                 continue;
//             }
//             formData[name] = this.state.formElements[name].value;
//         }
//         console.log(formData);
//     }
//     render() {
//         return (
//             <div className="row">
//                 <div className="col-sm-3 mt5">

//                 </div>
//                 <div className="col-sm-6 mt-5 card">
//                     <div className="card-body ml-3 mr-3 mt-5 mb-1">
//                         <form onSubmit={this.onSubmitForm}>
//                             <h3 className="text-center">Sign Up</h3>
//                             <div className="form-group">
//                                 <label htmlFor="username">Username</label>
//                                 <input type="text" className={this.getInputClass('username')} name="username" id="username" required onChange={this.onFormChange} />
//                                 <div className="invalid-feedback">กรอกชื่อผู้ใช้อย่างน้อย 8 ตัวอักษร</div>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="tel">Phone Number</label>
//                                 <input type="tel" className={this.getInputClass('tel')} name="tel" id="tel" maxLength="10" required onChange={this.onFormChange} />
//                                 <div className="invalid-feedback">กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</div>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email">Email</label>
//                                 <input type="email" className={this.getInputClass('email')} name="email" id="email" required onChange={this.onFormChange} />
//                                 <div className="invalid-feedback">กรุณากรอกอีเมลให้ถูกต้อง</div>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <input type="password" className={this.getInputClass('password')} name="password" id="password" required onChange={this.onFormChange} />
//                                 <div className="invalid-feedback">กรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร</div>
//                             </div>
//                             <div className="text-center">
//                                 <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign Up</button>
//                             </div>
//                             <p className="text-right">Already have an account ? <Link to="/">Sign In</Link></p>
//                         </form>
//                     </div>
//                 </div>
//                 <div className="col-sm-3 mt-5"></div>
//             </div>
//         );
//     }
// }

// export default SignUpPage;

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../actions/auth";


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


class SignUpPage extends Component {
  constructor(props) {
    super(props);
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
      successful: false,
    };
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
          register(this.state.username, this.state.email, this.state.password, this.state.telephone)
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
      <div className="col-md-12">
        {/* <h1 className="text-center">Sign Up</h1> */}
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
                  <button className="btn btn-primary btn-block" style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d" }} >สมัครสมาชิก</button>
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
          {/* <h5 className="text-right">Already has account ? <Link to={"/login"}>
                    Sign in
                  </Link></h5> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(SignUpPage);