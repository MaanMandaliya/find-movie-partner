import React from "react";
import Amplify, { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import applogo3 from "../../IMAGES/applogo3.svg";
import "../../App.css";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",


    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_chWAsK7Rx",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "651bv34tvusmr28pts0i0bk858",

    // authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});


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
        setFormValue(data);
      })
      .catch((err) => alert("Error:", err));
    props.dataFromSignUp(formValue);
    navigate("/confirmSignUp");
  };

  return (
    <div>
      <Grow in>
        <Container style={{ marginTop: 30, width: "97%" }}>
          <Grid item xs={6} md={12}>
            <Paper
              elevation={4}
              style={{ padding: "2%", backgroundColor: "#6095b8" }}
            >
              <Typography
                style={{
                  fontWeight: 400,
                  color: "white",
                  textAlign: "center",
                  textDecoration: "underline",
                  fontSize: "20px",
                }}
              >
                <img src={applogo3} alt="logo" className="App-logo"></img>
                Movie Partner
              </Typography>

              <form onSubmit={submitData}>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 600, color: "black" }}
                >
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
                  style={{ backgroundColor: "white", color: "black" }}
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
                  style={{ backgroundColor: "white", color: "black" }}
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
                  style={{ backgroundColor: "white", color: "black" }}
                  value={formValue.password}
                  onChange={changeHandler}
                />

                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "black",
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
                    style={{
                      fontWeight: 600,
                      color: "black",
                      textAlign: "end",
                      textDecoration: "underline",
                    }}
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
