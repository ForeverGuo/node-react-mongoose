import React,{Component} from 'react';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import routes from '@/router/index';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;


export default class ContentContain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content className="layout_contain">  
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                {renderRoutes(routes)}
            </Content>
        )
    }
}