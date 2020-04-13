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
        console.log(this.props);
    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById(this.props.id));
        myChart.setOption({
            title: {
                text: '元素响应时间',
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
                        {value:1,itemStyle: {color : '#fcbb6e'}},
                        {value:1,itemStyle: {color : '#4bc4fa'}},
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
                        {value:20, name:'DNS解析',itemStyle: {color : '#39d786'}},
                        {value:335, name:'首字节',itemStyle: {color : '#7a8cff'}},
                        {value:100, name:'SSL握手',itemStyle: {color : '#baf56d'}},
                        {value:70, name:'连接建立',itemStyle: {color : '#f9e87a'}},
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