import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import applogo3 from "../../IMAGES/applogo3.svg";

import "../../App.css";

const ConfirmSignUp = (props) => {
  let navigate = useNavigate();
  const { email } = props.dataToSignIn;

  const [data, setData] = useState({
    code: "",
  });
  const [show, setShow] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitForLogin = async (event) => {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(email, data.code);

      navigate("/Signin");
    } catch (e) {
      alert("Error:", e);
    }
  };
  const resendCode = async (event) => {
    event.preventDefault();
    try {
      await Auth.resendSignUp(email);
      setShow(true);
    } catch (e) {
      alert("Error:", e);
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
                variant="h3"
                style={{
                  fontWeight: 400,
                  color: "white",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                <img src={applogo3} alt="logo" className="App-logo"></img>
                Movie Partner
              </Typography>

              <form onSubmit={submitForLogin}>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Check Your Email for Confrimation Code!!!
                </Typography>

                <TextField
                  fullWidth
                  margin="normal"
                  size="normal"
                  id="code"
                  type="text"
                  name="code"
                  label="code"
                  variant="outlined"
                  required
                  value={data.code}
                  onChange={changeHandler}
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
                  Enter Code
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "black",
                    alignItems: "center",
                    margin: "10px",
                  }}
                  type="submit"
                  onClick={resendCode}
                >
                  Resend Code
                </Button>
                {show && (
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: 600,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Code Sent Again Successfully!!!
                  </Typography>
                )}
              </form>
            </Paper>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default ConfirmSignUp;
