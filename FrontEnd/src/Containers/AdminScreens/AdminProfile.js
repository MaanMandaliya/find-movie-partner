import Layout from "../../Components/AdminLayout/Layout";
import Footer from "../../Components/Footer/footer";
import { Typography, Container, Grow, Grid, Box } from "@mui/material";
import { Paper } from "@mui/material";

const AdminProfile = () => {
  const email = localStorage.getItem("email");

  return (
    <div>
      <Layout>
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
                      <b>Admin Email:</b>
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

export default AdminProfile;
