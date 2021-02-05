import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Group from "./pages/group/Group"
import Search from "./pages/search/Search";
import SignIn from "./pages/signin/SignIn"
import Profile from "./pages/profile/Profile"

function AppRoutes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Profile}/>
                    <Route path="/profile/:userID" exact component={Profile}/>
                    <Route path="/group/:id" exact component={Group}/>
                    <Route path="/search_user" exact component={Search}/>
                    <Route path="/authenticate" exact component={SignIn}/>
                </Switch>
            </Router>
        </div>
    );
}

export default AppRoutes;