import React from "react";
import { AppstoreFilled } from "@ant-design/icons";
import Avatar from 'react-avatar';
import "./Header.scss";

const Header = () => {
  return (
    <div className="header_wrapper">
        <div className="logo">
            <AppstoreFilled style={{color:"#fff",fontSize:"40px",marginRight: "10px"}}/>
            Admin
        </div>
        <div className="operation">
            <Avatar color="#ffd460" className="avatar" name="Doctorwu" size="45" round></Avatar>
        </div>
    </div>
  );
};

export default Header;
