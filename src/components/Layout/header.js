import React,{Component} from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { Header } = Layout;

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
            <Icon type="poweroff" style={{paddingRight: 15}} />
            退出
        </a>
      </Menu.Item>
    </Menu>
  );

export default class HeaderContain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'grantguo'
        }
    }

    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                    您好，{this.state.userName}
                    <Icon type="down" />
                    </a>
                </Dropdown>
            </Header> 
        )
    }
}
