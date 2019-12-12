import React from 'react';
import axios from 'axios';
import { Table, Tag } from 'antd';

class TopicGroupTable extends React.Component {

    constructor(props) {
        super(props);
        this.Grouping();
    }

    state = {
        topic: undefined,
        students: [],
        maxTeamSize: 1,
        totalSkills: [],
        groupedStudents: []
    };

    Grouping = () => {
        if (this.props.topic) {
            const {members, max_team_size, skills} = this.props.topic;
            this.setState(
                { 
                    topic: this.props.topic, 
                    students: members, 
                    maxTeamSize: max_team_size,
                    totalSkills: skills
                 }
            );

            axios.post('/topic/group', { members: members, teamSize: 2, skills: skills })
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.setState({groupedStudents: this.ConvertTeamsToRecord(res.data.content.teams)});
                        console.log("grouped!", this.state);
                    } else {
                        console.log(res.data.msg);
                    }
                });
        }
    };

    ConvertTeamsToRecord = (teams) => {
        // convert an array of teams with students as flat map of students.
        return teams.reduce((arr, team, idx) => {
            team.forEach(s => {
                s.teamNum = idx + 1;
                arr.push(s);
            });
            return arr;
        }, []);
    }

    render() {
        const students = this.state.students;
        const groupedStudents = this.state.groupedStudents;
        const teamColors = ['gold', 'purple', 'magenta', 'cyan', 'blue', 'volcano'];
        const skillColors = ['geekblue', 'lime', 'red', 'green', 'orange','gray', 'yellow'];
        const columns = [
            {
                title: 'Team Number',
                dataIndex: 'teamNum',
                key: 'teamNum',
                render: 
                // text => <a>{text}</a>,
                teamNum => (
                    <span>
                        <Tag color={teamColors[(teamNum - 1) % teamColors.length]} key={teamNum}>
                                Team # {teamNum}
                        </Tag>
                    </span>
                ),
            },
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'fname',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'lname',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Skills',
                key: 'skills',
                dataIndex: 'skills',
                render: skills => (
                    <span>
                        {skills.map((tag, idx) => {
                            return (
                                <Tag color={skillColors[idx % skillColors.length]} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
        ];

        console.log(columns, students, groupedStudents);
        return (
            <Table columns={columns} dataSource={groupedStudents} />
        );
    }
}

export default TopicGroupTable;
