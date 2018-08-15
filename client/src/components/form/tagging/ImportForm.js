import React, { Component } from 'react';
import { Col, Row, Modal, Form, Input,Layout,Button, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from '../address';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];
const { TextArea } = Input;
const { Footer, Content } = Layout;
const children = [
    <Option key="splitWord">分词标注</Option>,
    <Option key="classWord">词性标注</Option>,
    <Option key="emotionWord">情感标注</Option>,
    <Option key="typeWord">类别标注</Option>,
    <Option key="objectWord">实体标注</Option>
];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }
class CustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.get('/address')
            .then(function (response) {
                response.data.map(function(province){
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function(city){
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function(area){
                                    return {
                                        value: area,
                                        label: area,
                                    }
                                })
                            }
                        }),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    render(){
        const { visible, onCancel, onCreate, form, okText, cancelText, title, upDateFlag,flag } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        console.log('---------------')
        console.log( flag.importVisible)
        console.log('---------------')
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const PhoneBefore = <p style={{ width: 40 }}>+86</p>;
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Modal
                width="80%"
                visible={visible}
                title={title}
                okText={okText}
                cancelText={cancelText}
                onCancel={onCancel}
                onOk={onCreate}
            >
             <Row>
              <Col span={24} style={{textAlign:"center"}}>
              <h3><strong>情感标注1111</strong></h3>
              </Col>
            </Row>
            <Row>
              <Col>
              <Content>
                <Content style={{textAlign: 'center',margin: '2%'}}>
                  {/* <Input onChange={ titleChange } value={ createArticleTitle } placeholder="输入标题..." style={{ width: '60%', marginBottom: '2%' }}/>
                  <TextArea onChange={ contentChange } value={ createArticle } autosize = {{ minRows: 15 }} style={{ width: '60%' }} placeholder = "输入文章内容..."/> */}
                  {flag.importVisible?
                    <Input disabled={true} placeholder="请选择" style={{ width: '90%', marginBottom: '2%' }}/>
                    :
                    <Input placeholder="请输入标题" style={{ width: '90%', marginBottom: '2%' }}/>
                  }
                  {flag.importVisible?
                    <Input disabled={true} placeholder="标注分类" style={{ width: '90%', marginBottom: '2%' }}/>
                    :
                    <Select
                        mode="multiple"
                        style={{ width: '90%', marginBottom: '2%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChange}
                    >
                        {children}
                    </Select>
                  }
                  {flag.importVisible?
                    <TextArea  autosize = {{ minRows: 15 }} style={{ width: '90%',readonly:"readonly" }} value="1231321324561321315431" placeholder = "未找到文章内容"/>
                    :
                    <TextArea  autosize = {{ minRows: 15 }} style={{ width: '90%' }} placeholder = "请输入文章内容..."/>
                  }
                  
                  </Content>
                {/* <Footer style={{textAlign: 'center', marginTop: '3%'}}>
                  <Button type="primary" onClick={create}>确认</Button>
                  <Button type="primary" style={{ marginLeft: '20px'}} onClick={cancel}>取消</Button>
                </Footer> */}
              </Content>
              </Col>
            </Row>
                {/* <Form layout="horizontal">
                    <FormItem label="姓名" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="性别" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: '请选择性别！' }],
                        })(
                            <Radio.Group>
                                <Radio value='男'>男</Radio>
                                <Radio value='女'>女</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="年龄" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: '请输入年龄！' }],
                        })(
                            <InputNumber min={0} max={199} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="地址" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请选择地址！' }],
                        })(
                            <Cascader options={options}/>
                        )}
                    </FormItem>
                    <FormItem label="手机号" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [{
                                pattern: /^1(3|4|5|7|8)\d{9}$/, message: "手机号码格式不正确！"
                            },{
                                required: true, message: '请输入手机号！'
                            }],
                        })(
                            <Input addonBefore={PhoneBefore} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem label="邮箱" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱格式不正确！',
                            }, {
                                required: true, message: '请输入邮箱！',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="网址" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('website', {
                            rules: [{required: true, message: '请输入网址！'}],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                            >
                                <Input/>
                            </AutoComplete>
                        )}
                    </FormItem>
                </Form> */}
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;