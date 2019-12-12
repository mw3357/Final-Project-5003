import { Button, Descriptions, Icon, Modal, Form, Input, Select } from 'antd';
import React from 'react';
import axios from 'axios';

const { Option } = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, skills } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    style={{ top: 15 }}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="First Name">
                            {getFieldDecorator('first_name', {
                                rules: [{ required: true, message: 'Please enter your first name' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Last Name">
                            {getFieldDecorator('last_name', {
                                rules: [{ required: true, message: 'Please enter your last name' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please add proper email' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Skills">
                            {getFieldDecorator('skills', {
                                rules: [{ required: true, message: 'Please add at least one skill' }],
                            })(
                                <Select
                                    mode="multiple"
                                    placeholder="select at least one skill"
                                >
                                    {skills.map(d => (
                                        <Option key={d}>{d}</Option>
                                    ))}
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class DisplayTopic extends React.Component {

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.post('/topic/add-student', { web_id: this.props.topic.web_id, student: values })
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        //this.setState({web_id: res.data.content.web_id});
                        console.log("saved!", res);
                    } else {
                        console.log(res.data.msg)
                    }
                    form.resetFields();
                    this.setState({ visible: false });
                });

        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    formatSkills = (skills) => {
        if (!skills) {
            return;
        }
        return skills.join(", ");
    }

    render() {
        let topic = {};
        let skills = [];
        if (this.props.topic) {
            topic = this.props.topic;
            skills = this.props.topic.skills;
        }

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus-circle" /> Join
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    skills={skills}
                />
                <Descriptions
                    title={"Project (ID: " + topic.web_id + ")"}
                    bordered
                    column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Project Name">{topic.title}</Descriptions.Item>
                    <Descriptions.Item label="Difficulty">{topic.difficulty}</Descriptions.Item>
                    <Descriptions.Item label="Create Date">{topic.created_at}</Descriptions.Item>
                    <Descriptions.Item label="Due Date">{topic.end_at}</Descriptions.Item>
                    <Descriptions.Item label="Required Skills">{this.formatSkills(topic.skills)}</Descriptions.Item>
                    <Descriptions.Item label="Max Team Size">{topic.max_team_size}</Descriptions.Item>
                    <Descriptions.Item label="Detailed Descriptions of the Assignment">
                        {topic.desc}
                        <br />

                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default DisplayTopic;
