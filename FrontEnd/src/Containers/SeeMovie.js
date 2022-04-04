import { useEffect } from "react";
import React, { Component } from 'react';
import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { useState } from "react";
import { CardMedia, Card, Typography, Grid, Button } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
const SeeMovie = (props) => {

    
  console.log("title========", props);

  const [pmovie, setMovie] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/User/KnownMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: props.title }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);

  const movieDetails=(id)=>{

    window.open(`https://www.imdb.com/title/${id}/`,"_blank");
   



  }

  return (
    <div>
      <Layout>
        {pmovie && (
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
                      height: 600,
                      width: 400,
                      backgroundColor: "lightgoldenrodyellow",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="400"
                      image={pmovie.image_url}
                      alt="green iguana"
                    />
                    <Typography
                      style={{ marginLeft: "120px" }}
                      gutterBottom
                      variant="h4"
                    >
                      "Title":{pmovie.title}
                    </Typography>
                    <br></br>
                    <br></br>
                    <Button
                      style={{
                        backgroundColor: "ButtonText",
                        borderColor: "red",
                        color: "white",
                        marginLeft:""
                      }}
                      type="submit"
                      onClick={()=>{movieDetails(pmovie.imdb_id)}}
                      
                    >
                      Find Movie Details
                    </Button>
                    
                    <Button
                      style={{
                        backgroundColor: "ButtonText",
                        borderColor: "red",
                        color: "white",
                        marginLeft:"230px"
                      }}
                      type="submit"
                      
                    >
                      Request Movie Partner
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Layout>
      <Footer />
    </div>
  );
};

export default SeeMovie;
