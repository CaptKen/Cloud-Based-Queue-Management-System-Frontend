import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formElements: {
                username: {
                    type: 'text',
                    value: '',
                    validator: {
                        minLength: 8
                    },
                    touched: false,
                    error: {
                        status: true,
                        message: ''
                    }
                },
                tel: {
                    type: 'tel',
                    value: '',
                    validator: {
                        type: 'tel',
                        length: 10
                    },
                    touched: false,
                    error: {
                        status: true,
                        message: ''
                    }
                },
                email: {
                    type: 'email',
                    value: '',
                    validator: {
                        pattern: 'email'
                    },
                    touched: false,
                    error: {
                        status: true,
                        message: ''
                    }
                },
                password: {
                    type: 'password',
                    value: '',
                    validator: {
                        minLength: 8
                    },
                    touched: false,
                    error: {
                        status: true,
                        message: ''
                    }
                },
                formValid: false
            }
        }
    }

    onFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let updateForm = { ...this.state.formElements };
        updateForm[name].value = value;
        updateForm[name].touched = true;

        const validatorObject = this.checkValidator(value, updateForm[name].validator);
        updateForm[name].error = {
            status: validatorObject.status,
            message: validatorObject.message
        }
        let formStatus = true;
        this.setState({
            ...this.state,
            formElements: updateForm,
            formValid: formStatus
        })

    }

    checkValidator = (value, rule) => {
        let valid = true;
        let message = '';

        // console.log(value.length);

        if (rule.type === 'tel' && isNaN(value)) {
            valid = false;
        }
        if (value.length < rule.minLength) {
            valid = false;
            message = 'น้อยกว่า ${rule.minLength} ตัวอักษร';
        }

        if (value.length > rule.maxLength) {
            valid = false;
            message = 'มากกว่า ${rule.maxLength} หลัก';
        }

        // if (value.length != rule.length) {
        //     valid = false;
        // }

        if (rule.pattern === 'email') {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
                valid = false;
                message = 'กรอกอีเมลไม่ถูกต้อง'
            }
        }
        if (value.length === 0) {
            valid = false;
        }
        return { status: !valid, message: message }
    }

    getInputClass = (name) => {
        const elementErrorStatus = this.state.formElements[name].error.status;
        if (!this.state.formElements[name].touched) {
            return 'form-control'
        }
        return elementErrorStatus && this.state.formElements[name].touched ? 'form-control is-invalid' : 'form-control is-valid';
    }

    getErrorMessage = (name) => {
        return this.state.formElements[name].error.message;
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const formData = {};
        for (let name in this.state.formElements) {
            if (name === 'formValid') {
                console.log("formValidformValidformValid");
                continue;
            }
            formData[name] = this.state.formElements[name].value;
        }
        console.log(formData);
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-3 mt5">

                </div>
                <div className="col-sm-6 mt-5 card">
                    <div className="card-body ml-3 mr-3 mt-5 mb-1">
                        <form onSubmit={this.onSubmitForm}>
                            <h3 className="text-center">Sign Up</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className={this.getInputClass('username')} name="username" id="username" required onChange={this.onFormChange} />
                                <div className="invalid-feedback">กรอกชื่อผู้ใช้อย่างน้อย 8 ตัวอักษร</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tel">Phone Number</label>
                                <input type="tel" className={this.getInputClass('tel')} name="tel" id="tel" maxLength="10" required onChange={this.onFormChange} />
                                <div className="invalid-feedback">กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className={this.getInputClass('email')} name="email" id="email" required onChange={this.onFormChange} />
                                <div className="invalid-feedback">กรุณากรอกอีเมลให้ถูกต้อง</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={this.getInputClass('password')} name="password" id="password" required onChange={this.onFormChange} />
                                <div className="invalid-feedback">กรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร</div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign Up</button>
                            </div>
                            <p className="text-right">Already have an account ? <Link to="/">Sign In</Link></p>
                        </form>
                    </div>
                </div>
                <div className="col-sm-3 mt-5"></div>
            </div>
        );
    }
}

export default SignUpPage;