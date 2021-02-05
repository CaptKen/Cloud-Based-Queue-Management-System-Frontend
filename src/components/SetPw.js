import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import Input from "react-validation/build/input";
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

class SetPW extends Component {
    constructor(props) {
        super(props);
        this.vCheckPassword = this.vCheckPassword.bind(this);
        this.state = {
            confirming: true,
            userName: '',
            password: '',
            checkPassword: ''
        }

    }

    // componentDidMount = () => {
    //     
    //     this.setState({
    //         userName: username
    //     })
    //     // fetch(`${API_URL}/email/confirm/${id}`)
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         this.setState({ confirming: false })
    //     //         notify.show(data.msg)
    //     //     })
    //     //     .catch(err => console.log(err))
    // }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
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

    render() {
        const { username } = this.props.match.params.username;
        return (
            <>
                <h1 className="h1">Set your Password</h1>
                <form>
                    <p>Your username : {username}</p>
                    <input type="password" />
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
                </form>
            </>
        )
    }
}

export default SetPW;