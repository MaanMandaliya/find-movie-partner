import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/Layout/Layout";
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
import { useState } from "react";
import Box from "@mui/material/Box";

const Profile = () => {
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Age, setAge] = useState(15);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const [prof, setProf] = useState(false);
  const [data, setData] = useState();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/User/SaveProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: name,
        Phone: phoneNumber,
        Age: String(Age),
        Email: email,
      }),
    })
      .then((resp) => resp.json())
      .then((profData) => {
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
              setData(profData);
              setPhoneNumber(profData.Phone);
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
                  <form onSubmit={onHandleSubmit}>
                    <Typography
                      variant="h6"
                      style={{
                        marginTop: "3%",
                        fontWeight: 400,
                        color: "black",
                      }}
                    >
                      Username:
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      size="normal"
                      id="Age"
                      type="text"
                      name="username"
                      value={name}
                      disabled={true}
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
                      Email:
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      size="normal"
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      disabled={true}
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
          data && (
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
                            <b>User Name:</b>
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
                            <b>Email:</b>
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
                            {email}
                          </Box>
                        </Box>
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
                            <b>Age:</b>
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
                            {data.Age}
                          </Box>
                        </Box>
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
                            <b>Phone Number:</b>
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
                            {data.Phone}
                          </Box>
                        </Box>
                      </form>
                    </Paper>
                  </Grid>
                </Container>
              </Grow>
            </div>
          )
        )}{" "}
      </Layout>
      <Footer />
    </div>
  );
};

export default Profile;
