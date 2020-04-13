import React,{Component} from 'react';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/radar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default class Response extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById(this.props.id));
        myChart.setOption({
            title: {
                text: '元素性能评估',
                left: 15,
                top: 10,
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip: {},
            radar: [
                {
                    indicator: [
                        { text: '静态资源CDN使用' },
                        { text: '图片压缩' },
                        { text: '连接保持' },
                        { text: '静态资源' },
                        { text: '首字节' }
                    ],
                    center: ['50%', '50%'],
                    radius: 80,
                    startAngle: 90,
                    splitNumber: 4,
                    name: {
                        formatter:'{value}',
                        textStyle: {
                            color:'#fff',
                            fontSize: '15'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#272e349e'],
                            shadowColor: '#272e349e',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#5b6a7738'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#5b6a7738',
                            width: 1
                        }
                    }
                },
            ],
            series: [
                {
                    name: '',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color:"#276a7b",
                                width: 2
                            },
                            areaStyle: {
                                color: '#175261'
                            }
                        }
                    },
                    data: [
                        {
                            value: [60, 5, 0.30, -100, 100],
                            name: '',
                            symbol: 'none',
                        }
                    ]
                },
            ]
        });
    }
    render() {
        return (
            <div id={this.props.id} style={{width:this.props.width + 'px',height:this.props.height + 'px'}}>  
            </div>  
        )
    }
}