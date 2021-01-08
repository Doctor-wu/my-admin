import React from "react";
import {CommodityListApi} from "../api/CommodityListApi";
import {Space, Table, Tag} from 'antd';

const {Column, ColumnGroup} = Table;

class CommodityList extends React.Component {
    commodityList = [];
    loading = true;

    componentWillMount() {
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
                <Table dataSource={this.commodityList} loading={this.loading}>
                    <Column title="商品名" dataIndex="name" key="id"/>
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
                        key="id"
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
