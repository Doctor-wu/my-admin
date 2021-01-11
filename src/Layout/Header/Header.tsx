import React, {useEffect, useState} from "react";
import {LogoutOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown, Menu} from "antd";
import "./Header.scss";
import Avatar from "react-avatar";
import {LogOut} from "../../utils/user";
import {UserApi} from "../../api/UserApi";


const dropdown = <Menu>
    <Menu.Item>
        <UserOutlined/>个人信息
    </Menu.Item>
    <Menu.Item onClick={() => LogOut()}>
        <LogoutOutlined/>退出登录
    </Menu.Item>
</Menu>

const Header = () => {
    let [userName, setUserName] = useState("");
    useEffect(() => {
        UserApi.getUserInfo().then(res => {
            setUserName(res?.data?.username);
        })
    })
    return (
        <div className="header_wrapper">
            <div className="logo">
                <ShopOutlined style={{color: "#fff", fontSize: "40px", marginRight: "10px"}}/>
                悲茶
            </div>
            <div className="operation">
                <Dropdown overlay={dropdown}>
                    <div className="userInfo">
                        <Avatar color="#ffd460" className="avatar" name={userName} size="45" round/>
                        <span className="username">{userName}</span>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
