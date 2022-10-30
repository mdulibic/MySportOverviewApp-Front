import React from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CommentsPage from "./pages/CommentsPage";

function AppRoutes() {
    return (<Router>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/home" element={<HomePage/>}/>
            <Route exact path="/comments" element={<CommentsPage/>}/>
        </Routes>
    </Router>);
}

export default AppRoutes;
