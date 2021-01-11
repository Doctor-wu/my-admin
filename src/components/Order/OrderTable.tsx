import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Image, message, Space, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import helper from "../../utils/helper";
import {OrderApi} from "../../api/OrderApi";

interface OrderTableProps {
    getData: () => Promise<any>,
    operation?: Function
}


let OrderTable: any = (props: OrderTableProps, ref:any) => {
    let [loading, setLoading] = useState(true);
    let [data, setData] = useState([]);

    const getDataSource = () => {
        return props.getData().then(res => {
            setData(res);
            setLoading(false);
        });
    }
    useEffect(() => {
        getDataSource();
    }, []);

    const update = (id: string) => {
        OrderApi.updateOrder(id).then(res => {
            console.log(res);
            setLoading(true);
            getDataSource().then(_ => {
                message.success("更新成功");
                setLoading(false);
            });
        })
    };

    useImperativeHandle(ref, () => (getDataSource));

    return (
        <Table dataSource={data} loading={loading}>
            <Column title="订单编号" dataIndex="orderId" key="orderId"/>
            <Column title="商品图片"
                    dataIndex="drinkList"
                    key="drinkList"
                    render={(shoppings: any[]) => {
                        return (
                            <>
                                <Space>
                                    {
                                        shoppings.map(shopping => {
                                            return <Image width={50} src={shopping.drinkImage}/>
                                        })
                                    }
                                </Space>
                            </>
                        )
                    }}
            />
            <Column
                title="订单商品"
                dataIndex="drinkList"
                key="drinkList"
                render={(shoppings: any[]) => {
                    return (
                        <>
                            {
                                shoppings.map(shopping => {
                                    return (
                                        <>
                                            <Tag color={"blue"} style={{marginBottom: "5px"}}>
                                                {shopping.drinkName} * {shopping.drinkNum}
                                            </Tag>
                                            <br/>
                                        </>
                                    )
                                })
                            }
                        </>
                    )
                }}
            />
            <Column
                title="订单总金额"
                dataIndex="total"
                key="total"
            />
            <Column
                title="下单时间"
                dataIndex="time"
                key="time"
                render={
                    (time: string) => {
                        return (
                            <>
                                <div>
                                    {helper.formatDate(time, `{0}/{1}/{2}`)}
                                </div>
                                <div>
                                    {helper.formatDate(time, `{3}:{4}:{5}`)}
                                </div>
                            </>
                        )
                    }
                }
            />

            <Column
                title="用户下单手机号"
                dataIndex="phonenum"
                key="phonenum"
                render={
                    (phone: string) => {
                        return (
                            <>
                                <div>
                                    {
                                        phone ? `${phone.slice(0, 3)}****${phone.slice(-4)}` : "无"
                                    }
                                </div>
                            </>
                        )
                    }
                }
            />
            {
                (
                    <>
                        {
                            props.operation
                                ? <Column
                                    title="操作"
                                    key="action"
                                    render={(text, record: any) => {
                                        return (
                                            <>
                                                {props.operation!(
                                                    () => update(record.orderId)
                                                )}
                                            </>
                                        )
                                    }}
                                />
                                : ""
                        }
                    </>
                )
            }
        </Table>
    )
}
OrderTable = forwardRef(OrderTable);

export default OrderTable;