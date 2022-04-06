import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/Layout/Layout";
import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Button,
  ButtonGroup,
} from "@mui/material";
import { BallTriangle } from "react-loader-spinner";
import "../../App.css";

const FindMovie = (props) => {
  console.log("for movies===", props.forMovies);
  const { initialDate, endDate, genre } = props.forMovies;
  console.log(initialDate.getFullYear());
  console.log(endDate.getFullYear());
  console.log(genre);
  let years = [];
  years.push(initialDate.getFullYear());
  years.push(endDate.getFullYear());
  console.log("yearrange===", years);
  const [movieState, setMovieState] = useState({});
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/User/UnknownMovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year_duration: years,
        genres: genre,
      }),
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("movies==", movies);
        setMovieState(movies);
        setDisplay(true);
      });
  }, []);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const movieDetails = (id) => {
    window.open(`https://www.imdb.com/title/${id}/`, "_blank");
  };
  const requestMoviePartner = (pmovie) => {
    fetch("http://localhost:5000/User/SaveUnknownMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          image_url: pmovie.image_url,
          imdb_id: pmovie.imdb_id,
          title: pmovie.title,
        },
        Username: name,
        Email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data====", data);
        if (data.status_code === 200) {
          setMessage(data.message);
          setDisplay(false);
          setCode(true);
        }
      });
  };

  const seeMovies = () => {
    var length = Object.keys(movieState).length;
    const mv = [];
    const cl=()=>{

    };

    console.log(typeof movieState);

    for (var i = 1; i <= length; i++) {
      var s = String(i);

      mv.push(
        <Grid item xs={4} sm={4} md={4}>
          <Card variant="outlined" sx={{ maxwidth: 345 }}>
            <CardMedia
              component="img"
              height="280"
              image={movieState[s]["image_url"]}
              alt="green iguana"
            />
            <CardContent
              style={{
                backgroundColor: "#6095b8",
                color: "white",
              }}
            >
              <Typography gutterBottom align="center">
                "Title":{movieState[s]["title"]}
              </Typography>
              <Typography gutterBottom align="center">
                "IMDB_ID":{movieState[s]["imdb_id"]}
              </Typography>
              <br></br>
              <br></br>
              <ButtonGroup>
                <Button
                  style={{
                    backgroundColor: "#1A374D",
                    borderColor: "red",
                    color: "white",
                    marginLeft: "",
                  }}
                  type="submit"
                
                  onClick={() => {
                    movieDetails(movieState[s]["imdb_id"]);
                  }}
                >
                  Find Movie Details
                </Button>

                <Button
                  style={{
                    backgroundColor: "#1A374D",
                    borderColor: "red",
                    color: "white",
                    marginLeft: "70px",
                  }}
                  type="submit"
                 
                  onClick={() => {
                    requestMoviePartner(movieState[s]);
                    setShow(true);
                  }}
                >
                  Request Movie Partner
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    console.log("mvlength====", mv, movieState);
    return mv;
  };
  const mmm = seeMovies();
  console.log("function calling====", mmm);
  return (
    <div>
      <Layout>
        {movieState && display && !code ? (
          <div>
            <Grid sx={{ flexGrow: 1 }} style={{ marginBlockStart: "20px" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {mmm}
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            <div className="loader">
              <BallTriangle
                timeout={5000}
                color="red"
                height={180}
                width={180}
              />
            </div>

            <ToastContainer position="middle-end">
              <Toast
                onClose={() => {
                  setShow(false);
                }}
                show={show}
                delay={10000}
                animation
                style={{
                  color: "black",
                  backgroundColor: "lightgreen",
                }}
                autohide
              >
                <Toast.Body>
                  <Typography gutterBottom variant="h5" component="div">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {<Link to="/HomePage">Go to HomePage</Link>}
                  </Typography>
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        )}
        )
      </Layout>
      <Footer />
    </div>
  );
};

export default FindMovie;
