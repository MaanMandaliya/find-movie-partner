import React from "react";
import applogo3 from "../../IMAGES/applogo3.svg";

import { RiLoginBoxFill } from "react-icons/ri";
import {
  BsPersonPlusFill,
  BsPower,
  BsQuestionSquareFill,
} from "react-icons/bs";

import { Nav, NavLink, Bars, NavMenu } from "../NavElements/NavElements";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import { Typography } from "@mui/material";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#1A374D",
    border: 2,
    borderRadius: "30px",
    color: "white",
    height: 40,
    padding: "0 30px",
    margin: "8px",
    textTransform: "none",
    "&:hover": {
      background: "#E4F9F5",
      color: "red",
    },
  },
});

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="CustomNavbar"
      >
        <Container>
          <Typography
            variant="h5"
            style={{ fontWeight: 200, color: "black", padding: "0rem" }}
          >
            <img src={applogo3} alt="logo" className="App-logo"></img>
            Movie Partner
          </Typography>
        </Container>
      </Navbar>

      <Nav>
        <div></div>
        <NavMenu>
          <NavLink to="/HomePage">
            {" "}
            <Button variant="contained" className={classes.root}>
              Homepage
            </Button>
          </NavLink>
          <Button variant="contained" className={classes.root}>
            Help
            <BsQuestionSquareFill />
          </Button>
        </NavMenu>

        <Bars onClick={props.toggle} />
        <NavMenu>
          <NavLink to="/Profile">
            <RiLoginBoxFill />
            Profile
          </NavLink>

          <NavLink to="/Signout">
            <BsPower /> SignOut
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
}
