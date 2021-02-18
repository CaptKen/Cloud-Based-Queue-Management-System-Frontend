import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import ChangePassword from "./ChangePassword";
import authService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal, Button } from "react-bootstrap";

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


class DetailEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
    this.vCheckPassword = this.vCheckPassword.bind(this);
    this.state = {
      // apiResponse: [],
      username: "",
      email: "",
      password: "",
      checkPassword: "",
      telephone: "",
      businessName: '',
      listEmployees: [],
      show: false,
      branch: '',
      checkNewpass: '',
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showChangePW: false,
      // rows: [{}],
      editMode: {
        status: false
      },
      updateForm: {},
      passwordObj: {
        oldPassword: '',
        newPassword: '',
      }
    };
  }

  componentDidMount() {
    console.log("name!!!!!!!!!!!!!!!", this.props.name)
    const { user } = this.props;
    authService.getProfile(user.username)
      .then((res) => {
        console.log(res);
        this.setState({
          currentUser: user,
          updateForm: {
            username: res.data.userprofile[0].username,
            email: res.data.userprofile[0].email,
            telephone: (res.data.userprofile[0].telephone == null ? "-" : res.data.userprofile[0].telephone),
          },
        })
      })

  }

  onChangeUsername(e) {
    // this.setState({
    //   username: e.target.value,
    // });
  }

  addDataToList(name, email, telephone) {
    this.setState(
      {
        listEmployees: name, email, telephone
      }
    )

  }
  onChangeTelephone(e) {
    this.setState({
      updateForm: {
        username: this.state.updateForm.username,
        email: this.state.updateForm.email,
        telephone: e.target.value,
      },
    });
  }

  onChangeEmail(e) {
    this.setState({
      updateForm: {
        username: this.state.updateForm.username,
        email: e.target.value,
        telephone: this.state.updateForm.telephone,
      },
    });
  }

  handleEdit = () => {
    this.setState({
      showChangePW: false,
      editMode: {
        status: true,
      }
    });
  };

  handleSaveEdit = () => {
    console.log(this.state.currentUser);
    console.log(this.state.updateForm);
    // const test = [this.state.currentUser]
    // console.log(test);
    authService.updateProfile(this.state.updateForm.username, this.state.updateForm)
      .then((res) => {
        console.log(res);
        alert(res.data)
        this.setState({
          editMode: {
            status: false,
          }
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }

  cancelEdit = () => {
    this.setState({
      showChangePW: false,
      editMode: {
        status: false,
      }
    });
  }

  showChangpPW = () => {
    this.setState({
      showChangePW: true,
      editMode: {
        status: false,
      }
    })
  }

  onChangeOldPassword = (e) => {
    this.setState({
      passwordObj: {
        oldPassword: e.target.value,
        newPassword: this.state.passwordObj.newPassword
      }
    });
  }

  onChangeNewPassword = (e) => {
    console.log(e.target.value);
    this.setState({
      newpass: e.target.value,
      passwordObj: {
        oldPassword: this.state.passwordObj.oldPassword,
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

  handleClose = (e) => {
    this.setState({
      show: false,
    });

  };

  handleChangePass = (e) => {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      console.log("no err");
      authService.changePassword(this.state.updateForm.username, this.state.passwordObj)
        .then((res) => {
          console.log("res: ", res.data.res);
          this.setState({
            showChangePW: false,
            editMode: {
              status: false
            }
          })
          alert(res.data.res)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  render() {

    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <Modal show={this.props.itemEmployee.id} onHide={this.handleClose}>
        <Modal.Header closeButton>
        <h1 className="h1 text-center">ข้อมูลพนักงาน</h1>
          {/* <h1 className="text-center">เข้าสู่ระบบ</h1> */}
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {/* <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header> */}
            <form className="form">
              {/* <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
              {/* <p>
          <strong>Id:</strong> {currentUser.id}
        </p> */}


              <div>
                
                <div className="form-inline">
                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>ชื่อผู้ใช้งาน:</strong>
                  {this.state.editMode.status ? (
                    <div>
                      <input
                        type="text"
                        name="username"
                        onChange={this.onChangeUsername}
                        className="form-control col-6"
                        style={{ minWidth: '300px' }}
                        disabled
                      />
                    </div>
                  ) : (
                      <p>
                        {/* {currentUser.username} */}
                        {this.props.itemEmployee.username}

                      </p>
                    )}
                </div>

                <div className="form-inline">
                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>อีเมลล์:</strong>
                  {this.state.editMode.status ? (
                    <div>
                      <input
                        type="text"
                        name="email"
                        value={this.state.updateForm.email}
                        onChange={this.onChangeEmail}
                        className="form-control col-6"
                        style={{ minWidth: '300px' }}
                      />
                    </div>
                  ) : (
                      <p>
                        {/* {currentUser.email} */}
                        {this.props.itemEmployee.email}
                      </p>
                    )}
                </div>

                <div className="form-inline">
                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>เบอร์โทรศัพท์:</strong>
                  {this.state.editMode.status ? (
                    <div>
                      <input
                        type="text"
                        name="telephone"
                        value={this.state.updateForm.telephone}
                        onChange={this.onChangeTelephone}
                        className="form-control col-6"
                        style={{ minWidth: '300px' }}
                      />
                    </div>
                  ) : (
                      <p>
                        {/* {currentUser.telephone} */}
                        {this.props.itemEmployee.telephone}
                      </p>
                    )}
                </div>
              </div>

              {/* <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}

            </form>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className={"btn btn-danger btn-lg"}>
            ย้อนกลับ
                </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(DetailEmployee);
