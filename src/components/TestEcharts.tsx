import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

type SourceDataType = {
    problemName: string;
    /** 热门问题火热度 */

    hotValue: number;
}[];

const Hotkownledge: React.FC = () => {
    /** 为了便于维护，将设置的数据进行处理，再转为echarts能用的数据 */
    /** 源数据 */
    const sourceData: SourceDataType = [
        { problemName: '问题一', hotValue: 164 },
        { problemName: '问题二', hotValue: 264 },
        { problemName: '问题三', hotValue: 1034 },
        { problemName: '问题四', hotValue: 412 },
        { problemName: '问题五', hotValue: 122 },
        { problemName: '问题六', hotValue: 697 },
        { problemName: '问题七', hotValue: 426 },
    ];
    /** 对数据进行排序，根据hotValue值的大小，由小到大进行排序 */
    sourceData.sort((a, b) => {
        return a.hotValue - b.hotValue;
    });

    /** 数据处理渲染echarts */
    const problemName: string[] = [];
    sourceData.forEach(item => {
        problemName.push(item.problemName);
    });
    const hotValue: number[] = [];
    sourceData.forEach(item => {
        hotValue.push(item.hotValue);
    });

    const getOption = () => {
        return {
            title: {
                text: '奶茶销量排行',
                subtext: '统计前7名奶茶'
            },
            grid: {
                y: 70,
                x: 78,
            },
            xAxis: {
                type: 'value',
                show: false,
            },
            yAxis: {
                type: 'category',
                data: problemName
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 20,
                    data: hotValue,
                    itemStyle: {
                        normal: {
                            color: '#5B8FF9',
                        },
                    },
                    label: {
                        color: '#f6f6f6',
                        show: true,
                        position: 'insideLeft',
                    },
                },
            ],
            tooltip: {},
        };
    };
    return (
        <ReactEchartsCore
            style={{ background: '#fff', height: '376px' }}
            echarts={echarts}
            option={getOption()}
        />
    );
};
export default Hotkownledge;