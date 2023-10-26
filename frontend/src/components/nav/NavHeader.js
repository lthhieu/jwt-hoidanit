import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { Link, NavLink, useLocation } from "react-router-dom"
import { UserContext } from '../../context/UserContext';
import logo from '../../logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOut } from '../../services/userService'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
const NavHeader = () => {
    let { user, logoutContext } = useContext(UserContext)
    let location = useLocation()
    let history = useHistory()
    const handleLogout = async () => {
        let response = await logOut() // clear cookies
        if (+response?.ec === 0) {
            localStorage.removeItem("access_token") // clear local storage
            logoutContext() // clear contextApi
            toast.success("Logout successfully")
            history.push('/login')
        } else {
            toast.error(response?.em)
        }
    }
    if (user?.auth || location.pathname === '/') {
        return (
            // <div className="topnav">
            //     <NavLink to="/dashboard">Dashboard</NavLink>
            //     <NavLink to="/project">Project</NavLink>
            // </div>
            <div className='custom-nav'>
                <Navbar expand="lg" bg="custom-nav" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <span className='custom-text fw-bold'>React</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link" to="/" exact>Home</NavLink>
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                                <NavLink className="nav-link" to="/role">Role</NavLink>
                                <NavLink className="nav-link" to="/group-role">Group Role</NavLink>
                                <NavLink className="nav-link" to="/project">Project</NavLink>

                            </Nav>
                            <Nav>
                                {user?.auth ? <> <Nav.Link href="#">Welcome {user?.account?.username}</Nav.Link>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <span onClick={() => { handleLogout() }}>Log Out</span>
                                        </NavDropdown.Item>
                                    </NavDropdown></> : <><Link className="nav-link" to='/login'>Login</Link></>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    } else {
        return (<></>)
    }
};

export default NavHeader;