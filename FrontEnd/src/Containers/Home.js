import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import applogo1 from "../IMAGES/applogo3.svg";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect } from "react";

const Home = () => {
  let navigate = useNavigate();

 

  const handleChange = (role) => {
    if (role === "Admin") {
      navigate("/AdminSignin");
    }
    if (role === "User") {
      navigate("/Signup");
    }
  };

  return (
    <div>
      <Grow in>
        <Container style={{ marginTop: 100, width: "97%" }}>
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
                <img src={applogo1} alt="logo" className="App-logo"></img>
                Movie Partner
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: 600, color: "black", textAlign: "center" }}
              >
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
                    style={{ backgroundColor: "white" }}
                    onClick={() => {
                      handleChange("Admin");
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    style={{ backgroundColor: "white" }}
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
