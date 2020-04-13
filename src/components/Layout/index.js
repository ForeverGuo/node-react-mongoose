import React,{Component} from 'react';
import { Layout } from 'antd';

import Header from './header'
import Aside from './aside'
import Contain from './container'
import style from '@/assets/css/style.css';

export default class LayoutContain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Layout>
            <Header />
            <Layout>
            <Aside />
            <Layout style={{ padding: '0 24px' }}>
                <Contain />
            </Layout>
            </Layout>
        </Layout>
        )
    }
}

