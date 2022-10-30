import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {tableStyle} from "../style/globalStyles";
import {pageStyle} from "../style/globalStyles";
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, LinearProgress, TextField} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

const CommentsPage = ({route}) => {
    const api = process.env.REACT_APP_API_URL;
    const origin = process.env.REACT_APP_URL;
    const location = useLocation();
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [round, setRound] = React.useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchRound = () => {
        fetch(api + `/leagueRound/${location.state.round.id}`, {
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
                console.log(data)
                setLoading(false);
                setRound(data);
            })
            .catch((err) => {
                console.log("This is a error" + err);
            });
    }

    useEffect(() => {
        fetchRound()
    }, [api]);

    const addComment = (id, message) => {
        fetch(api + `/comments/add/`, {
            method: "POST",
            headers: {
                Origin: origin, "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roundId: id,
                name: user.name,
                message: message
            }, null, 2),
        }).then((r) => {
            r.json()
            navigate("/home");
        });
    };

    const deleteComment = (id) => {
        fetch(api + `/comments/delete/${id}`, {
            method: "DELETE", headers: {
                Origin: origin,
            }
        }).then((r) => {
            r.json()
            navigate("/home");
        });
    };


    const commentPageStyle = {
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
        background: "linear-gradient(30deg, #54428E, #FF6587)",
        position: "relative",
    };

    return (<div style={{...pageStyle, ...commentPageStyle, overflow: "scroll", paddingBottom: "20px"}}>
            <h1 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>Comments</h1>
            {loading ? (<LinearProgress style={{marginTop: "1rem"}}/>) : (<div>
                {location.state.round.comments.length !== 0 ? (
                    <Table striped bordered hover size="sm" style={tableStyle}>
                        <thead style={{backgroundColor: "#54428E", color: "#FFFFFF"}}>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Comment</th>
                            <th>Timestamp</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody style={{backgroundColor: "#FFFFFF"}}>
                        {location.state.round.comments.map((val, key) => {
                            return (<tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.message}</td>
                                <td>{val.timestamp}</td>
                                {user.name === "Admin" ? (<td><Button
                                    style={{margin: "0.3rem", backgroundColor: "#FF6587"}}
                                    onClick={() => deleteComment(val.id)}
                                    variant="contained">
                                    Delete
                                </Button></td>) : (<div></div>)}
                            </tr>)
                        })}
                        </tbody>
                    </Table>) : (<div>
                    <h3 style={{margin: "1rem", textAlign: "left", color: "#FFFFFF"}}>No comments for this round
                        yet.</h3>
                </div>)}</div>)}
            {isAuthenticated ? (<div>
                <TextField
                    id="comment"
                    size="normal"
                    variant="filled"
                    fullWidth
                    multiline
                    color="#54428E"
                    margin="normal"
                    type="text"
                    InputProps={{
                        startAdornment: (<InputAdornment position="center">
                            <h6>{user.name}</h6>
                            <AccountCircle/>
                        </InputAdornment>),
                    }}
                    style={{
                        margin: "0.5rem", marginTop: "1rem", backgroundColor: "white", borderRadius: "2px",
                    }}
                />

                <Button
                    style={{margin: "0.3rem", backgroundColor: "#FF6587"}}
                    onClick={() => addComment(location.state.round.id, document.getElementById('comment').value)}
                    variant="contained">
                    Add comment
                </Button>
            </div>) : (<div>
                <h4 style={{
                    margin: "1rem", textAlign: "center", color: "#FFFFFF", backgroundColor: "#54428E", padding: "5px"
                }}>Login to write a comment!</h4>
            </div>)}
        </div>

    );
}

export default CommentsPage;
