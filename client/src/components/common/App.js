import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../index/Index';
import Calendars from '../header/Calendars';
import Echarts from '../chart/echarts/Echarts';
import UFormTagging from '../form/tagging/Form';
import UFormEmotion from '../form/emotion/Form';
import noMatch from './404';
import RichText from "../richText/RichText";
import UploadEditor from "../upload/UploadEditor";

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        if (localStorage.getItem("mspa_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(localStorage.getItem("mspa_user")).username : location.state.username;
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app'} component={MIndex} />
                            <Route exact path={'/app/form/tagging'} component={UFormTagging} />
                            <Route exact path={'/app/form/emotion'} component={UFormEmotion} />
                            <Route exact path={'/app/header/Calendars'} component={Calendars} />
                            <Route exact path={'/app/chart/echarts'} component={Echarts} />
                            <Route exact path={'/app/richText'} component={RichText} />
                            <Route exact path={'/app/upload'} component={UploadEditor} />
                            <Route component={noMatch} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        版权所有©2018-2019 中国科学院计算技术研究所 
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
