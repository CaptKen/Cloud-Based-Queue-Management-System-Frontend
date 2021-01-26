import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import FieldManage from './FieldManage';
import businessService from '../services/business.service';
import TableManage from './TableManage';
import BusinessDetailManager from './BusinessDetailManage';
import ConstraintManage from './ConstraintManage';
import PromoImgManage from './PromoImgManage';


class ManageStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          apiResponse:[],
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };
    }

    // callAPI = () => {
    //     businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
    //         res => {
    //           console.log("apiResponse" + res.data.BusinessDetail[0].fixedField);
    //             this.setState({
    //                 apiResponse: res.data.BusinessDetail[0].fixedField
    //             })
    //         }
    //     )
    // }

  
    componentDidMount() {
      // this.callAPI();
      const user = this.props.user;
  
      if (user) {
        this.setState({
          currentUser: user,
          showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        });
      }
    }
    render() {
        const { currentUser} = this.state;
        return (
            <Container >
              <h1 className="h1">Manage Store</h1>
               <FieldManage/>
               <TableManage/>
               <BusinessDetailManager/>
               <ConstraintManage/>
               <PromoImgManage/>
               <div style={{marginLeft:`43%`, padding:'20px'}}>
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
  