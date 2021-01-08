import {JumpRoute} from "../Layout/Slide/Slide";
import {notification} from "antd";

export const LogOut = () => {
    JumpRoute("/Login");
    notification.success({
        message: "退出登录！"
    })
}
