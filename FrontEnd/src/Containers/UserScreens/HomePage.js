import Layout from "../../Components/Layout/Layout";
import Footer from "../../Components/Footer/footer";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
} from "@mui/material";
import stranger from "../../IMAGES/stranger.svg";
import known from "../../IMAGES/known.svg";
import request from "../../IMAGES/setting.svg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let navigate = useNavigate();

  const handleUnknown = () => {
    navigate("/SelectType");
  };
  const handleKnown = () => {
    navigate("/Search");
  };
  const handleRequest = () => {
    navigate("/Request");
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
                        image={known}
                        alt="green iguana"
                        onClick={handleKnown}
                      />
                      <br></br>
                      <Typography
                        gutterBottom
                        variant="button"
                        style={{ color: "white" }}
                      >
                        Search Movie By Name
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
                        image={stranger}
                        alt="green iguana"
                        onClick={handleUnknown}
                      />
                      <Typography
                        gutterBottom
                        variant="button"
                        style={{ color: "white" }}
                      >
                        Seach Movie By Genres & Years
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
                        image={request}
                        alt="green iguana"
                        onClick={handleRequest}
                      />
                      <Typography
                        gutterBottom
                        variant="button"
                        style={{ color: "white" }}
                      >
                        My requests
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
export default Homepage;
