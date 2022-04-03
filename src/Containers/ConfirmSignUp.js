import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import applogo3 from "../IMAGES/applogo3.svg";




import "../App.css";

const ConfirmSignUp = (props) => {
  let navigate = useNavigate();
  const { email, password } = props.dataToSignIn;
  console.log("username as email========", email, password);

  const [data, setData] = useState({
    code: "",
  });

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
      

      console.log(e);
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

              <form onSubmit={submitForLogin}>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 600, color: "black" ,textAlign:"center"}}
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
                  Enter Code
                </Button>
              </form>
            </Paper>
          </Grid>
        </Container>
      </Grow>
   
    </div>
  );
};

export default ConfirmSignUp;
