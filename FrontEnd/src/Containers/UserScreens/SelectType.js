import Footer from "../../Components/Footer/footer";
import Layout from "../../Components/Layout/Layout";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { CardActionArea } from "@material-ui/core";
import { Card, Button,  CardActions, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const SelectTypes = (props) => {
    console.log("props===", props);
    let navigate = useNavigate();
    const genre = [
      "Adventure",
      "Family",
      "Fantasy",
      "Crime",
      "Drama",
      "Comedy",
      "Animation",
      "Sci-Fi",
      "Sport",
      "Action",
      "Thriller",
      "Mystery",
      "Western",
      "Romance",
      "Biography",
      "Horror",
      "War",
      "Musical",
      "History",
      "Music",
      "Documentary",
      "Short",
      "Talk-Show",
      "Game-Show",
      "Reality-TV",
      "News",
      "Adult",
    ];
  
    const [selectState, setSelectState] = useState([]);
  
    const storeType = (items) => {
      let updatedList = [...selectState];
      var index = updatedList.indexOf(items);
      if (index !== -1) {
        updatedList.splice(index, 1);
        setSelectState(updatedList);
      } else if (updatedList.length === 3) {
        alert("You can not select more than 3 genres");
        setSelectState(updatedList);
      } else {
        updatedList.push(items);
  
        setSelectState(updatedList);
      }
      localStorage.setItem("genres", selectState);
    };
    console.log("state items==",selectState);
  
    const selectYear = () => {
      console.log("statevalue=", selectState);
      props.genreType(selectState);
      navigate("/SelectYear");
    };
  
  
  
    return (
      <div>
        <Layout>
          <Box
            style={{ marginBlockStart: "20px", marginBlockEnd: "20px" }}
            sx={{ flexGrow: 1 }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {genre.map((items) => {
                return (
                  <Grid item xs={2} sm={4} md={2}>
                    <Card
                      sx={{
                        height: 40,
                        width: 200,
                        backgroundColor: "#6095b8",
                        color:"white"
                      }}
                    >
                      <CardActionArea>
                        <CardActions>
                       
                          <Typography
                            onClick={() => {
                              storeType(items);
                            }}
                            variant="button"
                          >
                            {items}
                          </Typography>
                       
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <div className="centerButton">
              <Button
                style={{
                  backgroundColor: "#1A374D",
                  borderColor: "blue",
                  color: "white",
                }}
                onClick={selectYear}
                type="submit"
              >
                Select Year Range
              </Button>
            </div>
          </Box>
        </Layout>
        <Footer />
      </div>
    );
  };


export default SelectTypes;
