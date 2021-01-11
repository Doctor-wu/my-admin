import React from "react";
import {Statistic, Row, Col, Button, Card} from 'antd';
import {Image, Space, Table, Tag} from 'antd';
import {DollarCircleOutlined,BarsOutlined,UserOutlined} from "@ant-design/icons";
import LayoutCard from "../components/LayoutCard";
import Hotkownledge from "../components/IndexView/Hotkownledge";
import HotkownledgeLine from "../components/IndexView/HotkownledgeLine";




class BannerList extends React.Component {
    bannerList = [];
    loading = true;
    render() {
        return (
            <>
                <Row gutter={24}>
                    <Col span={6}>
                        <LayoutCard
                            icon={<DollarCircleOutlined style={{fontSize: "50px", color: "lightseagreen"}}/>}
                            title={"昨日营业额"}
                            payload={`$ ${Number(892).toLocaleString()}`}
                        />
                    </Col>
                    <Col span={6}>
                        <LayoutCard
                            icon={<DollarCircleOutlined style={{fontSize: "50px", color: "skyblue"}}/>}
                            title={"上周营业额"}
                            payload={`$ ${Number(6231).toLocaleString()}`}
                        />
                    </Col>
                    <Col span={6}>
                        <LayoutCard
                            icon={<BarsOutlined style={{fontSize: "50px", color: "orange"}}/>}
                            title={"当天订单数"}
                            payload={`${Number(32).toLocaleString()}`}
                        />
                    </Col>
                    <Col span={6}>
                        <LayoutCard

                            icon={<UserOutlined style={{fontSize: "50px", color: "skyblue"}}/>}
                            title={"当天订单数"}
                            payload={`${Number(32).toLocaleString()}`}
                        />
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop: "20px"}}>
                    <Col span={8}>
                        <Hotkownledge />
                    </Col>
                    {/*<Col span={8}>*/}
                    {/*    <SevenDayRevenue/>*/}
                    {/*</Col>*/}
                    <Col span={16}>
                        <HotkownledgeLine/>
                    </Col>
                </Row>
            </>
        );
    }
}

export default BannerList;
