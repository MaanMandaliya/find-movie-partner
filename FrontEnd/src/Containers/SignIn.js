import { useState } from "react";
import { Auth } from "aws-amplify";

import { useNavigate } from "react-router-dom";
import * as React from "react";
import applogo3 from "../IMAGES/applogo3.svg";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
//import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const SignIn = () => {
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

      const decodedToken = jwt_decode(res.signInUserSession.idToken.jwtToken);
      if (decodedToken) {
        navigate("/HomePage");
      } else {
        alert("UnAuthorized");
      }
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
                <Link to="/Signup">
                  {" "}
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: 600,
                      color: "blue",
                      textAlign: "end",
                      textDecoration: "underline",
                    }}
                  >
                    New User? SignUp Here
                  </Typography>
                </Link>
              </form>
            </Paper>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default SignIn;
