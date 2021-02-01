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
    const { currentUser } = this.state;
    return (
      <Container>
        <GetQueueHeader storeName="BurinLKB" waitingQueue={3} />
        {currentUser ? (
          <div>
            <GetInQueueWithLogin business_name="BurinLKB" currentUser={currentUser} />
          </div>
        ) : (
            <div>
              <GetInQueue business_name="BurinLKB" />
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
