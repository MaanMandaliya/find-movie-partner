import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";

import { useNavigate } from "react-router-dom";

import * as React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import applogo3 from "../IMAGES/applogo3.svg";

const AdminSignIn = () => {
  Amplify.configure({
    Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: "us-east-1:760a18b5-457a-449f-8708-edcdbb10afe8",

      // REQUIRED - Amazon Cognito Region
      region: "us-east-1",

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region
      // Required only if it's different from Amazon Cognito Region
      identityPoolRegion: "us-east-1",

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: "us-east-1_XMmti7bAj",

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: "5jq8hc7obt9dk3btnmubhan7s0",
      // authenticationFlowType: "USER_PASSWORD_AUTH",
    },
  });

  let navigate = useNavigate();
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const res = await Auth.signIn({
      username: field.email,
      password: field.password,
    });
    if (res) {
      console.log("response====", res);

      navigate("/Home");
    }
  };

  return (
    <div>
      <Grow in>
        <Container style={{ marginTop: 30, width: "97%" }}>
          <Grid item xs={6} md={12}>
            <Paper
              elevation={4}
              style={{ padding: "2%", backgroundColor: "white" }}
            >
              <Typography
                variant="h3"
                style={{
                  fontWeight: 400,
                  color: "goldenrod",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                <img src={applogo3} alt="logo" className="App-logo"></img>
                Movie Partner
              </Typography>

              <form onSubmit={submitForm}>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 600, color: "black" }}
                >
                  SignIn Page
                </Typography>

                <TextField
                  fullWidth
                  margin="normal"
                  size="normal"
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  value={field.email}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  size="normal"
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  required
                  value={field.password}
                  onChange={handleChange}
                />

                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "#154001",
                    alignItems: "center",
                    margin: "10px",
                  }}
                  type="submit"
                >
                  Signin
                </Button>
              </form>
            </Paper>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default AdminSignIn;