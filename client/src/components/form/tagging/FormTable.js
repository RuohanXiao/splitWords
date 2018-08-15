import React,
{
  Component
}
from 'react';
import {
  Table,
  Icon,
  Popconfirm
}
from 'antd';
import moment from 'moment';

export
default class FormTable extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const {
        checkChange,
        editClick,
        dataSource,
        loading
      } = this.props;
      const rowSelection = {
        onChange: checkChange,
        getCheckboxProps: record =>({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
        }),
      };
      const columns = [{
        title: '编号',
        dataIndex: 'key',
        sorter: (a, b) =>moment(a.key) - moment(b.key),
        width: 80,
      },
      {
        title: '标题',
        dataIndex: 'title',
        sorter: (a, b) =>moment(a.name) - moment(b.name),
        width: 380,
      },
      {
        title: '标注类型',
        dataIndex: 'type',
        filters: [{
          text: '分词',
          value: 'splitWord'
        },
        {
          text: '词性',
          value: 'classWord'
        },
        {
          text: '情感',
          value: 'emotionWord'
        },
        {
          text: '类别',
          value: 'typeWord'
        },
        {
          text: '实体',
          value: 'objectWord'
        }
        ],
        onFilter: (value, record) =>record.type.indexOf(value) === 0,
        width: 80,
      },
      // {
      //   title: '年龄',
      //   dataIndex: 'age',
      //   sorter: (a, b) => a.age - b.age,
      //   width: 80,
      // }, 
      {
        title: '状态',
        dataIndex: 'status',
        filters: [{
          text: '完成',
          value: 'finish'
        },
        {
          text: '挂起',
          value: 'waiting'
        },
        {
          text: '未标注',
          value: 'new'
        },
        ],
        onFilter: (value, record) =>record.status.indexOf(value) === 0,
        width: 80,
      },
      {
        title: '标注人',
        dataIndex: 'tagUser',
        width: 80,
      },
      // {
      //   title: '地址',
      //   dataIndex: 'address',
      //   width: 180,
      // }, {
      //   title: '手机号',
      //   dataIndex: 'phone',
      //   width: 120,
      // }, {
      //   title: '邮箱',
      //   dataIndex: 'email',
      //   width: 140,
      // }, {
      //   title: '网址',
      //   dataIndex: 'website',
      //   width: 120,
      // }, 
      {
        title: '最后标注日期',
        dataIndex: 'createtime',
        sorter: (a, b) =>moment(a.createtime) - moment(b.createtime),
        width: 150,
      },
      {
        title: '操作',
        dataIndex: 'opera',
        width: 100,
        render: (text, record) =>
          <div className = 'opera' > 
            <span onClick = { () =>editClick(record.key)}><Icon type = "edit" />标注 </span><br /> 
            {/* <span> <Popconfirm title = "确定要删除吗?"onConfirm = { () =>onDelete(record.key)} > <Icon type = "minus-square-o" />删除 </Popconfirm></span >  */}
          </div>
      }
    ];
    return ( <Table
      // rowSelection = {
      //   rowSelection
      // }
      columns = {
        columns
      }
      fixed={true}
      onClick = { () =>console.log(this.record)}
      dataSource = {
        dataSource
      }
      bordered = {
        true
      }

      scroll = {
        {
          x: '100%'
        }
      }
      className = 'formTable'
      loading = {
        loading
      }
      /> )
      }
    }