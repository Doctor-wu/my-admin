import React from "react";
import CommodityTable from "../components/Commondity/CommondityTable";
import PipeDecorator from "../utils/pipe-decorator";
import CommodityModal, {commodityModalMode} from "../components/Commondity/CommodityModal";
import {Button, Row, Space} from "antd";
import {PlusCircleOutlined, RedoOutlined} from "@ant-design/icons";

@PipeDecorator
class CommodityList extends React.Component {
    ModalMode: commodityModalMode = commodityModalMode.attach;
    ModalDataSource = {};

    setModalMode = (mode: commodityModalMode) => {
        this.setState({
            ModalMode: mode
        });
    }

    refresh() {
        // @ts-ignore
        this.refs.table.getDataSource();
        this.setState({
            ModalMode: commodityModalMode.attach,
            ModalDataSource: undefined
        });
    }

    updateCommodity(data: any) {
        data["price"] = Number(data["price"]);
        console.log(this)
        // @ts-ignore
        this.refs.modal.updateState({
            mode: commodityModalMode.edit,
            fields: Object.keys(data).map(key => ({
                name: key,
                value: data[key]
            }))
        });
        // @ts-ignore
        this.refs.modal.showModal();
    }


    render() {
        return (
            <>
                <Row style={{margin: "15px 0 15px 0"}}>

                    <Space size="middle">
                        {
                            // @ts-ignore
                            <CommodityModal ref="modal" mode={this.ModalMode} ModalDataSource={this.ModalDataSource}
                                            parent={this}>
                                {(showModal: any) => {
                                    return (
                                        <Button type="primary" onClick={showModal} ghost>
                                            <PlusCircleOutlined/>
                                            添加商品
                                        </Button>
                                    )
                                }}
                            </CommodityModal>
                        }

                        <Button type="ghost" onClick={this.refresh.bind(this)}>
                            <RedoOutlined/>
                            刷新
                        </Button>
                    </Space>
                </Row>
                <CommodityTable parent={this} updateCommodity={this.updateCommodity} ref="table"/>
            </>
        );
    }
}


export default CommodityList;
