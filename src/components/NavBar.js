// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
// import { Modal, Button } from "react-bootstrap";
// import Login from "./LoginPage";
// import { logout } from "../actions/auth";
// import SignUpPage from "./SignUpPage"

// class NavBar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             menu: false,
//             showModeratorBoard: false,
//             showAdminBoard: true,
//             showCustomerTab: false,
//             currentUser: undefined,
//             show:false,
//             showLogin: true,
//             showLogout: false
//         };
//         this.toggleMenu = this.toggleMenu.bind(this);
//         this.logOut = this.logOut.bind(this);
//     }
//     logOut() {
//       this.props.dispatch(logout());
//     }

//     // toggleMenu() {
//     //     this.setState({ menu: !this.state.menu })
//     // }
//     handleShow = () => {
//         console.log("show");
//         this.setState({
//           show: true,
//           showLogin : true
//         });
//       };
    
//       handleClose = (e) => {
//         this.setState({
//           show: false,
//         });
        
//       };

//       showRegister = () => {
//         this.setState({
//             showLogin: !this.state.showLogin
//           });
//       }
    
//       toggleMenu() {
//         this.setState({ menu: !this.state.menu })
//     }
//     render() {
//         const show = (this.state.menu) ? "show" : "";
//         const { currentUser, showModeratorBoard, showAdminBoard , showCustomerTab} = this.state;
//         return (
//             <div>
//                 <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//             <Link to={"/"} className="navbar-brand">
//               QMS
//             </Link>
            
            
//             <div className={"collapse navbar-collapse " + show} >
//             <div className="navbar-nav mr-auto">
//               {/* <li className="nav-item">
//                 <Link to={"/home"} className="nav-link">
//                   Home
//                 </Link>
//               </li> */}

//               {/* <li className="nav-item">
//                 <Link to={"/admin2"} className="nav-link">
//                   Admin
//                 </Link>
//               </li> */}

//               {showCustomerTab && (
//                   <li className="nav-item">
//                 <Link to={"/getQueue"} className="nav-link">
//                 getQueue
//                 </Link>
//               </li>
//               )}

//               {showCustomerTab && (
//                   <li className="nav-item">
//                   <Link to={"/currentQueue"} className="nav-link">
//                   currentQueue
//                   </Link>
//                 </li>
//               )}

//               {showModeratorBoard && (
//                 <li className="nav-item">
//                   <Link to={"/mod"} className="nav-link">
//                     Moderator Board
//                   </Link>
//                 </li>
//               )}

//               {showAdminBoard && (
//                 <li className="nav-item">
//                   <Link to={"/admin"} className="nav-link">
//                     Queue Management
//                   </Link>
//                 </li>
//               )}

//               {currentUser && (
//                 <li className="nav-item">
//                   <Link to={"/user"} className="nav-link">
//                     User
//                   </Link>
//                 </li>
//               )}
//             </div>
//             </div>

//             {currentUser ? (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/profile"} className="nav-link">
//                     {currentUser.username}
//                   </Link>
//                 </li>
//               </div>
//             ) : (
//               <div className="navbar-nav ml-auto">
//                 {/* <li className="nav-item">
//                   <Link to={"/login"} className="nav-link">
//                     login
//                   </Link>
//                 </li> */}

//                 <li className="nav-item">
//                 <Button variant="primary" onClick={this.handleShow}>
//                 <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />
//               Login
//             </Button>
//             <Modal show={this.state.show} onHide={this.handleClose}>
//             <Modal.Header closeButton>
//             <h1 style={{textAlign: "center"}}>
//             {this.state.showLogin ? "Login":"Register"}
//             </h1>
//             </Modal.Header>
//             <Modal.Body>
//                 {this.state.showLogin ? <Login/>:<SignUpPage/>}
//             </Modal.Body>
//             <Modal.Footer>
//               <p className="text-right" >
//               {this.state.showLogin ? "No Account ?":""}  
//               </p>
//               <Button variant="primary" onClick={this.showRegister}>
//               {this.state.showLogin ? "Sign Up":"Login"}
//               </Button>
//             </Modal.Footer>
//           </Modal>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/login" className="nav-link" onClick={this.logOut}>
//                     LogOut
//                   </a>
//                 </li>
//               </div>
//             )}
//           </nav>
//             </div>
            
//         )
//     }
// }

// export default NavBar;

import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from "react-redux";

import { logout } from "../actions/auth";
import  SideNav  from './SideBar';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

class NavigationBar extends Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showLogin: true,
      show:false,
      showLogout: false,
      menu: false
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

  logOut() {
    this.props.dispatch(logout());
    console.log("logout");
  }
  handleShow = () => {
    console.log("show");
    this.setState({
      show: true,
      showLogin : true
    });
  };

  handleClose = (e) => {
    this.setState({
      show: false,
      showLogout : false
    });
    
  };

  showRegister = () => {
    this.setState({
        showLogin: !this.state.showLogin
      });
  }

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu })
  }
  showLogout = () => {
  this.setState({
    showLogout : true
  });
  };

  render(){
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return(
      <Styles>
        <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor: '#9FFFCB'}} onClick={this.toggleMenu}/>
          <Navbar.Brand href="/">QMS</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav.Link href="/getqueue">เข้าคิว/ต่อคิว</Nav.Link> */}
          {showAdminBoard ? (
                <SideNav/>
              ):(<Nav.Link href="/getqueue">เข้าคิว/ต่อคิว</Nav.Link>)
              }
          
          
          {showModeratorBoard && (
                <Nav.Link href="/mod">Moderator Board</Nav.Link>
              )}

              {/* {showAdminBoard && (
                <Nav.Link href="/admin">Admin Board</Nav.Link>
              )} */}

              {currentUser && (
                <Nav.Link href="/user">User Board</Nav.Link>
              )}
            
            <Nav className="ml-auto">
              {currentUser ? (
                <span>
                  <Nav.Item><Nav.Link href="/profile">{currentUser.username}</Nav.Link></Nav.Item>
                </span>
                ):(
                  <div>
                    <Nav.Item><Nav.Link href="/login">login</Nav.Link></Nav.Item> 
                  </div>
                )
              }

              {currentUser ? (
                <Nav.Item><Nav.Link href="/" onClick={this.logOut}>logout</Nav.Link></Nav.Item>
              ):(
                <Nav.Item><Nav.Link href="/register">register</Nav.Link></Nav.Item>
              )}

              
            </Nav>
          </Navbar.Collapse>
          
          
          {/* <Form className="form-center">
            <FormControl type="text" placeholder="Search" className="" />
          </Form> */}
        </Navbar>
      </Styles>
    )
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(NavigationBar);

