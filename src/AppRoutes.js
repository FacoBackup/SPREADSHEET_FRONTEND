import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Extensions from './pages/extensions/Extensions'
import Group from "./pages/group/Group"
import Search from "./pages/search/Search";
import SignIn from "./pages/authentication/SignIn"
import Profile from "./pages/profile/Profile"
import Branch from './pages/branch/Branch';
import Repository from './pages/repository/Repository'

function AppRoutes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={'/repository/:id'} exact component={Repository}/>
                    <Route path={'/branch/{:branch_name}/:id'} exact component={Branch}/>
                    <Route path={"/"} exact component={Profile}/>
                    <Route path="/profile/:userID" exact component={Profile}/>
                    <Route path="/group/:id" exact component={Group}/>
                    <Route path={"/extensions"} exact component={Extensions}/>
                    <Route path="/search/{:input}/:asUser" exact component={Search}/>
                    <Route path="/authenticate" exact component={SignIn}/>
                </Switch>
            </Router>
        </div>
    );
}

export default AppRoutes;
