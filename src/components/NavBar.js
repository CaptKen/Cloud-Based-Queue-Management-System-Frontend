import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }
    render() {
        const show = (this.state.menu) ? "show" : "";
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <li className="navbar-brand"><Link to="/">HOME</Link></li>
                <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/getQueue">เข้า/ต่อคิว</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/currentQueue">คิวปัจจุบัน</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/adminPage">Admin page</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;