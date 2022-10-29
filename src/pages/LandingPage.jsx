import React from "react";

import {useNavigate} from 'react-router-dom';

import {Button} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import {useAuth0} from "@auth0/auth0-react";

import "../index.css";
import sport from "../assets/sport.png";
import {IsMobile} from "../util/utils";
import {pageStyle} from "../style/globalStyles";

function LandingPage() {
    const {loginWithRedirect} = useAuth0();
    const homepageStyle = {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
        background: "linear-gradient(45deg, #54428E, #FF6587)",
        position: "relative",
    };

    const homepageHeaderStyle = IsMobile() ? {
        width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
    } : {
        width: "95%", display: "flex", alignItems: "start", justifyContent: "space-between", margin: "1rem",
    };

    const imageStyle = {
        animation: "rotation 20s infinite linear", position: "relative", bottom: "-15%", pointerEvents: "none",
    };

    const titleStyle = {
        fontSize: "5rem", color: "#FFFFFF", margin: 0,
    };

    const navigate = useNavigate();

    return (<div style={{...pageStyle, ...homepageStyle}}>
        <div style={homepageHeaderStyle}>
            <h1 style={titleStyle}>My Sport Overview</h1>
            <div
                style={IsMobile() ? {display: "flex", flexDirection: "column"} : {display: "flex"}}
            >
                <div style={{display: "flex", marginBottom: "0.5rem"}}>
                    <Button
                        style={{marginRight: "0.3rem"}}
                        onClick={() => loginWithRedirect()}
                        variant="contained">
                        Login
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        navigate("/home");
                    }}
                    endIcon={<ExploreIcon/>}
                    variant="contained"
                    color="secondary"
                    style={IsMobile() ? {marginBottom: "0.5rem"} : {marginBottom: "0.5rem", marginLeft: "0.3rem"}}
                >
                    Explore
                </Button>
            </div>
        </div>
        <img style={imageStyle} alt="sport" src={sport}/>
    </div>);
}

export default LandingPage;
