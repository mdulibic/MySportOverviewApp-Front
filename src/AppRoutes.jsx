import React from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";

function AppRoutes() {
    return (<Router>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/home" element={<HomePage/>}/>
        </Routes>
    </Router>);
}

export default AppRoutes;
