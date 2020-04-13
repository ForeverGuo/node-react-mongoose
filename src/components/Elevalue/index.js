import React,{Component} from 'react';
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


export default class Response extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById(this.props.id));
        myChart.setOption({
            title: {
                text: '元素可用性',
                left: 15,
                top: 10,
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip: {},
            series: [
                {
                    name:'',
                    type:'pie',
                    selectedMode: 'single',
                    hoverAnimation: false,
                    radius: [0, '30%'],
        
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:1,itemStyle: {color : '#7b8dff'}},
                    ]
                },
                {
                    name:'',
                    type:'pie',
                    radius: ['45%', '60%'],
                    minAngle: 15,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: '16'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {value:220, name:'其他错误',itemStyle: {color : '#4cc1f9'}},
                        {value:335, name:'连接超时',itemStyle: {color : '#76f2c1'}},
                        {value:100, name:'DNS解析故障',itemStyle: {color : '#4eb0f9'}},
                    ],
                }
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