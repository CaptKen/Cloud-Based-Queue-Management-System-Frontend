import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/message";
import { Link } from 'react-router-dom';

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
      apiResponse: [],
      onFocus: false
    };
  }

  componentDidMount() {
    businessService.listAllBusiness().then(
      res => {
        console.log("apiResponse: " + res.data.listByBusiness);
        this.setState({
          apiResponse: res.data.listByBusiness,
        })
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
      show: false,
    });
  }
  //อาจจะต้องทำ dto แบบตอนเอา book_time
  render() {
    return (
      <>
        <div className="mr-2">
          <div className="row justify-content-center searchInput" id="searchInput" style={{position: "absolute", width:"100%" , zIndex: "9", left: "0", right:"0" }}>
            <div className="form-inline col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2 justify-content-center">
              <input type="text" className="form-control mr-2 " id="seachKeyword" name="seachKeyword" placeholder="กรอกชื่อร้านที่ต้องการค้นหา" onChange={this.onChangeKeyword} style={{ width: "350px" }} />
              <i class="fas fa-search"></i>
              {/* <Button className="btn btn-primary" onClick={this.handleShow}><i class="fas fa-search"></i>  ค้นหาร้านค้า </Button> */}

            </div>
            <div className="p-3 searchResult" id="searchResult" style={{ width: "400px", height: "auto", maxHeight: "300px", overflowY: "scroll", backgroundColor: "white", borderRadius: "5px", visibility:(this.state.keyword === "" ? "hidden": "visible")}}>
              {(this.state.apiResponse.filter((data) => {
                  if (this.state.keyword == "")
                    return data
                  else if (data.name.toLowerCase().includes(this.state.keyword.toLowerCase())) {
                    return data
                  }
                })).length === 0 ? "ไม่พบผลลัพธ์.." :
                (this.state.apiResponse.filter((data) => {
                  if (this.state.keyword == "")
                    return data
                  else if (data.name.toLowerCase().includes(this.state.keyword.toLowerCase())) {
                    return data
                  }
                })).map((item) => (
                  <>
                    <Link to={"/store/" + item.name + "/" + item.branch} style={{ width: "100%", height: "100%", textDecoration: "none", color: "inherit" }} onClick={this.handleClose}>
                      <p className="h4" id="businessList">{item.name}</p>
                    </Link>

                  </>
                ))}

            </div>

          </div>

        </div>


        <Modal show={this.state.show} onHide={this.handleClose} centered size="lg">
          <Modal.Header closeButton style={{ height: "75px" }}>
            <div className="form-group">
              <input type="text" className="form-control mb-0" id="seachKeyword" name="seachKeyword" placeholder="กรอกชื่อร้านที่ต้องการค้นหา" onChange={this.onChangeKeyword} style={{ width: "350px" }} />
            </div>
          </Modal.Header>
          <Modal.Body >
            <div className="text-left" style={{ height: "300px", overflowY: "scroll" }}>
              {this.state.apiResponse === [] ? "ไม่พบผลลัพธ์" :
                (this.state.apiResponse.filter((data) => {
                  if (this.state.keyword == "")
                    return data
                  else if (data.name.toLowerCase().includes(this.state.keyword.toLowerCase())) {
                    return data
                  }
                })).map((item) => (
                  <>
                    <Link to={"/store/" + item.name + "/" + item.branch} style={{ width: "100%", height: "100%", textDecoration: "none", color: "inherit" }} onClick={this.handleClose}>
                      <p className="h3" id="businessList">{item.name}</p>
                    </Link>

                  </>
                ))}

            </div>
          </Modal.Body>
        </Modal>

      </>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(SeachBar);

