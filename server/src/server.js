const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const userRouter = require('./user');
const topicRouter = require('./topic/topicRouter');

const app = express();
const port = 9093;

app.use(cookieParser());
app.use(bodyParser.json());
// app.use('/user', userRouter);
app.use(topicRouter.baseUrl, topicRouter.router);
app.listen(port, function () {
    console.log('Node app start at port: ' + port);
});
