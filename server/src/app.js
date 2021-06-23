//#region CONSTS
const express = require('express')
// Parse incoming request bodies in a middleware before your handlers
const bodyParser = require('body-parser')
// CORS(Cross - Origin Resource Sharing) middleware
const cors = require('cors')
// HTTP request logger middleware for node.js
const morgan = require('morgan')
const mysql = require('mysql')
const db = mysql.createPool({      //创建mysql实例
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'mysql',
    database: 'imsys'
});
//#endregion


function msg(status, msg) {
    return { status, msg };
}
let currentUser = null;
const app = express();
app.use(morgan('combined'))
    .use(bodyParser.json())
    .use(cors())

    .post('/stu/delete', (req, res) => {
        db.query(`delete studentcourse where Cno='${req.body.Cno}')`, (err) => {
            if (err) res.send(msg(false, '[DELETE ERROR]: ' + err.message));
            console.log("!!!!")
        });
    })
    .post('/stu/login', (req, res) => {
        db.query(`select * from student where Sno=${req.body.Sno}`, function (err, result) {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No this user.'));
            else {
                currentUser = result[0];
                if (req.body.Spwd == currentUser.Spwd)
                    res.send(msg(true, 'Welcome ' + currentUser.Sname));
                else {
                    res.send(msg(false, 'Wrong username or password'));
                    currentUser = null;
                }
            }
        });
    })
    .post('/teacher/login', (req, res) => {
        db.query(`select * from teacher where Tno='${req.body.Sno}'`, function (err, result) {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No this user.'));
            else {
                currentUser = result[0];
                if (req.body.Spwd == currentUser.Tpwd)
                    res.send(msg(true, 'Welcome ' + currentUser.Tname));
                else {
                    res.send(msg(false, 'Wrong username or password'));
                    currentUser = null;
                }
            }
        });
    })
    .get('/user/loginUser', (req, res) => {
        res.send(currentUser);
    })
    .get('/stu/courseList', (req, res) => {
        db.query(`select * from stuCourse`, (err, result) => {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No course on plan.'));
            else {
                res.send(result);
            }
        });
    })
    .post('/stu/attend', (req, res) => {
        db.query(`insert into studentcourse(Sno,Cno) values('${currentUser.Sno}','${req.body.Cno}')`, (err, result) => {
            if (err) res.send(msg(false, '[INSERT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No course on plan.'));
            else {
                res.send(result);
            }
        });
    })
    .get('/stu/myCourses', (req, res) => {
        db.query(`select * from mycourses`, (err, result) => {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No attended courses.'));
            else {
                res.send(result);
            }
        });
    })
    .get('/teacher/courseList',(req, res)=> {
                db.query(`select * from teachercourse`, (err, result) => {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No course on plan.'));
            else {
                res.send(result);
            }
        });
    })

    .listen(process.env.PORT || 4025)