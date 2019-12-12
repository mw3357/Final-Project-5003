import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Form } from 'antd';
import TopicForm from './topicForm';
// import {connect} from 'react-redux';
// import {Switch, Route} from 'react-router-dom';
import axios from 'axios';
import TopicStudentTable from './topicStudentTable';
import TopicGroupTable from './topicGroupTable';
import DisplayTopic from './topicDisplay';

const { Header, Content, Sider } = Layout;
// @connect(
//     state => state
// )
class Topic extends React.Component {

    constructor(props) {
        super(props);
        this.GetTopicByWebId();
    }

    state = {
        collapsed: false,
        showTopicForm: true,
        showStudentTable: false,
        showGrouping: false,
        web_id: this.props.match.params.web_id,
        topic: undefined
    };

    TopicFormClickHandler = () => {
        this.setState({ showTopicForm: true, showStudentTable: false, showGrouping: false });
    }

    StudentClickHandler = () => {
        this.setState({ showTopicForm: false, showStudentTable: true, showGrouping: false });
    }

    GroupingClickHandler = () => {
        this.setState({ showTopicForm: false, showStudentTable: false, showGrouping: true });
    }


    GetTopicByWebId = () => {
        console.log("called get topic");
        if (!this.state.web_id) {
            return;
        }

        axios.get('/topic/one/' + this.state.web_id)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    this.setState({ topic: res.data.content[0] });
                    console.log(this.state);
                } else {
                    console.log(res.data.msg)
                }
            });
    };

    render() {
        const WrappedForm = Form.create({ name: 'validate_other' })(TopicForm);
        const WrappedContext = () => {
            if (!this.state.web_id) {
                if (this.state.showTopicForm) {
                    return <Content className="whole-page">
                    <WrappedForm>
                    </WrappedForm>
                    </Content>
                } else if (this.state.showStudentTable) {
                    return <Content className="whole-page">
                        <TopicStudentTable>
                        </TopicStudentTable>
                    </Content>
                } else {
                    return <Content className="whole-page">
                        <TopicGroupTable>
                        </TopicGroupTable>
                    </Content>
                }
            } else {
                if (this.state.showTopicForm) {
                    return <Content className="whole-page">
                    <DisplayTopic topic={this.state.topic}>
                    </DisplayTopic>
                    </Content>
                } else if (this.state.showStudentTable) {
                    return <Content className="whole-page">
                        <TopicStudentTable topic={this.state.topic}>
                        </TopicStudentTable>
                    </Content>
                } else {
                    return <Content className="whole-page">
                        <TopicGroupTable topic={this.state.topic}>
                        </TopicGroupTable>
                    </Content>
                }
            }
        }

        return (
            <Layout>
                <Header className="header">
                    <span className="logo" > Grouper </span>
                </Header>
                <Layout>
                    <Sider
                        theme="light"
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1" onClick={this.TopicFormClickHandler}>
                                <Icon type="form" />
                                <span className="nav-text">Create Topic</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={this.StudentClickHandler}>
                                <Icon type="team" />
                                <span className="nav-text">Students</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.GroupingClickHandler}>
                                <Icon type="profile" />
                                <span className="nav-text">Group Result</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Topic</Breadcrumb.Item>
                        </Breadcrumb>
                        <WrappedContext>
                        </WrappedContext>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Topic
