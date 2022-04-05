import { useEffect } from "react";
import React from "react";
import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import { useState } from "react";
import { CardMedia, Card, Typography, Grid, Button } from "@mui/material";

import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

const SeeMovie = (props) => {
  console.log("title========", props);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const [pmovie, setMovie] = useState({});
  const [code, setCode] = useState(false);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");

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
        setDisplay(true);
      });
  }, []);

  const movieDetails = (id) => {
    window.open(`https://www.imdb.com/title/${id}/`, "_blank");
  };

  const requestMoviePartner = (pmovie) => {
    fetch("http://localhost:5000/User/SaveKnownMovie", {
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
          setCode(true);
          setMessage(data.message);
        }
      });
  };

  return (
    <div>
      <Layout>
        {pmovie && display && !code ? (
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
                      backgroundColor: "#1b649c",
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
                        marginLeft: "",
                      }}
                      type="submit"
                      onClick={() => {
                        movieDetails(pmovie.imdb_id);
                      }}
                    >
                      Find Movie Details
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "ButtonText",
                        borderColor: "red",
                        color: "white",
                        marginLeft: "230px",
                      }}
                      type="submit"
                      onClick={() => {
                        requestMoviePartner(pmovie);
                        setShow(true);
                      }}
                    >
                      Request Movie Partner
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          code && (
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
                  backgroundColor: "lightgoldenrodyellow",
                }}
                autohide
              >
                <Toast.Header>
                  {<Link to="/HomePage">Go to HomePage</Link>}
                </Toast.Header>

                <Toast.Body>
                  <Typography gutterBottom variant="h5" component="div">
                    {message}
                  </Typography>
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )
        )}
      </Layout>
      <Footer />
    </div>
  );
};

export default SeeMovie;
