import React, { Component } from 'react';
import '../form.less';
import moment from 'moment';
import axios from 'axios';
import Mock from 'mockjs';
import { Select, Form, Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm } from 'antd';

import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import address from '../address.json';
import data from '../data.json';
import CollectionCreateForm from './CustomizedForm';
// import EmotionCheck from './EmotionCheck';
import FormTable from './FormTable';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;
Mock.mock('/address', address);
Mock.mock('/data', data);

//数组中是否包含某项
function isContains(arr, item) {
  arr.map(function (ar) {
    if (ar === item) {
      return true;
    }
  });
  return false;
}
//找到对应元素的索引
function catchIndex(arr, key) { //获取INDEX
  arr.map(function (ar, index) {
    if (ar.key === key) {
      return index;
    }
  });
  return 0;
}
//替换数组的对应项
function replace(arr, item, place) { //arr 数组,item 数组其中一项, place 替换项
  arr.map(function (ar) {
    if (ar.key === item) {
      arr.splice(arr.indexOf(ar), 1, place)
    }
  });
  return arr;
}

export default class UForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      address: '',
      timeRange: '',
      visible: false, //新建窗口隐藏
      dataSource: [],
      count: data.length,
      selectedRowKeys: [],
      tableRowKey: 0,
      isUpdate: false,
      loading: true,
    };
  }
  //getData
  getData = () => {
    axios.get('/data')
      .then(function (response) {
        // console.log(response.data);
        this.setState({
          dataSource: response.data,
          loading: false
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
  };
  //用户名输入
  onChangeUserName = (e) => {
    const value = e.target.value;
    this.setState({
      userName: value,
    })
  };
  //用户名搜索
  onSearchUserName = (value) => {
    // console.log(value);
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.filter(item => item.name.indexOf(value) !== -1),
      loading: false,
    })
  };
  //地址级联选择
  Cascader_Select = (value) => {
    const { dataSource } = this.state;
    if (value.length === 0) {
      this.setState({
        address: value,
        dataSource: [],
      });
      this.getData();
    } else {
      this.setState({
        address: value,
        dataSource: dataSource.filter(item => item.address === value.join(' / '))
      });
    }
  };
  //时间选择
  RangePicker_Select = (date, dateString) => {
    // console.log(date, dateString);
    const { dataSource } = this.state;
    const startime = moment(dateString[0]);
    const endtime = moment(dateString[1]);
    if (date.length === 0) {
      this.setState({
        timeRange: date,
        dataSource: [],
      });
      this.getData();
    } else {
      this.setState({
        timeRange: date,
        dataSource: dataSource.filter(item => (moment(item.createtime.substring(0, 10)) <= endtime && moment(item.createtime.substring(0, 10)) >= startime) === true)
      });
    }
  };
  //渲染
  componentDidMount() {
    axios.get('/address')
      .then(function (response) {
        response.data.map(function (province) {
          options.push({
            value: province.name,
            label: province.name,
            children: province.city.map(function (city) {
              return {
                value: city.name,
                label: city.name,
                children: city.area.map(function (area) {
                  return {
                    value: area,
                    label: area,
                  }
                })
              }
            }),
          })
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getData();
  }
  //搜索按钮
  btnSearch_Click = () => {

  };

  //重置按钮
  btnClear_Click = () => {
    this.setState({
      userName: '',
      address: '',
      timeRange: '',
      dataSource: [],
      count: data.length,
    });
    this.getData();
  };
  //新建信息弹窗
  CreateItem = () => {
    this.setState({
      visible: true,
      isUpdate: false,
    });
    const form = this.form;
    form.resetFields();
  };
  //接受新建表单数据
  saveFormRef = (form) => {
    this.form = form;
  };
  //填充表格行
  handleCreate = () => {
    const { dataSource, count } = this.state;
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      values.key = count;
      values.address = values.address.join(" / ");
      values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

      form.resetFields();
      this.setState({
        visible: false,
        dataSource: [...dataSource, values],
        count: count + 1,
      });
    });
  };
  //取消
  handleCancel = () => {
    this.setState({ visible: false });
  };
  //批量删除
  MinusClick = () => {
    const { dataSource, selectedRowKeys } = this.state;
    this.setState({
      dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.key)),
    });
  };
  //单个删除
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  //点击修改
  editClick = (key) => {
    const form = this.form;
    console.log(this.state);
    const { dataSource } = this.state;
    const index = catchIndex(dataSource, key);
    form.setFieldsValue({
      key: key,
      name: dataSource[index].name,
      sex: dataSource[index].sex,
      age: dataSource[index].age,
      address: dataSource[index].address.split(' / '),
      phone: dataSource[index].phone,
      email: dataSource[index].email,
      website: dataSource[index].website,
    });
    this.setState({
      visible: true,
      tableRowKey: key,
      isUpdate: true,
    });
  };
  //更新修改
  handleUpdate = () => {
    const form = this.form;
    const { dataSource, tableRowKey } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      values.key = tableRowKey;
      values.address = values.address.join(" / ");
      values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

      form.resetFields();
      this.setState({
        visible: false,
        dataSource: replace(dataSource, tableRowKey, values)
      });
    });
  };
  //单选框改变选择
  checkChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys: selectedRowKeys });
  };
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    const { userName, address, timeRange, dataSource, visible, isUpdate, loading } = this.state;
    const questiontxt = () => {
      return (
        <p>
          <Icon type="plus-circle-o" /> : 新建信息<br />
          <Icon type="minus-circle-o" /> : 批量删除
                </p>
      )
    };
    return (
      <div>
        <BreadcrumbCustom paths={['首页', '标注', '情感标注']} />
        <div className='formBody'>
          <Row gutter={16}>
            <Col span={2}>
            </Col>
            <Col span={20}>
              <Col className="gutter-row" sm={5} >
                <Input 
                  placeholder="编号"
                  prefix={<Icon type="key" />}
                  value={userName}
                  onChange={this.onChangeUserName}
                  onSearch={this.onSearchUserName}
                />
              </Col>
              <Col className="gutter-row" sm={5} offset={1}>
                <Input 
                  placeholder="标题"
                  prefix={<Icon type="profile" />}
                  value={userName}
                  onChange={this.onChangeUserName}
                />
              </Col>
              <Col className="gutter-row" sm={5} offset={1}>
                <Select style={{ width: '100%' }} onChange={this.handleChange} allowClear="true" placeholder="标注类型">
                  <Option value="splitWord">分词标注</Option>
                  <Option value="classWord">词性标注</Option>
                  <Option value="emotionWord">情感标注</Option>
                  <Option value="typeWord">类别标注</Option>
                  <Option value="objectWord">实体标注</Option>
                </Select>
              </Col>
              <Col className="gutter-row" sm={5} offset={1}>
                <Select style={{ width: '100%' }} onChange={this.handleChange} allowClear="true" placeholder="标注状态">
                  <Option value="finish">完成</Option>
                  <Option value="waiting">挂起</Option>
                  <Option value="new">未标注</Option>
                </Select>
              </Col>
              <Col className="gutter-row" sm={5}>
                <Input 
                  placeholder="标注人"
                  prefix={<Icon type="team" />}
                  value={userName}
                  onChange={this.onChangeUserName}
                />
              </Col>
              <Col className="gutter-row" sm={5} offset={1}>
                <RangePicker placeholder={['标注开始日期', '标注结束日期']} style={{ width: '100%' }} onChange={this.RangePicker_Select} value={timeRange} />
              </Col>
            </Col>

            <Col span={2}>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* <div className='plus' onClick={this.CreateItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="确定要批量删除吗?" onConfirm={this.MinusClick}>
                                <Icon type="minus-circle" />
                            </Popconfirm>
                        </div>
                        <div className='question'>
                            <Tooltip placement="right" title={questiontxt}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </div> */}
            <div className='btnOperaCenter'>
              <Button type="primary" onClick={this.btnSearch_Click} style={{ margin: '10px' }}>标注查询</Button>
              <Button type="info" onClick={this.btnClear_Click} style={{ margin: '10px', backgroundColor: "geekblue" }}>重置条件</Button>

              <Button type="info" onClick={this.CreateItem} style={{ margin: '10px', backgroundColor: "#87d068", color: "white" }}>新增标注</Button>
              <Button type="info" onConfirm={this.MinusClick} style={{ margin: '10px', backgroundColor: "#f50", color: "white" }}>批量删除</Button>
            </div>
          </Row>
          <FormTable onClick = { () =>
          // {
            // this.editClick(this.record.key);
            alert(this.record.key)}
          // }
            dataSource={dataSource}
            checkChange={this.checkChange}
            onDelete={this.onDelete}
            editClick={this.editClick}
            loading={loading}
          />
          {isUpdate ?
            <CollectionCreateForm upDateFlag={{ isUpdate }} style={{ textAlign: 'center', margin: '5%' }} ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="情感标注" okText="保存当前标注" cancelText="放弃当前标注"
            /> : <CollectionCreateForm upDateFlag={{ isUpdate }} style={{ textAlign: 'center', margin: '5%' }} ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="创建标记任务" okText="创建任务" cancelText="放弃创建任务"
            />}
          {/* {isUpdate?
                    <EmotionCheck/> :  <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="新建信息" okText="创建"
                    />} */}
        </div>
      </div>
    )
  }
}