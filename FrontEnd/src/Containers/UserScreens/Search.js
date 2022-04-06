import React from "react";
import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Footer from "../../Components/Footer/footer";
import TextField from "@mui/material/TextField";
import { Button, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardMedia, Card} from "@mui/material";
import movie from "../../IMAGES/movie.svg";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
  let navigate = useNavigate();
  const [searchstate, setSearchState] = useState({
    title: "",
   
  });

  const titleHandler = (event) => {
    const { name, value } = event.target;
    setSearchState({ [name]: value });
  };
  console.log("titlestate==", searchstate);

  const findMovie = () => {
    props.dataFromSearch(searchstate.title);
    navigate("/SeeMovie");
  };

  return (
    <div>
      <Layout>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid
            style={{ marginBlockStart: "30px", marginBlockEnd: "30px" }}
            item
            xs={12}
          >
            <Grid container justifyContent="center" spacing={5}>
              <Grid item>
                <Card
                  sx={{
                    height: 500,
                    width: 400,
                    backgroundColor: "#6095b8",
                  }}
                >
                  <CardMedia component="img" height="250" image={movie} />
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
                      
                      style={{ marginLeft: "80px" ,backgroundColor:"white",color:"lightgoldenrodyellow" }}
                    />
                    <br />

                    <Button
                      style={{
                        backgroundColor: "#1A374D",
                        borderColor: "white",
                        color: "white",
                        marginLeft: "130px",
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
        </Grid>
       
      </Layout>
      <Footer />
    </div>
  );
};

export default Search;
