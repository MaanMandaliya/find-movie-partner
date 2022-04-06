import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import applogo3 from "../../IMAGES/applogo3.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Amplify from "aws-amplify";

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
const SignIn = (props) => {
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
    



      localStorage.setItem("token", res.signInUserSession.idToken.jwtToken);
      const decodedToken = jwt_decode(res.signInUserSession.idToken.jwtToken);
      if (decodedToken) {
        localStorage.setItem("name", decodedToken.name);
        localStorage.setItem("email", decodedToken.email);

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
                  style={{ backgroundColor: "white", color: "black" }}
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
                  style={{ backgroundColor: "white", color: "black" }}
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
                  Signin
                </Button>
                <Link to="/Signup">
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
