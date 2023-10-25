import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom"
import { UserContext } from '../context/UserContext';
const PrivateRoutes = (props) => {
    let { user } = useContext(UserContext)
    if (user?.auth) {
        return (<div>
            <Route path={props.path} component={props.component} />
        </div>)
    } else {
        return <Redirect to='/login'></Redirect>
    }
};

export default PrivateRoutes;