import React from "react";
import {AppstoreFilled, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown, Menu} from "antd";
import "./Header.scss";
import Avatar from "react-avatar";


const dropdown = <Menu>
    <Menu.Item>
        <UserOutlined/>个人信息
    </Menu.Item>
    <Menu.Item>
        <LogoutOutlined />退出登录
    </Menu.Item>
</Menu>

const Header = () => {
    return (
        <div className="header_wrapper">
            <div className="logo">
                <AppstoreFilled style={{color: "#fff", fontSize: "40px", marginRight: "10px"}}/>
                Admin
            </div>
            <div className="operation">
                <Dropdown overlay={dropdown}>
                    <div className="userInfo">
                        <Avatar color="#ffd460" className="avatar" name="Doctorwu" size="45" round/>
                        <span className="username">Doctorwu</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
