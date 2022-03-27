import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

import movielogo from "../movielogo.svg";
import "../App.css";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-1:179e9484-c967-4aae-b8a6-293b77bcea39",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_yMhTCnegf",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "15e0q5lafvrb0a0nc0m9aiju6",
    // authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

// You can get the current config object
//const currentConfig = Auth.configure();

const Signup = (props) => {
  let navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const submitData = (event) => {
    //console.log(formV);
    event.preventDefault();
    const { name, email, password } = formValue;
    console.log(name);
    console.log(email);

    Auth.signUp({
      username: email,
      password,
      attributes: {
        name,
        email,
      },
      validationData: [],
    })
      .then((data) => {
        console.log("++++++++++--------------", data);
        setFormValue(data);
      })
      .catch((err) => console.log(err));
    props.dataFromSignUp(formValue);
    navigate("/confirmSignUp");
  };

  return (
    <div>
      <Grow in >
        <Container style={{ marginTop: 30, width: "97%" }}>
          <Grid item xs={6} md={12}>
          
            <Paper elevation={4} style={{ padding: "2%",backgroundColor:"white" }}>
            <Typography variant="h3" style={{ fontWeight: 400 ,color:"goldenrod",textAlign:"center",textDecoration:"underline"}}>
            <img src={movielogo} alt="logo" className="App-logo"></img>
                  Movie Partner
                </Typography>
             

              <form onSubmit={submitData}>
                <Typography variant="h5" style={{ fontWeight: 600,color:"black" }}>
                  SignUp Page
                </Typography>

                <TextField
                  fullWidth
                  margin="normal"
                  size="normal"
                  id="firstName"
                  type="text"
                  name="name"
                  label="name"
                  variant="outlined"
                  required
                  value={formValue.name}
                  onChange={changeHandler}
                />

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
                  value={formValue.email}
                  onChange={changeHandler}
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
                  value={formValue.password}
                  onChange={changeHandler}
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
                  SignUp
                </Button>
                <Link to="/Signin">
                  {" "}
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "blue" ,textAlign:"end",textDecoration:"underline"}}
                  >
                    Already Have an Account?Click here for SignIn
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

export default Signup;
