/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import Cookies from "js-cookie";
// import {showAuthenticationContext} from "../../utils/contextUtils";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        BuyMe Online🛒
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  // const { setShowAuthentication } = useContext(showAuthenticationContext);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  // useEffect(() => {
  //   setShowAuthentication(false);
  // });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [resMssg, setResMssg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    const signedInUser = {
      email: email,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signedInUser),
    };
    const response = await fetch(`${SERVER_URL}/api/v1/user/signin`, options);
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status === "err") {
      setResMssg(responseData.message);
      setIsSignedIn(false);
      setShowAlert(true);
    } else {
      setIsSignedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      sessionStorage.setItem("token", responseData.bearer);
      console.log(responseData.bearer);
      // localStorage.setItem("BearerToken", responseData.bearer);
      Cookies.set("BearerToken", responseData.bearer, {
        expires: new Date(Date.now() + 3600000),
        // domain: "localhost",

        // path: "/"
      });

      setShowAlert(true);
      // setUser(signedInUser);
    }
    // const getcookie = Cookies.get("bt");
    // console.log(getcookie);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          sx={{
            // border: "2px solid blue",
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {showAlert
            ? isSignedIn
              ? (() => {
                  return (
                    <Alert
                      sx={{
                        position: "absolute",
                        top: "15%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                      }}
                      severity="success"
                    >
                      You have successfully Signined in to your account.
                    </Alert>
                  );
                })()
              : (() => {
                  return (
                    <Alert
                      sx={{
                        position: "absolute",
                        top: "15%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                      }}
                      severity="error"
                    >
                      {resMssg}
                    </Alert>
                  );
                })()
            : ""}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // border: "2px solid green",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
