import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import FieldManage from './FieldManage';
import businessService from '../services/business.service';
import TableManage from './TableManage';
import BusinessDetailManager from './BusinessDetailManage';
import ConstraintManage from './ConstraintManage';
import PromoImgManage from './PromoImgManage';
import IconChange from './IconChange'
import { Redirect } from 'react-router-dom';


class ManageStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: [],
      businessName: '',
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      // fileInfos: {}
    };
  }

  // callAPI = () => {
  //     businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
  //         res => {
  //           console.log("apiResponse" + res.data.BusinessDetail[0].fixedField);
  //             this.setState({
  //                 apiResponse: res.data.BusinessDetail[0],
  //             })
  //         }
  //     )
  // }

  // getImageIcon() {
  //   businessService.getIconImg()
  //     .then((res) => {
  //       console.log(res.data[0]);
  //     })
  // }


  componentDidMount() {
    // this.callAPI();
    const user = this.props.user;
    console.log(user.businessName);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        businessName: user.businessName
      });
      businessService.getIconImg(user.businessName)
        .then((res) => {
          console.log(res.data[0]);
          this.setState({
            fileInfos: res.data[0]
          })
        })
    }
  }
  render() {
    const { currentUser, businessName, showModeratorBoard } = this.state;
    console.log("currentUser.businessName: ", currentUser, businessName);
    // if(!showModeratorBoard){
    //   return <Redirect to="/" />;
    // }
    return (
      <Container>
        <h1 className="h1">Manage Store</h1>
        {/* <div>
          <img
            className="img-responsive"
            src={this.state.fileInfos.url}
            alt={this.state.fileInfos.name + "'s icon"}
            style={{
              height: "200px", width: "200px", display: "block",
              marginLeft: "auto", marginRight: "auto"
            }}
          />
        </div> */}

        <IconChange/>
        <FieldManage />
        <TableManage />
        <BusinessDetailManager />
        <ConstraintManage />
        <PromoImgManage />
        <div style={{ marginLeft: `43%`, padding: '20px' }}>
          <button
            className={"btn btn-danger btn-lg"}
          >
            ย้อนกลับ
                </button>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(ManageStore);
