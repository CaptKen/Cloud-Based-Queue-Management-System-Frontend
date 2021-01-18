import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import FieldManage from './FieldManage';


class ManageStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };
    }

    // callAPI = () => {
    //     userService.allQueueOfBusiness("BurinLKB").then(
    //         res => {
    //             this.setState({
    //                 apiResponse: res.data
    //             })
    //         }
    //     )
    // }

  
    componentDidMount() {
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
            <Container>
               <h1>Manage Store</h1>
               <FieldManage />
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
  