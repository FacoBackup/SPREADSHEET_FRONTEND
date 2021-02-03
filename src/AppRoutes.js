import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from "./pages/signup/Signup";
import Group from "./pages/group/Group"
import Search from "./pages/search/Search";
import SignIn from "./pages/signin/SignIn"
import Profile from "./pages/profile/Profile"

function AppRoutes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/profile/:userID" exact component={Profile}/>
                    <Route path="/community/:id" exact component={Group}/>
                    <Route path="/search_user" exact component={Search}/>
                    <Route path="/" exact component={SignIn}/>
                    <Route path="/authenticate" exact component={SignIn}/>
                    <Route path="/creation" exact component={SignUp}/>
                </Switch>
            </Router>
        </div>
    );
}

export default AppRoutes;
