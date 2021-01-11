import React, {useEffect, useState} from 'react';
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import {IndexApi} from "../../api/IndexApi";

const HotkownledgeLine = () => {
    let [dataSource, setDataSource] = useState<{
        name: any[],
        value: any[]
    }>({
        name: [],
        value: []
    });
    console.log(1)
    useEffect(()=>{
        IndexApi.get7DayRevenueInfo().then(res=>{
            console.log(res)
            let result:any = {
                name: [],
                value: []
            };
            res.data.forEach((item:any)=>{
                result.name.unshift(item.date.split("T")[0])
                result.value.unshift(item.revenue)
            });
            setDataSource(result);
        })
    },[])
    const getOption = () => {
        return {
            title: {
                text: '过去七天营收'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: dataSource.value
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: dataSource.name
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                // {
                //     name: '环比同期',
                //     type: 'line',
                //     stack: '总量',
                //     areaStyle: {},
                //     data: [1220, 1312, 2101, 1341, 940, 1230, 2210]
                // },
                {
                    name: '过去七天营收',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data: dataSource.value
                }
            ]
        }
    }

    return (
        <ReactEchartsCore
            option={getOption()}
            echarts={echarts}
            style={{height: "60vh"}}
            // notMerge={true}
            // lazyUpdate={true}
            // theme={"theme_name"}?
        />
    )
}

export default HotkownledgeLine;