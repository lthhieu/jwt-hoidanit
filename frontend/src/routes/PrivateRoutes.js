import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom"
const PrivateRoutes = (props) => {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push("/login")
        }
    }, [])
    return (
        <div>
            <Route path={props.path} component={props.component} />
        </div>
    );
};

export default PrivateRoutes;