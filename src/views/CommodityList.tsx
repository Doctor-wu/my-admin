import React from "react";
import {CommodityListApi} from "../api/CommodityListApi";
import {Space, Table, Tag} from 'antd';

const {Column} = Table;

class CommodityList extends React.Component {
    commodityList = [];
    loading = true;

    UNSAFE_componentWillMount() {
        CommodityListApi.getCommodityList().then(res => {
            console.log(res)
            this.commodityList = res.data;
            this.loading = false;
            this.forceUpdate()
        });
    }

    render() {
        return (
            <>
                <Table dataSource={this.commodityList} rowKey={(record: any) => record.id} loading={this.loading}>
                    <Column title="商品名" dataIndex="name" key="name"/>
                    <Column title="商品价格" dataIndex="price" key="id"/>
                    <Column
                        title="Type"
                        dataIndex="type"
                        key="id"
                        render={type => (
                            <Tag color="blue">
                                {type}
                            </Tag>
                        )}
                    />
                    <Column
                        title="操作"
                        key="operate"
                        render={(text, record: any) => (
                            <Space size="middle">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </>
        );
    }
}


// function CommodityList() {
//     let [commodity, setCommodity] = useState<any>();
//     useEffect(() => {
//         CommodityListApi.getCommodityList().then(res => {
//             console.log(res)
//             setCommodity(res);
//         });
//     })
//     return (
//
//     )
// }

export default CommodityList;
