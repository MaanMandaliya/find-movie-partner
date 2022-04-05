import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { Typography, Container, Grow, Grid } from "@mui/material";
import { Paper } from "@mui/material";

import Box from "@mui/material/Box";

const Profile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  console.log("name========", name);

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
                  backgroundColor: "lightgoldenrodyellow",
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
                      sx={{ mx: "auto", display: "inline", fontSize: "19px" }}
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
      </Layout>
      <Footer />
    </div>
  );
};

export default Profile;
