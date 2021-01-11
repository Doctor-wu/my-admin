import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

type SourceDataType = {
    problemName: string;
    /** 热门奶茶 */

    hotValue: number;
}[];

const Hotkownledge: React.FC = () => {
    /** 为了便于维护，将设置的数据进行处理，再转为echarts能用的数据 */
    /** 源数据 */
    const sourceData: SourceDataType = [
        { problemName: '多肉芒芒甘露', hotValue: 53 },
        { problemName: '芝芝桃桃', hotValue: 63 },
        { problemName: '芝芝绿妍', hotValue: 36 },
        { problemName: '芝芝金玉', hotValue: 51 },
        { problemName: '豆豆波波茶', hotValue: 32 },
        { problemName: '芋泥波波牛乳', hotValue: 88 },
        { problemName: '雪山香草拿铁', hotValue: 45 },
        { problemName: '芝芝莓莓', hotValue: 41 },
        { problemName: '芝芝咖啡', hotValue: 32 },
        { problemName: '测试', hotValue: 11 },
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
                subtext: '30天内奶茶销量排名'
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
            style={{ background: '#fff', height: '60vh' }}
            echarts={echarts}
            option={getOption()}
        />
    );
};
export default Hotkownledge;