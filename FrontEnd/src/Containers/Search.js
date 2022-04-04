import React from "react";
import { useState } from "react";
import Layout from "../Components/Layout/Layout";
import Footer from "../Components/Footer/footer";
import TextField from "@mui/material/TextField";
import { Button, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardMedia, Card } from "@mui/material";
import movie from "../IMAGES/movie.svg";

const Search = () => {
  const [searchstate, setSearchState] = useState({
    title: "",
  });

  const titleHandler = (event) => {
    const { name, value } = event.target;
    setSearchState({ [name]: value });
  };
  console.log("titlestate==", searchstate);

  const findMovie = () => {
    fetch("http://localhost:5000/User/KnownMovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title:searchstate.title}),
    }).then((res)=>res.json()).then(data=>{
      console.log("data===",data);
    })
  };

  return (
    <div>
      <Layout>
        <aside>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid style={{ marginBlockStart: "50px" }} item xs={12}>
              <Grid item>
                <Card
                  sx={{
                    height: 400,
                    width: 200,
                    backgroundColor: "lightgoldenrodyellow",
                  }}
                >
                  <CardMedia component="img" height="150" image={movie} />
                  <br />
                  <CardContent>
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      variant="outlined"
                      label="Enter Movie Title Here....."
                      value={searchstate.title}
                      name="title"
                      onChange={titleHandler}
                    />
                    <br />

                    <Button
                      style={{
                        backgroundColor: "#1A374D",
                        borderColor: "white",
                        color: "white",
                        marginLeft: "30px",
                      }}
                      type="submit"
                      onClick={findMovie}
                    >
                      Find Movie
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </aside>
      </Layout>
      <Footer />
    </div>
  );
};

export default Search;
