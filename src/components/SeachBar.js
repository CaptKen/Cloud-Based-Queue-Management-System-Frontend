import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/message";

import { connect } from "react-redux";
import { login } from "../actions/auth";
import SignUpPage from "./SignUpPage"
import businessService from '../services/business.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        กรุณากรอกข้อมูล!
      </div>
    );
  }
};

class SeachBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeKeyword = this.onChangeKeyword.bind(this);

    this.state = {
        keyword: "",
      loading: false,
      show: false,
      apiResponse: []
    };
  }

  componentDidMount(){
    businessService.listAllBusiness().then(
        res => {
          console.log("apiResponse: " + res.data);
        //   this.setState({
        //     apiResponse: res.data.listByBusiness,
        //   })
        }
      )
  }

  handleShow = () => {
    console.log("show");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      show: true
    });
  };

  handleClose = (e) => {
    this.setState({
      show: false,
    });

  };

//   toggleMenu() {
//     this.setState({ menu: !this.state.menu })
//   }

onChangeKeyword(e) {
    this.setState({
      keyword: e.target.value,
    });
  }


  handleSearch(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
    //   dispatch(login(this.state.username, this.state.password))
    //     .then(() => {
    //       window.location.reload();
    //       history.push("/profile");
    //     })
    //     .catch(() => {
    //       this.setState({
    //         loading: false
    //       });
    //     });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
//อาจจะต้องทำ dto แบบตอนเอา book_time
  render() {
    return (
      <>
      <div className="mr-2">
        <div className="row">
            <div className="form-inline col-xs-12 col-sm-12 col-md-12 col-lg-12">
                
                <Button className="btn btn-primary" onClick={this.handleShow}><i class="fas fa-search"></i>  ค้นหาร้านค้า </Button>
                  
            </div>
            </div>
      </div>
        
      
        <Modal show={this.state.show} onHide={this.handleClose} centered  size="lg">
          <Modal.Header closeButton style={{height:"75px"}}> 
            <div className="form-group">
                    <input type="text" className="form-control mb-0" id="seachKeyword" name="seachKeyword" placeholder="กรอกชื่อร้านที่ต้องการค้นหา" onChange={this.onChangeKeyword} style={{width: "350px"}}/>
                </div>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
                {this.state.keyword === "" ? "ไม่พบผลลัพธ์" : this.state.keyword}
                {/* {this.state.apiResponse} */}
            </div>
          </Modal.Body>
        </Modal>

      </>
    );
  }
}

function mapStateToProps(state) {

  }
export default connect(mapStateToProps)(SeachBar);

