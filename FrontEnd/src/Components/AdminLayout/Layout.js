import React, { useState } from "react";
//import Header from '../Header/Header';
//import Footer from '../Footer/Footer';
import "./Layout.css";

import Header from "../AdminHeader/Aheader";
import SideBar from "../SideBar/SideBar";
import Header1 from "../NewAdminHeader/Aheader";


export default function Layout(props) {
  const [open, setOpen] = useState(false);

  const isToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="page-container">
      {" "}
      {/*Important CSS propertes to stick the Footer at the bottom */}
      <div className="content-wrap">
        <Header toggle={isToggle}  />
        <SideBar open={open} toggle={isToggle} />
        <div>{props.children}</div>
        
      </div>
    </div>
  );
}
