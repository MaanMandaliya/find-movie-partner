import Footer from "../Components/Footer/footer";
import Layout from "../Components/Layout/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, YearPicker } from "@mui/lab";

import { Card, Button } from "@mui/material";

import { Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const SelectYear = (props) => {

  let navigate=useNavigate();
  const [value, setValue] = useState({
    initialDate: new Date(),
    endDate: new Date(),
    genre:props.gtype
  });
  const nextPage = () => {

    props.selectedYear(value);
    navigate("/FindMovie");
    
  };

  console.log("initalDate", value);

  return (
    <div>
      <Layout>
        <div style={{ justifyContent: "center", color: "white" }}>
          {" "}
          <Typography gutterBottom>
            Selected Genres are: {props.gtype}
          </Typography>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid style={{ marginBlockStart: "10px" }} item xs={12}>
              <Grid container justifyContent="center" spacing={5}>
                <Grid item>
                  <Card
                    sx={{
                      height: 200,
                      width: 200,
                      backgroundColor: "lightgoldenrodyellow",
                    }}
                  >
                    <Typography gutterBottom>Select Start Year</Typography>
                    <YearPicker
                      views={["year"]}
                      label="Initial Year"
                      isDateDisabled={() => false}
                      minDate={new Date("1961")}
                      maxDate={new Date("2021")}
                      value={value.initialDate}
                      name="initialDate"
                      onChange={(newValue) => {
                        setValue({ ...value, initialDate: newValue });
                      }}
                    />
                  </Card>
                </Grid>

                <Grid item>
                  <Card
                    sx={{
                      height: 200,
                      width: 200,
                      backgroundColor: "lightgoldenrodyellow",
                    }}
                  >
                    <Typography gutterbottom>Select End Year</Typography>

                    <YearPicker
                      views={["year"]}
                      label="Initial Year"
                      isDateDisabled={() => false}
                      minDate={new Date("1961")}
                      maxDate={new Date("2021")}
                      value={value.endDate}
                      onChange={(newValue) => {
                        setValue({ ...value, endDate: newValue });
                      }}
                    />
                  </Card>
                </Grid>
              </Grid>
              {value && (
                <div style={{ justifyContent: "center", color: "white" }}>
                  <Typography gutterBottom>
                    Selected Starting Year :{value.initialDate.getFullYear()}
                  </Typography>
                </div>
              )}
              {value && (
                <div style={{ justifyContent: "center", color: "white" }}>
                  <Typography gutterBottom>
                    Selected End Year :{value.endDate.getFullYear()}
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
          <div className="centerButton">
            <Button
              style={{
                backgroundColor: "whitesmoke",
                borderColor: "blue",
                color: "black",
              }}
              type="submit"
              onClick={nextPage}
            >
              Find Movie
            </Button>
          </div>
        </LocalizationProvider>
      </Layout>
      <Footer />
    </div>
  );
};

export default SelectYear;
