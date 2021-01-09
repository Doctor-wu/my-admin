import React from "react";
import {Statistic, Row, Col, Button, Card} from 'antd';
import {Image, Space, Table, Tag} from 'antd';
import {DollarCircleOutlined} from "@ant-design/icons";
import LayoutCard from "../components/LayoutCard";
import Hotkownledge from "../components/TestEcharts";

class BannerList extends React.Component {
    bannerList = [];
    loading = true;

    UNSAFE_componentWillMount() {
        // BannerApi.getBannerList().then(res => {
        //     console.log(res)
        //     this.bannerList = res.data.map((url:string,index:number)=>({
        //         image: url,
        //         id:index+1
        //     }));
        //     this.loading = false;
        //     this.forceUpdate()
        // });
    }

    render() {
        return (
            <>
                <Row gutter={24}>
                    <Col span={8}>
                        <LayoutCard
                            icon={<DollarCircleOutlined style={{fontSize: "50px", color: "lightseagreen"}}/>}
                            title={"昨日营业额"}
                            payload={`$ ${Number(2020).toLocaleString()}`}
                        />
                    </Col>
                    <Col span={8}>
                        <LayoutCard
                            icon={<DollarCircleOutlined style={{fontSize: "50px", color: "skyblue"}}/>}
                            title={"上周营业额"}
                            payload={`$ ${Number(18798).toLocaleString()}`}
                        />
                    </Col>
                    <Col span={8}>
                        <LayoutCard
                            icon={<DollarCircleOutlined style={{fontSize: "50px", color: "rgb(255, 212, 96)"}}/>}
                            title={"季度营业额"}
                            payload={`$ ${Number(45098).toLocaleString()}`}
                        />
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop: "20px"}}>
                    <Col span={8}>
                        <Hotkownledge/>
                    </Col>
                </Row>
            </>
        );
    }
}

export default BannerList;
