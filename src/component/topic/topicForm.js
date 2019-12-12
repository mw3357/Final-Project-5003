import React from 'react';
import axios from 'axios';
import {
    Input,
    Form,
    Select,
    InputNumber,
    Switch,
    DatePicker,
    Alert,
    Button,
    Upload,
    Icon,
    Rate,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

class TopicForm extends React.Component {
    
    state = {
        fieldDisabled: false,
        web_id: undefined,
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleSubmit = e => {
        this.setState({fieldDisabled: true});
        console.log(this.state);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.start_at = values.startEnd[0].toDate();
                values.end_at = values.startEnd[1].toDate();
                axios.post('/topic/add', {values})
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.setState({web_id: res.data.content.web_id});
                        console.log("saved!", res);
                    } else {
                        console.log(res.data.msg)
                    }
                });
            } else {
                console.err(err);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 16},
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {
                    this.state.web_id ? 
                        <Alert message={"Created New Topic with ID: " + this.state.web_id} type="success" showIcon /> : 
                        null
                }

                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'Topic Title cannot be empty',
                            },
                        ],

                    })(<Input disabled={this.state.fieldDisabled} placeholder="Enter a name for this topic"/>)}
                </Form.Item>
                <Form.Item label="Description" hasFeedback>
                    {getFieldDecorator('desc', {
                        rules: [{required: true, message: 'Please add desc!'}],
                    })(
                        <TextArea disabled={this.state.fieldDisabled} rows={4} placeholder="Please add a detailed description"/>,
                    )}
                </Form.Item>

                <Form.Item label="Skills">
                    {getFieldDecorator('skills', {
                        rules: [
                            {required: true, message: 'Please enter at least one skill!', type: 'array'},
                        ],
                    })(
                        <Select disabled={this.state.fieldDisabled}
                                mode="tags"
                                placeholder="Please select needed skill options, type in for new skill">
                            <Option value="Java">Java</Option>
                            <Option value="SQL">SQL</Option>
                            <Option value="UI/UX">UI/UX</Option>
                            <Option value="HTML">HTML</Option>
                            <Option value="CSS">CSS</Option>
                            <Option value="Python">Python</Option>
                            <Option value="Presentation">Presentation</Option>
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item label="Max ">
                    {getFieldDecorator('max_team_size', {
                        initialValue: 3,
                        rules: [
                            {required: true, message: 'Must be in [0, 20]'}
                        ]
                    })(
                        <InputNumber disabled={this.state.fieldDisabled} min={1} max={20}/>
                    )}
                    <span className="ant-form-text"> members per project</span>
                </Form.Item>

                <Form.Item label="Start - Due">
                    {getFieldDecorator('startEnd', rangeConfig)(
                        <RangePicker disabled={this.state.fieldDisabled} showTime format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </Form.Item>

                <Form.Item label="Difficulty">
                    {getFieldDecorator('difficulty', {
                        initialValue: 3,
                    })(<Rate disabled={this.state.fieldDisabled}/>)}
                </Form.Item>

                <Form.Item label="Additional Materials" extra="Recommand to save as a zip file and upload">
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload disabled={this.state.fieldDisabled} name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload"/> Click to upload
                            </Button>
                        </Upload>,
                    )}
                </Form.Item>

                <Form.Item label="AutoGrouper">
                    {getFieldDecorator('auto_group', {valuePropName: 'checked', initialValue: true}) (
                        <Switch disabled={this.state.fieldDisabled}/>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{span: 6, offset: 12}}>
                    {/* <Button disabled={this.state.fieldDisabled} type="primary" htmlType="submit"> */}
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default TopicForm
