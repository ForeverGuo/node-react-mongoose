import React,{Component} from 'react';
import {get, post} from '@/axios/index.js'
import { DatePicker , Button , Select , Input } from 'antd';
import './consearch.css';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select;
export default class Consearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 业务列表
            busi_list: [],
            // 应用名称
            app_name: '',
            // 业务线
            business: '',
            //开始时间
            begin_time: '',
            //结束时间
            end_time: ''
        }
    }
    componentDidMount() {
        this.getBusinessList();
    }
    /**
     * @description 选择开始时间事件
     * @author grantguo
     */
    selectBeginTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        if (dateString) {
            this.setState({
                begin_time : dateString
            })
        }
    }
    /**
     * @description 选择结束时间事件
     * @author grantguo
     */
    selectEndTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        if (dateString) {
            this.setState({
                end_time : dateString
            })
        }
    }
    /**
     * @description 确认时间ok
     * @author grantguo
     */
    onOk = (value) => {
        console.log('onOk: ', value);
        console.log(this.state);
    }
     /**
     * @description 获取业务线列表
     * @author grantguo
     */
    getBusinessList = () => {
        post('/BusinessList',{}).then((res) => {
            let result = JSON.parse(res);
            console.log(result);
            if (result.code == 0) {
                this.setState({
                    busi_list: result.data
                })
            }
        })
        console.log(this.state.busi_list);
    }
    /**
     * @description 应用名称的输入事件
     * @author grantguo
     */
    changeInput = (e) => {        
        if (e) {
            console.log(e.target.value);
            this.setState({
                app_name: e.target.value != '' ? e.target.value : ''
            })
        }
    }
    /**
     * @description 选择业务事件
     * @author grantguo
     */
    selectBusi = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            business: value
        })
    }
    
    /**
     * @description 查询按钮事件
     * @author grantguo
     */
    toPerfor = () => {
        this.props.parent.getConsearchMsg(this);
    }

    render() {
        return (
            <div className="content_search">
                <label className="label_title">应用名称</label>
                <Input 
                    className="app_input" 
                    placeholder="应用名称"
                    onChange={this.changeInput}
                    allowClear
                />
                <label className="label_title">业务线</label>
                <Select 
                    placeholder="请选择" 
                    value={this.state.business === '' ? undefined : this.state.business} 
                    className="select_input" style={{minWidth: 180}} onChange={this.selectBusi}>
                    {
                        this.state.busi_list.map((item,index) => {
                            return <Option key={index} value={item.value}>{item.value}</Option>
                        })
                    }
                </Select>
                <label className="label_title">开始时间</label>
                <DatePicker 
                    locale={locale} 
                    // value={this.state.begin_time === '' ? undefined : this.state.begin_time}
                    format="YYYY-MM-DD HH:mm:ss" 
                    showTime 
                    placeholder="请选择开始时间" 
                    onChange={this.selectBeginTime} 
                    onOk={this.onOk} 
                />
                <label className="label_title">结束时间</label>
                <DatePicker 
                    locale={locale}
                    // value={this.state.end_time === '' ? undefined : this.state.end_time}
                    format="YYYY-MM-DD HH:mm:ss" 
                    showTime 
                    placeholder="请选择结束时间" 
                    onChange={this.selectEndTime} 
                    onOk={this.onOk} 
                />
                <Button type="primary" icon="search" onClick={ this.toPerfor }>查 询</Button>
            </div>  
        )
    }
}