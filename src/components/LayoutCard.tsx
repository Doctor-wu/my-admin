import React, {Component} from 'react';
import {DollarCircleOutlined} from "@ant-design/icons";
import {Card} from "antd";


const LayoutCard = (props:{
    title: string;
    payload: any;
    icon: JSX.Element
})=>{
    return(
        <Card
            headStyle={{fontWeight: "bold"}}
            bodyStyle={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px"
            }}
            title={props.title}
            style={{ width: "100%" }}
            hoverable
        >
            {props.icon}
            <h2 style={{flex: 1,textAlign: "right"}}>
                {props.payload}
            </h2>
        </Card>
    )
}

export default LayoutCard;