import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';


class Footer extends Component {
    constructor(props){
        super(props)
    }

    
    render() {
        return (
            <div class="container-fluid pb-0 mb-0 justify-content-center text-light ">
     <footer>
         <div class="row my-5 justify-content-center py-5">
             <div class="col-11">
                 <div class="row ">
                     <div class="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                         <h3 class="text-muted mb-md-0 mb-5 bold-text">KQQ</h3>
                         <p>(Kill QueQ)</p>
                     </div>
                     <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                         <h6 class="mb-3 mb-lg-4 bold-text "><b>MENU</b></h6>
                         <ul class="list-unstyled">
                            
                             <li><Link to="/home">Home</Link></li>
                             <li><Link to="#/about">About</Link></li>
                             <li>Blog</li>
                             <li>Portfolio</li>
                         </ul>
                     </div>
                     <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                         <h6 class="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ADDRESS</b></h6>
                         <p class="mb-1"> IT KMITL</p>
                     </div>
                 </div>
                 <div class="row ">
                     <div class="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                         <p class="social text-muted mb-0 pb-0 bold-text"> <span class="mx-2"><i class="fa fa-facebook" aria-hidden="true"></i></span> <span class="mx-2"><i class="fa fa-linkedin-square" aria-hidden="true"></i></span> <span class="mx-2"><i class="fa fa-twitter" aria-hidden="true"></i></span> <span class="mx-2"><i class="fa fa-instagram" aria-hidden="true"></i></span> </p><small class="rights"><span>&#174;</span> Km[it]l.</small>
                     </div>
                     <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                         <h6 class="mt-55 mt-2 text-muted bold-text"><b>ศุภมิตร บัวศรีแก้ว</b></h6><small> <span><i class="fa fa-envelope" aria-hidden="true"></i></span> 60070100@it.kmitl.ac.th</small>
                     </div>
                     <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                         <h6 class="text-muted bold-text"><b>ไอศูรย์ ทิมศรี</b></h6><small><span><i class="fa fa-envelope" aria-hidden="true"></i></span> 60070121@it.kmitl.ac.th</small>
                     </div>
                 </div>
             </div>
         </div>
     </footer>
 </div>
        );
    }
}

export default Footer;