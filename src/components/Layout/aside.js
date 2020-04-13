import React,{Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter} from 'react-router-dom';
import routes from '@/router/index';

const { SubMenu } = Menu;
const { Sider } = Layout;

class AsideContain extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.history.location.pathname);
        this.state = {
            rootSubmenuKeys : [],
            openKeys: [],
            current: '',
        }
    }
    componentWillMount() {
        routes.forEach((item,index) => {
            this.state.rootSubmenuKeys.push(item.name);
            if (this.props.history.location.pathname == item.path) {
                this.state.openKeys.push(item.name);
                this.setState({
                    current: `${index}`
                })
            }
        });
    }
    componentDidMount() {
        
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    }
    changeHash = (path) => { 
        var _that = this;
        return (e) => {
            _that.props.history.push(`${path}`);
        }
    }
    render() {
        return (
            <Sider width={200}>
                <Menu
                mode="inline"
                theme="dark"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                defaultSelectedKeys={[this.state.current]}
                style={{ height: '100%', borderRight: 0 }}
                >
                {
                    routes.map((route,i) => {
                        return  route.children ? (
                            <SubMenu 
                                key={route.key} 
                                title={<span>
                                    <Icon type={route.icon} />
                                    {route.title}
                                </span>}
                            >
                                {
                                    route.children.map((item,j) => {
                                            return <Menu.Item key={j} onClick={this.changeHash(`${item.path}`)}>
                                                {/* <Link key={j} to={item.path}> */}
                                                    {item.title}
                                                {/* </Link> */}
                                            </Menu.Item>
                                    })
                                }
                            </SubMenu>
                            ) : (
                                <Menu.Item key={i} onClick={this.changeHash(`${route.path}`)}>
                                    <Icon type={route.icon} />
                                    <span>
                                        {/* <Link key={route.key} to={route.path}> */}
                                            {route.title}
                                        {/* </Link> */}
                                    </span>
                                </Menu.Item>
                            )
                    })
                }
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(AsideContain);