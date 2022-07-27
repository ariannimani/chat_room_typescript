import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ADD_USER } from "../../context/actions/actions";
import { StateContext } from "../../context/StateProvider";
import "./Login.css";
import { users } from "../../data/users";
import { Alert } from "@mui/material";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { userDispatch } = useContext(StateContext);

  const signIn = () => {
    if (
      users.some(
        (user) => user.userName === userName && user.password === password
      )
    ) {
      userDispatch({
        type: ADD_USER,
        playload: userName,
      });
      setMessage(null);
    } else {
      setMessage("Username or Password Incorrect");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Chat</h1>
        </div>
        <div className="login__fields">
          {message !== null ? <Alert severity="error">{message}</Alert> : ""}

          <TextField
            value={userName}
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
          />
          {console.log(userName, password)}
          <TextField
            value={password}
            id="standard-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
