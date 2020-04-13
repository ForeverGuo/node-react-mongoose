import React,{Component} from 'react';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default class Available extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById(this.props.id));
        myChart.setOption({
            title: {
                text: '页面可用性',
                left: 10,
                top: 5,
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['白屏时间', '首屏时间','总下载时间','用户可操作'],
                x: 'center',
                y: 'bottom',
                padding: 10,
                itemGap: 12,
                textStyle: {
                    color: '#fff'
                },
            },
            grid: {
                left: '5%',
                right: '4%',
                top: '10%',
                bottom: '8%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                name: '/ms',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },
                splitLine:{
            　　    show: false
            　　},
                axisTick:{       
                    show: false
                },
            },
            yAxis: {
                type: 'category',
                name: '单位: 应用名称',
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                nameTextStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },
                splitLine:{
            　　　　show:false
            　　},
                axisTick:{       
                    show: false
                },
            },
            series: [
                {
                    name: '白屏时间',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '首屏时间',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '总下载时间',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '用户可操作',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
            ]
        });
    }
    render() {
        return (
            <div id={this.props.id} style={{width:this.props.width , height:this.props.height + 'px'}}>  
            </div>  
        )
    }
}