import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import GetQueueHeader from './GetQueueHeader';
import GetInQueue from './GetInQueue';
import GetInQueueWithLogin from './GetInQueueWithLogin';

class GetQueue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

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
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { currentUser } = this.state;
    return (
      <Container>
        <GetQueueHeader storeName={storeName} branch={branch} />
        {currentUser ? (
          <div>
            <GetInQueueWithLogin business_name={storeName} currentUser={currentUser} />
          </div>
        ) : (
            <div>
              <GetInQueue storeName={storeName} branch={branch} />
            </div>
          )}

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

export default connect(mapStateToProps)(GetQueue);
