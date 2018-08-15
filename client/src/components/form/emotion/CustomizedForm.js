import React, { Component } from 'react';
import { Col, Row, Modal, Form, Input,Layout,Button, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';

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
        const { visible, onCancel, onCreate, form, okText, cancelText, title, upDateFlag } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        console.log('---------------')
        console.log( this.props)
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
              <h3><strong>情感标注</strong></h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Content>
                  <Content style={{textAlign: 'center',margin: '2%'}}>
                    {/* <Input onChange={ titleChange } value={ createArticleTitle } placeholder="输入标题..." style={{ width: '60%', marginBottom: '2%' }}/>
                    <TextArea onChange={ contentChange } value={ createArticle } autosize = {{ minRows: 15 }} style={{ width: '60%' }} placeholder = "输入文章内容..."/> */}
                    {upDateFlag.isUpdate?
                      <Input disabled={true} placeholder="请选择" style={{ width: '90%', marginBottom: '2%' }}/>
                      :
                      <Input placeholder="请输入标题" style={{ width: '90%', marginBottom: '2%' }}/>
                    }
                    {upDateFlag.isUpdate?
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
                    {upDateFlag.isUpdate?
                      <TextArea  autosize = {{ minRows: 15 }} style={{ width: '90%',readonly:"readonly" }} value="1231321324561321315431" placeholder = "未找到文章内容"/>
                      :
                      <TextArea  autosize = {{ minRows: 15 }} style={{ width: '90%' }} placeholder = "请输入文章内容..."/>
                    }
                  </Content>
                </Content>
              </Col>
            </Row>
          </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;