import React from 'react';
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Dashboard from "../components/dashboard/Dashboard";
import Home from '../components/home/Home';
import {
    Switch,
    Route
} from "react-router-dom"
import PrivateRoutes from './PrivateRoutes';
const AppRoutes = () => {
    const Project = () => {
        return (<>project</>)
    }
    return (
        <div>
            <Switch>
                <PrivateRoutes path="/dashboard" component={Dashboard} />
                <PrivateRoutes path="/project" component={Project} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </div>
    );
};

export default AppRoutes;