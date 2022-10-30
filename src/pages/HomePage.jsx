import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {pageStyle} from "../style/globalStyles";
import {Box, Tabs, Tab, LinearProgress, Alert, Paper, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {tableStyle} from "../style/globalStyles";

const homepageStyle = {
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    background: "linear-gradient(30deg, #54428E, #FF6587)",
    position: "relative",
};


function HomePage() {
    const api = process.env.REACT_APP_API_URL;
    const [teams, setTeams] = useState([]);
    const [rounds, setRounds] = useState([]);
    const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();

    const navigate = useNavigate();

    const roundsGenerator = (round) => {
        return (<div>
            <h3 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>{round.name}</h3>
            <Button
                style={{margin: "0.3rem", backgroundColor: "#FF6587"}}
                onClick={() => navigate("/comments", {state: {round: round}})}
                variant="contained"
            >
                Comments
            </Button>
            {round.results.length !== 0 ? (<Table striped bordered hover size="sm" style={tableStyle}>
                <thead style={{backgroundColor: "#54428E", color: "#FFFFFF"}}>
                <tr>
                    <th>#</th>
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Team 1 goals</th>
                    <th>Team 2 goals</th>
                </tr>
                </thead>
                <tbody style={{backgroundColor: "#FFFFFF"}}>
                {round.results.map((val, key) => {
                    return (<tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.team1}</td>
                        <td>{val.team2}</td>
                        <td>{val.team1Goals}</td>
                        <td>{val.team2Goals}</td>
                    </tr>)
                })}
                </tbody>
            </Table>) : (<div></div>)}
            {round.timetables.length !== 0 ? (<Table striped bordered hover size="sm" style={tableStyle}>
                <thead style={{backgroundColor: "#54428E", color: "#FFFFFF"}}>
                <tr>
                    <th>#</th>
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Time and date</th>
                </tr>
                </thead>
                <tbody style={{backgroundColor: "#FFFFFF"}}>
                {round.timetables.map((val, key) => {
                    return (<tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.team1}</td>
                        <td>{val.team2}</td>
                        <td>{val.timeAndDate}</td>
                    </tr>)
                })}
                </tbody>
            </Table>) : (<div></div>)}
        </div>);
    };

    const {logout} = useAuth0();

    useEffect(() => {
        fetch(api + "/teams", {
            method: "GET", headers: {
                Origin: origin
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                setTeams(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [api]);

    useEffect(() => {
        fetch(api + "/leagueRound", {
            method: "GET", headers: {
                Origin: origin
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                setRounds(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [api]);


    return (<Box sx={{width: "100%"}}>
        <div style={{...pageStyle, ...homepageStyle, overflow: "scroll", paddingBottom: "20px"}}>
            <div style={{display: "flex", backgroundColor: "#54428E", justifyContent: "space-between"}}>

                <h1 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>MySportOverview</h1>

                {isAuthenticated ? (<div style={{display: "flow", backgroundColor: "#54428E"}}>
                    <h3 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}> Current user: {user.name}</h3>
                    <Button
                        style={{margin: "0.3rem", backgroundColor: "#FF6587"}}
                        onClick={() => logout({returnTo: window.location.origin})}
                        variant="contained">
                        Log out
                    </Button>
                </div>) : (<div style={{display: "flex", backgroundColor: "#54428E"}}>
                    <Button
                        style={{margin: "0.3rem", backgroundColor: "#FF6587"}}
                        onClick={() => loginWithRedirect()}
                        variant="contained">
                        Login
                    </Button>
                </div>)}
            </div>

            <h1 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>Leaderboard</h1>

            <Table striped bordered hover size="sm" style={tableStyle}>
                <thead style={{backgroundColor: "#54428E", color: "#FFFFFF"}}>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Points</th>
                    <th>Goals</th>
                </tr>
                </thead>
                <tbody style={{backgroundColor: "#FFFFFF"}}>
                {teams.sort((opt1, opt2) => opt2.points - opt1.points).map((val, key) => {
                    return (<tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.points}</td>
                        <td>{val.goals}</td>
                    </tr>)
                })}
                </tbody>
            </Table>

            <h1 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>Results and timetable</h1>

            {rounds.map((val, key) => {
                return roundsGenerator(val)
            })}
        </div>
    </Box>);
}

export default HomePage;
