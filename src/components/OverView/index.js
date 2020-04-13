import React,{Component} from 'react';
import { Row, Col } from 'antd';
import Available from '../Available';
import Consearch from '../Consearch'
import './overview.css';
export default class Overview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Consearch />
                <h3 className="common-title">关键指标</h3>
                <div className="gutter-example">
                    <Row>
                        <Col span={24}>
                            <div className="gutter-box">
                                <Available id="availabel" width="80vw" height="650" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
