import { Auth } from "aws-amplify";
import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/Layout/Layout";
import { Typography, Container, Grow, Grid, Button } from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
const Signout = () => {
  let navigate = useNavigate();
  const signingOut = async () => {
    try {
      console.log("session====");
      Auth.signOut();
      localStorage.clear();

      navigate("/");
    } catch (error) {
      alert("error:", error);
    }
  };
  return (
    <div>
      <Layout>
        <Grow in>
          <Container style={{ marginTop: 30, width: "97%" }}>
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
                      sx={{ dmx: "auto", display: "inline", fontSize: "19px" }}
                    >
                      <Typography variant="button" gutterBottom>
                        Click On the Button to SignOut:
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          backgroundColor: "white",
                          alignItems: "center",
                          margin: "10px",
                          color: "black",
                        }}
                        onClick={signingOut}
                        type="submit"
                      >
                        SignOut
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </Grid>
          </Container>
        </Grow>
      </Layout>
      <Footer />
    </div>
  );
};

export default Signout;
