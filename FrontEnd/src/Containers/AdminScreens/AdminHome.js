import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/AdminLayout/Layout";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import users from "../../IMAGES/users.svg";
import request from "../../IMAGES/handshake.svg";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
} from "@mui/material";

const AdminHome = () => {
    let navigate=useNavigate();
  const handleUsers = () => {
      navigate("/UserRequests");
  };

  const viewUsers = () => {
      navigate("/AllUsers");
   
  };
  const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Layout>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid style={{ marginBlockStart: "170px" }} item xs={12}>
            <Grid container justifyContent="center" spacing={5}>
              <Grid item>
                <Card
                  sx={{
                    height: 200,
                    width: 200,
                    backgroundColor: "#6095b8",
                  }}
                >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="100"
                        image={request}
                        alt="green iguana"
                        onClick={handleUsers}
                      />
                      <br></br>
                      <Typography
                        gutterBottom
                        variant="button"
                        style={{ color: "white" }}
                      >
                        View/Manage User Request
                      </Typography>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item>
                <Card
                  sx={{
                    height: 200,
                    width: 200,
                    backgroundColor: "#6095b8",
                  }}
                >
                  <CardActionArea>
                    <CardActions>
                      <CardMedia
                        component="img"
                        height="100"
                        image={users}
                        alt="green iguana"
                        onClick={viewUsers}
                      />
                      <Typography
                        gutterBottom
                        variant="button"
                        style={{ color: "white" }}
                      >
                        View All Users
                      </Typography>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
      <Footer />
    </div>
  );
};

export default AdminHome;
