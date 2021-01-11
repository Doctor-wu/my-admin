import React, {useRef} from 'react';
import {Tabs} from "antd";
import {CheckCircleOutlined, CheckOutlined, MinusCircleOutlined} from "@ant-design/icons";
import OrderTable from "../components/Order/OrderTable";
import {OrderApi} from "../api/OrderApi";

const {TabPane} = Tabs;

const OrderList = () => {
    const getUnCompleteData = () => {
        return OrderApi.findAllMakingOrder().then(res => {
            console.log(res)
            return res;
        })
    }
    const getCompletedData = () => {
        return OrderApi.findAllCompletedOrder().then(res => {
            console.log(res)
            return res;
        })
    }

    let tableR1 = useRef();
    let tableR2 = useRef();
    const onTabChangeHandler = (activeKey: string) => {
        console.log(tableR1, tableR2)
        switch (activeKey) {
            case "1":
                // @ts-ignore
                tableR1.current();
                break;
            case "2":
                // @ts-ignore
                tableR2.current();
                break;
        }
    }
    return (
        <>
            <Tabs defaultActiveKey="1" onChange={onTabChangeHandler}>
                <TabPane
                    tab={
                        <span>
                          <MinusCircleOutlined/>
                          未完成订单
                        </span>
                    }
                    key="1"
                >
                    <OrderTable
                        getData={getUnCompleteData}
                        ref={tableR1}
                        operation={(update: any) => {
                            return (
                                <>
                                    <a style={{color: "lightseagreen"}} onClick={update}>
                                        <CheckOutlined/>&nbsp;
                                        制作完成
                                    </a>
                                </>
                            )
                        }}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                          <CheckCircleOutlined/>
                          已完成订单
                        </span>
                    }
                    key="2"
                >
                    <OrderTable
                        ref={tableR2}
                        getData={getCompletedData}
                    />
                </TabPane>
            </Tabs>
        </>
    )
}

export default OrderList;