import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import movielogo from "../movielogo.svg";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";

const Home = () => {
  let navigate = useNavigate();

  const handleChange = (role) => {
    if (role === "Admin") {
      navigate("/Signin");
    }
    if (role === "User") {
      navigate("/Signin");
    }
  };

  return (
    <div>
      <Grow in>
        <Container style={{ marginTop: 100, width: "97%" }}>
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
                <img src={movielogo} alt="logo" className="App-logo"></img>
                Movie Partner
              </Typography>
              <Typography variant="h5" style={{ fontWeight: 600,color:"black",textAlign:"center" }}>
                  Choose Role for SignIn/SignUp!
                </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    onClick={() => {
                      handleChange("Admin");
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    onClick={() => {
                      handleChange("User");
                    }}
                  >
                    User
                  </Button>
                </ButtonGroup>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};
export default Home;
