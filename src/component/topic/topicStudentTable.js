import React from 'react';
import { Table, Tag } from 'antd';

class TopicStudentTable extends React.Component {
    render() {
        let students = [];
        if (this.props.topic) {
            students = this.props.topic.members;
        }

        const columns = [
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'fname',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'lname',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Skills',
                key: 'skills',
                dataIndex: 'skills',
                render: skills => (
                    <span>
                        {skills.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>Delete</a>
                    </span>
                ),
            },
        ];

        console.log(columns, students);
        return (
            <Table columns={columns} dataSource={students} />
        );
    }
}

export default TopicStudentTable;
