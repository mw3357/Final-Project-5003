const express = require('express');
const topic = require('./topic');
const hash62 = require('../calculation/simple_hash').hash62;
const groupBySkills = require('../grouper/grouping').groupBySkills;

const router = express.Router();
const Topic = topic.model();

router.get('/one/:web_id', function (req, res) {
    const webId = req.params.web_id;
    Topic.find({ web_id: webId }, function (err, topic) {
        return res.json({ code: 0, content: topic });
    });
});

router.get('/all', function (req, res) {
    Topic.find({}, function (err, topic) {
        return res.json({ code: 0, content: topic });
    });
});

router.post('/add', function (req, res) {
    let data = req.body.values;
    data.start_at = new Date(data.start_at);
    data.end_at = new Date(data.end_at);
    data.created_at = new Date();
    data.last_modified_at = data.created_at;
    const web_id = hash62((data.title.length + data.created_at.getTime() + data.start_at.getTime()) / 2);

    let topic = new Topic({
        title: data.title, desc: data.desc,
        web_id: web_id, skills: data.skills,
        members: data.members, max_team_size: data.max_team_size,
        difficulty: data.difficulty, start_at: data.start_at,
        end_at: data.end_at, auto_group: data.auto_group,
        created_at: data.created_at, last_modified_at: data.last_modified_at
    });

    const _id = topic._id;
    topic.save(function (e, d) {
        console.log(e, d);
        if (e) {
            return res.json({ code: 1, msg: e.toString() })
        }

        return res.json({ code: 0, content: { topic, _id, web_id } })
    })
});

router.post('/add-student', function (req, res) {
    let data = req.body;
    const webId = data.web_id;

    Topic.findOneAndUpdate({ web_id: webId },
        {
            $push: {
                'members': data.student
            }
        },
        { new: true }, (e, d) => {
            console.log(e, d);
            if (e) {
                return res.json({ code: 1, msg: e.toString() })
            }
            const _id = d.id;
            return res.json({ code: 0, content: { topic, _id, webId } })
        })
});

router.post('/group', function (req, res) {
    const members = req.body.members;
    const teamSize = req.body.teamSize;
    const skills = req.body.skills;
    console.log("input:", members, teamSize, skills);

    const teams = groupBySkills(members, teamSize, skills);
    return res.json({ code: 0, content: {teams}})
});

module.exports = {
    baseUrl: '/topic',
    router: router
};
