import React from "react";
import {Button, Checkbox, Col, Form, Input, notification, Row} from "antd";
import "../style/Login.scss"
import {AppstoreFilled} from "@ant-design/icons";
import QueueAnim from 'rc-queue-anim';
import {LoginApi} from "../api/LoginApi";
import {JumpRoute} from "../Layout/Slide/Slide";
import {FormInstance} from "antd/es/form";

const layout = {
    labelCol: {span: 4},
};
const tailLayout = {
    wrapperCol: {span: 16},
};


// const onFinish = (values: any) => {
//     new Promise((resolve => {
//         pass = resolve;
//     })).then(_ => {
//         return LoginApi.login(values).then(res => {
//             console.error(res)
//             if (res.code !== 0) {
//                 notification.error({
//                     message: res.msg
//                 })
//             } else {
//                 JumpRoute("/");
//                 notification.success({
//                     message: "登录成功!"
//                 })
//             }
//         })
//     }).catch((res: any) => {
//         console.error(res)
//     });
// };
//
// const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };

class Login extends React.Component {
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    onFinish = (values: any) => {
    };
    formRef = React.createRef<FormInstance>();

    onLogin() {
        // @ts-ignore
        new window.TencentCaptcha("1304716957", () => {
            LoginApi.login(this.formRef.current?.getFieldsValue()).then(res => {
                console.error(res)
                if (res.code !== 0) {
                    notification.error({
                        message: res.msg
                    })
                } else {
                    JumpRoute("/");
                    notification.success({
                        message: "登录成功!"
                    })
                }
            })
        }).show();
    }

    render() {
        return (
            <>
                <QueueAnim>
                    <Row className="login-logo">
                        <Col span={4} offset={10}>
                            <AppstoreFilled style={{color: "#000", fontSize: "40px", marginRight: "10px"}}/>
                            <h2>Admin</h2>
                        </Col>
                    </Row>
                    <Row className="login-container">
                        <Col span={4} offset={10}>
                            <h2>登录</h2>
                            <small>Admin Login</small>
                        </Col>
                        <Col style={{marginTop: "3vh"}} span={4} offset={10}>
                            <Form
                                {...layout}
                                ref={this.formRef}
                                layout="vertical"
                                name="basic"
                                initialValues={{remember: true}}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[{required: true, message: '请输入用户名!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password_md5"
                                    rules={[{required: true, message: '请输入密码!'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item wrapperCol={{span: 24}}>
                                    <Button
                                        // id="TencentCaptcha"
                                        // data-appid="1304716957"
                                        // data-cbfn="waterFallValidate"
                                        style={{width: "100%"}} type="primary"
                                        onClick={() => this.onLogin()}
                                        // htmlType="submit"
                                    >
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </QueueAnim>
            </>
        )
    }
}

export default Login;
