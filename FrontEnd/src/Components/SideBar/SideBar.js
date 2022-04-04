import React from "react";
import {
  SideBarC,
  CloseIcon,
  Icon,
  SideBarMenu,
  SideBarLink,
  SideBarMenuWrap,
} from "../NavElements/NavElements";

export default function SideBar(props) {
  return (
    <>
      <SideBarC open={props.open} onClick={props.toggle}>
        <Icon onClick={props.toggle}>
          <CloseIcon />
        </Icon>
        <SideBarMenuWrap>
          <SideBarMenu>
            <SideBarLink to="/Signin" onClick={props.toggle}>
              Login
            </SideBarLink>
            <SideBarLink to="/Signup" onClick={props.toggle}>
              Signup
            </SideBarLink>
           
          </SideBarMenu>
        </SideBarMenuWrap>
      </SideBarC>
    </>
  );
}
