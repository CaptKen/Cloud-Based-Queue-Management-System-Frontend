// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';


// import { logout } from "../actions/auth";
// import SignUpPage from "./SignUpPage"
// import Login from "./LoginPage";
// import { Modal, Button } from "react-bootstrap";

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
import { Nav, Navbar, Form, FormControl, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from "react-redux";
import SignUpPage from "./SignUpPage"
import Login from "./LoginPage";

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
  

  render(){
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return(
      <Styles>
        <Navbar expand="lg" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor: '#9FFFCB'}} onClick={this.toggleMenu}/>
          <Navbar.Brand href="/">QMS</Navbar.Brand>
          
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            
          {showAdminBoard ? (
                <SideNav/>
              ):(<Nav.Item><Nav.Link href="/">หน้าหลัก</Nav.Link></Nav.Item>)}
              {showAdminBoard ? (
                <div></div>
              ):(<Nav.Item><Nav.Link href="/currentQueue">เช็คคิว</Nav.Link></Nav.Item>)}
          
          
          {showModeratorBoard && (
                <Nav.Link href="/mod">Moderator Board</Nav.Link>
              )}

              {/* {showAdminBoard && (
                <Nav.Link href="/admin">Admin Board</Nav.Link>
              )} */}

              {/* {currentUser && (
                <Nav.Link href="/user">User Board</Nav.Link>
              )} */}
            
            
              

              {/* {currentUser && (
                <Nav.Item><Nav.Link href="/" onClick={this.logOut}>logout</Nav.Link></Nav.Item>
              )} */}
              
              {/* {currentUser ? (
                <Nav.Item><Nav.Link href="/" onClick={this.logOut}>logout</Nav.Link></Nav.Item>
              ):(
                <Nav.Item><Nav.Link href="/register">register</Nav.Link></Nav.Item>
                
                // <Nav.Item>
                //     <SignUpPage/>
                //     </Nav.Item>
              )} */}

              
            </Nav>
          </Navbar.Collapse>
          {currentUser ? (
                <div>
                  {/* <Nav.Item><Nav.Link href="/profile">{currentUser.username}</Nav.Link></Nav.Item> */}
                    <NavDropdown title={currentUser.username} id="nav-dropdown">
                      <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/" onClick={this.logOut}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
                ):(
                  <div>
                    <Login/>
                    {/* <Nav.Item><Nav.Link href="/login">เข้าสู่ระบบ</Nav.Link></Nav.Item> */}
                    {/* <Nav.Item><Nav.Link onClick={this.handleShow}>เข้าสู่ระบบ</Nav.Link></Nav.Item>  */}
                  </div>
                )
              }
          
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


// res ปุ่ม login หลุดไปใน ตอนย่อ

