import React,{Component} from 'react';
import Consearch from '../Consearch'
import {get, post} from '@/axios/index.js'
import './module.css';
import { Table ,Divider, Tag , Pagination , Spin} from 'antd';
const { Column, ColumnGroup } = Table;
export default class module extends Component {
    constructor(props) {
      super(props);
      this.state = {
        table_data: [],
        setRowClassName: '',
        formItem: {
            //部门
            part: '',
            // 业务
            business: '',
            // 开始时间
            begin_time: '',
            // 结束时间
            end_time: ''
        },
        // 分页对象
        pageItem: {
            // 页码
            page: 1,
            // 数据总和
            total: 0,
            // 数据起始index
            offset: 0,
            // 每页数据量
            limit: 10,
        },
        loading: false
      }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.getModuleContent();
    }
    getConsearchMsg = (result) => {
      console.log(result.state);
      this.state.formItem.app_name = result.state.app_name;
      this.state.formItem.business = result.state.business;
      this.getModuleContent();
    }
    // 鼠标划入 选中行
    onClickRow = (record) => {
      return {
        onMouseEnter: () => {
          this.setState({
            setRowClassName: 'hoverRowSty',
          });
        },
      };
    }
    /**
     * @description 相关部门 list
     */
    getModuleContent = () => {
      this.setState({
        loading: true
      })
      post('/moduleContent',Object.assign(this.state.formItem, this.state.pageItem)).then((res) => {
            let result = JSON.parse(res);
            console.log(result.data.contents);
            if ((result.code == 0) && (result.data.contents.length > 0)) {
                result.data.contents.forEach((item,index) => {
                  item.key = index;
                })
                this.setState({
                  table_data: result.data.contents,
                  pageItem: {
                      // 页码
                      page: 1,
                      // 数据总和
                      total: result.data.pages,
                      // 数据起始index
                      offset: 0,
                      // 每页数据量
                      limit: 10,
                  },
                  loading: false
                })
            }
        })
    }
    /**
     * @description 分页点击事件
     * @author grantguo
     */
    resetContent = (num) => {
      this.state.pageItem.page = num;
      this.getModuleContent();
    }
    render() {
      return (
        <div>
            <Consearch parent={ this } />
            <h3 className="common-title">系统详情</h3>
            <Spin spinning={this.state.loading} tip="Loading...">            
                <Table 
                  className="errorContent"
                  rowClassName={this.state.setRowClassName}
                  dataSource={this.state.table_data}
                  onRow={this.onClickRow}
                  bordered
                >
                  <Column title="应用名称" dataIndex="app_name" key="app_name" align="center" />
                  <Column title="业务线" dataIndex="business" key="business" align="center" />
                  <Column title="应用负责人" dataIndex="operator" key="operator" align="center" />
                  <Column title="创建时间" dataIndex="create_time" key="create_time" align="center" />
                  <Column 
                      title="操作" 
                      align="center" 
                      render={(text, record) => (
                        <span>
                          <a>编辑</a>
                        </span>
                      )}
                  />
                </Table>
              </Spin>
              <Pagination 
                defaultCurrent={this.state.pageItem.page} 
                defaultPageSize={this.state.pageItem.limit} 
                total={this.state.pageItem.total} 
                onChange={this.resetContent}
              />
        </div>
      )
    }
}
