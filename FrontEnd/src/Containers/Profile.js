import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import {
  Typography,
  Container,
  Grow,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Radio, Form } from "semantic-ui-react";

const Profile = () => {
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Age, setAge] = useState(15);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  console.log("name========", name);

  const [prof, setProf] = useState(false);
  const [data, setData] = useState();

  const onHandleSubmit = () => {
    fetch("http://localhost:5000/User/SaveProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: name,
        Phone: phoneNumber,
        Age: String(Age),
      }),
    })
      .then((res) => res.json)
      .then((profData) => {
        console.log("ProfileData====", profData);
        if (profData.status_code === 200) {
          setProf(true);
          fetch("http://localhost:5000/User/GetProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Username: name,
            }),
          })
            .then((response) => response.json())
            .then((profData) => {
              console.log("ProfileData===", profData);
              setData(profData);
            });
        }
      });
  };
  function onChangePhone(event) {
    let Phone = event.target.value;
    let phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let err = "";
    if (!Phone.trim()) {
      err = "This field is mandatory and cannot be empty";
    } else if (!phoneRegEx.test(Phone)) {
      err = "Enter a Valid Phone Number";
    }
    setPhoneNumber(Phone);
    setPhoneNumberError(err);
  }
  const ageHandler = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Layout>
        {!prof ? (
          <Grow in>
            <Container style={{ marginTop: 10, width: "97%" }}>
              <Grid item xs={6} md={12}>
                <Paper
                  elevation={6}
                  style={{
                    padding: "5%",
                    backgroundColor: "#6095b8",
                  }}
                >
                  <form>
                    <Typography
                      variant="h6"
                      style={{
                        marginTop: "3%",
                        fontWeight: 400,
                        color: "black",
                      }}
                    >
                      Mention Your Age:
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      size="normal"
                      id="Age"
                      type="number"
                      name="Age"
                      value={Age}
                      onChange={ageHandler}
                      label="Enter valid Number"
                      variant="outlined"
                      required
                      style={{ backgroundColor: "white" }}
                    />
                    <Typography
                      variant="h6"
                      style={{
                        marginTop: "3%",
                        fontWeight: 400,
                        color: "black",
                      }}
                    >
                      Enter Phone Number:
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      size="normal"
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      label="Phone Number"
                      variant="outlined"
                      required
                      value={phoneNumber}
                      onChange={onChangePhone}
                      style={{ backgroundColor: "white" }}
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {phoneNumberError}
                    </FormHelperText>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={onHandleSubmit}
                      style={{
                        backgroundColor: "#154001",
                        alignItems: "center",
                        margin: "10px",
                      }}
                      type="submit"
                    >
                      Submit Profile
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Container>
          </Grow>
        ) : (
          <div>
            {" "}
            <Grow in>
              <Container style={{ marginTop: 10, width: "97%" }}>
                <Grid item xs={6} md={12}>
                  <Paper
                    elevation={6}
                    style={{
                      padding: "5%",
                      backgroundColor: "#6095b8",
                    }}
                  >
                    <form>
                      <Typography
                        variant="h5"
                        style={{ fontWeight: 600 }}
                      ></Typography>
                      <Box>
                        <Box
                          component="div"
                          sx={{
                            dmx: "auto",
                            display: "inline",
                            fontSize: "19px",
                            color: "white",
                          }}
                        >
                          <b>Viewer Name:</b>
                        </Box>
                        <Box
                          component="div"
                          sx={{
                            mx: "auto",
                            display: "inline",
                            p: 9.25,
                            textOverflow: "ellipsis",
                            fontSize: "19px",
                          }}
                        >
                          {name}
                        </Box>
                      </Box>

                      <Box
                        style={{
                          paddingTop: "3%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          component="div"
                          sx={{
                            mx: "auto",
                            display: "inline",
                            fontSize: "19px",
                            color: "white",
                          }}
                        >
                          <b>Email:</b>
                        </Box>
                        <Box
                          component="div"
                          sx={{
                            mx: "auto",
                            display: "inline",
                            width: "fit-content",
                            p: 15.25,
                            textOverflow: "ellipsis",
                            fontSize: "19px",
                          }}
                        >
                          {email}
                        </Box>
                      </Box>
                    </form>
                  </Paper>
                </Grid>
              </Container>
            </Grow>
          </div>
        )}
      </Layout>
      <Footer />
    </div>
  );
};

export default Profile;
