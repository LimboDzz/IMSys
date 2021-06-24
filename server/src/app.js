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
let currentCourse = null;
const app = express();
app.use(morgan('combined'))
    .use(bodyParser.json())
    .use(cors())
    .post('/gradingCourse', (req, res) => {
        console.log(req.body);
        currentCourse = req.body;
        res.send(msg(true, "setGradingCourse"));
    })
    .post('/stu/delete', (req, res) => {
        db.query(`delete from studentcourse where Cno = '${req.body.Cno}'`, (err) => {
            if (err) res.send(msg(false, '[DELETE ERROR]: ' + err.message));
            else res.send(msg(true, `Course ${req.body.Cno} deleted.`));
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
    .post('/teacher/confirm', (req, res) => {
        db.query(`update score set ExamRes = '${req.body.score}' where Cno = '${req.body.Cno}}'`, function (err) {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else {
                res.send(msg(true, "OK"));
            }
        });
    })
    .get('/user/loginUser', (req, res) => {
        res.send(currentUser);
    })
    .get('/user/logout', (req, res) => {
        res.send(msg(true,"Logout."))
        currentUser=null;
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
            if (err && err.toString().includes("Duplicate")) res.send(msg(false, 'Already added. Check your list.'));
            else if (result.length == 0) res.send(msg(false, 'No course on plan.'));
            else {
                res.send(msg(true, 'Attend Successfully'));
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
    .get('/gradeCurrentCourse', (req, res) => {
        if (currentCourse == null) res.send(msg(false, "noCurrentCourse"));
        else {
            

            db.query(`select * from gradingcourse where Cno='${currentCourse.Cno}' and Tno='${currentCourse.Tno}'`, (err, result) => {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No course for grading.'));
            else {
                res.send(result);
            }
        });

        }
    })
    .get('/teacher/courseList',(req, res)=> {
                db.query(`select * from teachercourse where Tno='${currentUser.Tno}'`, (err, result) => {
            if (err) res.send(msg(false, '[SELECT ERROR]: ' + err.message));
            else if (result.length == 0) res.send(msg(false, 'No course on plan.'));
            else {
                res.send(result);
            }
        });
    })

    .listen(process.env.PORT || 4025)