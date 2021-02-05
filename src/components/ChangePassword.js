import React, { Component } from 'react';
import CheckButton from "react-validation/build/button";
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
            oldpass: '',
            newpass: '',
            checkNewpass: ''
        };
    }

    onChangeOldPassword = (e) => {
        this.setState({
            oldpass: e.target.value,
        });
    }

    onChangeNewPassword = (e) => {
        console.log(e.target.value);
        this.setState({
            newpass: e.target.value,
        });
    }

    onChangeVNewPassword = (e) => {
        console.log(e.target.value);
        this.setState({
            checkNewpass: e.target.value,
        });
    }

    vCheckPassword = (value) => {
        console.log("value: ", value);
        if (value != this.state.newpass) {
            return (
                <div className="alert alert-danger" role="alert">
                    รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน
                </div>
            );
        }
    };

    render() {
        return (
            <>
                <form className="form"
                    onSubmit={this.handleRegister}
                    ref={(c) => {
                        this.form = c;
                    }}>
                    <div className="form-inline">
                        <label className="col-3 form-label" style={{ justifyContent: "left" }}><strong>รหัสผ่านเก่า*</strong></label>
                        <input
                            type="text"
                            className=" col-4 form-control"
                            name="oldPassword"
                            placeholder="รหัสผ่านเเก่า"
                            tabIndex="1"
                            required
                            onChange={this.onChangeOldPassword}
                            style={{ marginBottom: "10px" }}
                        />
                    </div>

                    <div className="form-inline">
                        <label className="col-3 form-label" style={{ justifyContent: "left" }}><strong>รหัสผ่านเใหม่*</strong></label>
                        <input
                            type="text"
                            className=" col-4 form-control"
                            name="newPassword"
                            placeholder="รหัสผ่านเใหม่"
                            tabIndex="1"
                            required
                            onChange={this.onChangeNewPassword}
                            style={{ marginBottom: "10px" }}
                            validations={[required, vpassword]}
                        />
                    </div>

                    <div className="form-inline">
                        <label className="col-3 form-label" style={{ justifyContent: "left" }}><strong>ยืนยันรหัสผ่านเใหม่*</strong></label>
                        <input
                            type="text"
                            className=" col-4 form-control"
                            name="newPassword"
                            placeholder="ยืนยันรหัสผ่านเใหม่"
                            tabIndex="1"
                            required
                            onChange={this.onChangeVNewPassword}
                            style={{ marginBottom: "10px" }}
                            validations={[required, this.vCheckPassword]}
                        />
                    </div>
                    {/* <div className="text-center">
                        <button
                            style={{ margin: "10px" }}
                            className={"btn btn- btn-success md"}
                            onClick={this.handleEdit}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        >บันทึก
                        </button>
                        <button
                            style={{ margin: "10px" }}
                            className={"btn btn- btn-danger md"}
                            onClick={this.showChangpPW}
                        >ยกเลิก
                        </button>
                    </div> */}

                </form>
            </>

        )
    }
}

export default ChangePassword;