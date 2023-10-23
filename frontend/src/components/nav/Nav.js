import React, { useEffect, useState } from 'react';
import './Nav.scss'
import { NavLink } from "react-router-dom"
const Nav = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setShow(true)
        }
    }, [])
    return (
        <>{show && <div className="topnav">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/project">Project</NavLink>
        </div>}
        </>
    );
};

export default Nav;