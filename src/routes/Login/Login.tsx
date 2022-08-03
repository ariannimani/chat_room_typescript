import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ACTIONS } from "../../context/actions/actions";
import { StateContext } from "../../context/StateProvider";
import "./Login.css";
import { users } from "../../data/users";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IPassword {
  value: string | "";
  showPassword?: boolean;
}

const Login = () => {
  const [userName, setUserName] = useState<string | "">("");
  const [password, setPassword] = useState<IPassword>({
    value: "",
    showPassword: false,
  });
  const [message, setMessage] = useState<string | null>(null);
  const { userDispatch } = useContext(StateContext);

  const signIn = () => {
    if (
      users.some(
        (user) => user.userName === userName && user.password === password.value
      )
    ) {
      userDispatch({
        type: ACTIONS.ADD_USER,
        payload: {
          userName: users
            .filter(
              (filterUser) =>
                filterUser.userName === userName &&
                filterUser.password === password.value
            )
            .map((user) => user.userName),
          userId: users
            .filter(
              (filterUser) =>
                filterUser.userName === userName &&
                filterUser.password === password.value
            )
            .map((user) => user.userId),
        },
      });
      setMessage(null);
    } else {
      setMessage("Username or Password Incorrect");
      setUserName("");
      setPassword({ value: "", showPassword: false });
    }
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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

          <TextField
            value={password.value}
            name="password"
            type={!password.showPassword ? "password" : "text"}
            label="Password"
            onChange={(e) => setPassword({ value: e.target.value })}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
