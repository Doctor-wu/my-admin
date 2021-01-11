import React from "react";
import BannerTable from "../components/Banner/BannerTable";
import PipeDecorator from "../utils/pipe-decorator";
import BannerModal, {bannerModalMode} from "../components/Banner/BannerModal";
import {Button, Row, Space} from "antd";
import {RedoOutlined} from "@ant-design/icons";

@PipeDecorator
class BannerList extends React.Component {
    ModalMode: bannerModalMode = bannerModalMode.edit;
    ModalDataSource = {};

    setModalMode = (mode: bannerModalMode) => {
        this.setState({
            ModalMode: mode
        });
    }

    refresh() {
        // @ts-ignore
        this.refs.table.getDataSource();
        this.setState({
            ModalMode: bannerModalMode.edit,
            ModalDataSource: undefined
        });
    }

    updateBanner(data: any) {
        console.log(this)
        // @ts-ignore
        this.refs.modal.updateState({
            mode: bannerModalMode.edit,
            fields: Object.keys(data).map(key => ({
                name: key,
                value: data[key]
            }))
        });
        // @ts-ignore
        this.refs.modal.showModal();
    }

    // UNSAFE_componentWillMount() {
    //     BannerApi.getBannerList().then(res => {
    //         console.log(res)
    //         this.bannerList = res.data.map((url:string,index:number)=>({
    //             image: url,
    //             id:index+1
    //         }));
    //         this.loading = false;
    //         this.forceUpdate()
    //     });
    // }

    render() {
        return (
            <>
                <Row style={{margin: "15px 0 15px 0"}}>
                    <Space size="middle">
                        {
                            // @ts-ignore
                            <BannerModal ref="modal" mode={this.ModalMode} ModalDataSource={this.ModalDataSource}
                                            parent={this}>
                                {(showModal: any) => {
                                    return (
                                        <></>
                                    )
                                }}
                            </BannerModal>
                        }

                        <Button type="ghost" onClick={this.refresh.bind(this)}>
                            <RedoOutlined/>
                            刷新
                        </Button>
                    </Space>
                </Row>
                <BannerTable parent={this} updateBanner={this.updateBanner} ref="table"/>
            </>
        );
    }
}

export default BannerList;
