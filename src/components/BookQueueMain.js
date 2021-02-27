import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import GetQueueHeader from './GetQueueHeader';
import BookQueue from './BookQueue';
import GetInQueueWithLogin from './GetInQueueWithLogin';
import BookQueueWithLogin from './BookQueueWithLogin';
import businessService from '../services/business.service';

class BookQueueMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      fileInfo: ''
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

    businessService.getIconImg(this.props.match.params.businessName)
      .then((res) => {
        console.log(res.data[0]);
        this.setState({
          fileInfo: res.data[0]
        })
      })
  }
  render() {
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { currentUser } = this.state;
    return (
      <Container style={{ background: "#f9f9f9", borderRadius: "15px", boxShadow: "1px 1px #E8E8E8", padding: "5%"}}>
        {/* <GetQueueHeader storeName={storeName} branch={branch} /> */}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <img
              className="img-responsive h-auto w-auto"
              src={this.state.fileInfo.url}
              alt={this.state.fileInfo.name + "'s icon"}
              style={{
                height: "200px", width: "200px", display: "block",
                marginLeft: "auto", marginRight: "auto", marginBottom: "2%"
              }}
            />
            <div style={{ marginBottom: "5%" ,textAlignLast:"center"}}>

              <h1 style={{fontSize: "25px"}}>{storeName}</h1>
              <p>สาขา : {branch}</p>
            </div>
          </div>
        </div>
        {currentUser ? (
          <div>
            <BookQueueWithLogin storeName={storeName} branch={branch} currentUser={currentUser} />
          </div>
        ) : (
            <div>
              <BookQueue storeName={storeName} branch={branch} />
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

export default connect(mapStateToProps)(BookQueueMain);
