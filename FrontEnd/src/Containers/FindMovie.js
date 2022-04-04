import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { useEffect, useState } from "react";
import { Typography, Card, Grid, CardContent, CardMedia } from "@mui/material";

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
        console.log("length==", Object.keys(movies).length);
        setMovieState(movies);
      });
  }, [genre, years]);

  const seeMovies = () => {
  
    var length = Object.keys(movieState).length;

    for (var i = 1; i < length; i++) {
      
      var s = String(i);
      return(
      <Grid item xs={4} sm={4} md={4}>
        <Card variant="outlined" sx={{ maxwidth: 345 }}>
          <CardMedia
            component="img"
            height="250"
            image={movieState[s]["image_url"]}
            alt="green iguana"
          />
          <CardContent
            style={{
              backgroundColor: "#11999E",
              color: "white",
            }}
          >
            <Typography gutterBottom align="center">
              title:{movieState[s]["title"]}
            </Typography>
            <Typography gutterBottom align="center">
              IMDB_ID:{movieState[s]["imdb_id"]}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )}
  };
  const mmm = seeMovies();
  return (
    <div>
      <Layout>
        {movieState && (
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
        )}
      </Layout>
      <Footer />
    </div>
  );
};

export default FindMovie;
