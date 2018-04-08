const Task = require('../model/Task')
const Project = require('../model/Project')
const TaskLog = require('../model/TaskLog')
const ProjectLog = require('../model/ProjectLog')
const Help = require('../model/Help')
const Home = require('../model/Home')
const ProjectMember = require('../model/ProjectMember')
const verifyToken = require('../controller/authController')
const jwt = require('jsonwebtoken')
const conf = require('../config/authConfig')

var routes = function (app) {

    /************** TASK ***************************/

    app.get("/task", verifyToken, function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {

            if (err) {
                res.status(403).send(err.name)
            } else {
                Task.find({}, (error, task) => {
                    if (error)
                        res.send(error);
            
                    res.json(task);
                })
            }
        })
    })

    app.get("/taskByUser", verifyToken, function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            
            if (err) {
                res.status(403).send(err.name)
            } else {
                Task.find({ assignee: req.query.assignee }, (error, task) => {
                    if (error)
                        res.send(error);
            
                    res.json(task);
                })
            }
        })
    })

    app.get("/taskByProject", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            Task.find({ $or : [ 
                { name : { $regex: req.query.search, $options: 'i' } }, 
                { assignee : { $regex: req.query.search, $options: 'i' } }, 
                { category : { $regex: req.query.search, $options: 'i' } }, 
                { description : { $regex: req.query.search, $options: 'i' }  } ],
                $and : [
                    { project_id : { $regex: req.query.project_id, $options: 'i' } }
                ]
            }, (err, task) => {
                if (err)
                    res.status(403).send(err.name)
                res.json(task);
            })
        })
    })

    app.get("/tasksearch", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            Task.find({ $or : [ 
                { name : { $regex: req.query.search, $options: 'i' } }, 
                { assignee : { $regex: req.query.search, $options: 'i' } }, 
                { description : { $regex: req.query.search, $options: 'i' }  } ] }, (err, task) => {
                if (err)
                    res.status(403).send(err.name)
                res.json(task);
            })
        })
    })

    app.get("/task-view", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            Task.find({_id: req.query.id}, (err, task) => {
                if (err) 
                    res.status(403).send(err.name)
                
                if (task)
                    res.json(task)
                    
            })
        })
    })

    app.put("/task", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            Task.update({ _id: req.body._id}, req.body, (err, post) => {
                if (err)
                    res.status(403).send(err.name)

                res.json(post)
            })
        })
    })

    app.post("/task", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            let newTask = new Task(req.body);
            newTask.save((err, task) => {

                if (err)
                    res.status(403).send(err.name)

                res.json(task)
            })
        })
    })

    /************** TASKLOG *************************/

    app.post("/tasklog", function(req, res) {
        let newTaskLog = new TaskLog(req.body);
        newTaskLog.save((err, log) => {

            if (err)
                res.send(err);

            res.json(log)
        })
    })

    app.get("/tasklog", function(req, res) {
        TaskLog.find({task_id: req.query.task_id}, (err, log) => {
            if (err)
                res.send(err)
    
            res.json(log)
        })
    })

    /************** PROJECT *************************/

    app.get("/project", function(req, res) {
        jwt.verify(req.token, conf.authentication.jwtSecret, function(err, data) {
            Project.find({}, (err, log) => {
                if (err)
                    res.status(403).send(err.name)

                res.json(log)
            })
        })
    })

    app.get("/projectsearch", function(req, res) {
        Project.find({ $or : [ 
            { name : { $regex: req.query.search, $options: 'i' } }, 
            { description : { $regex: req.query.search, $options: 'i' }  } ] }, (err, proj) => {
            if (err)
                res.send(err);
            res.json(proj);
        })
    })

    app.get("/project-view", function(req, res) {
        Project.find({_id: req.query.project_id}, (err, proj) => {
            if (err)
                res.send(err)
    
            res.json(proj)
        })
    })

    app.post("/project", function(req, res) {
        let newProject = new Project(req.body);
        newProject.save((err, proj) => {
            if (err)
                res.send(err)

            res.json(proj);
        })
    })

    app.put("/project", function(req, res) {
        Project.update({ _id: req.body._id}, req.body, (err, proj) => {
            if (err)
                res.send(err);

            res.json(proj)
        })
    })

    /************** PROJECT MEMBER *************************/

    app.post("/projectmember", function(req, res) {

        let newProjectMember = new ProjectMember(
            { project_id: req.body.project_id, member_id: req.body.member_id });

        newProjectMember.save((err, projMember) => {
            if (err)
                res.send(err)

            res.json(projMember);
        })
    })

    app.get("/memberByProject", function(req, res) {
        ProjectMember.find({project_id: req.query.project_id}, (err, member) => {
            if (err)
                res.send(err)
    
            res.json(member)
        })
    })

    app.delete("/projectmember", function(req, res) {
        console.log(req.query.member_id)
        ProjectMember.remove({member_id: req.query.member_id}, (err, member) => {
            if (err)
                res.send(err)
    
            res.json(member)
        })
    })

    /***************** HELP *********************************/

    app.post("/help", function(req, res) {
        let helpData = new Help(req.body)
        helpData.save((err, data) => {
            if (err)
                res.send(err)

            res.json(data);
        })
    })

    app.put("/help", function(req, res) {
        Help.update({ _id: req.body._id}, req.body, (err, data) => {
            if (err)
                res.send(err);

            res.json(data)
        })
    })

    app.get("/help", function(req, res) {
        Help.find({}, (err, data) => {
            if (err)
                res.send(err)
    
            res.json(data)
        })
    })

    /***************** HELP *********************************/

    app.post("/home", function(req, res) {
        let homeData = new Home(req.body)
        homeData.save((err, data) => {
            if (err)
                res.send(err)

            res.json(data);
        })
    })

    app.put("/home", function(req, res) {
        Home.update({ _id: req.body._id}, req.body, (err, data) => {
            if (err)
                res.send(err);

            res.json(data)
        })
    })

    app.get("/home", function(req, res) {
        Home.find({}, (err, data) => {
            if (err)
                res.send(err)
    
            res.json(data)
        })
    })

    /***************** PROJECT LOG *********************************/

    app.post("/projectlog", function(req, res) {
        let newProjectLog = new ProjectLog(req.body);
        newProjectLog.save((err, log) => {

            if (err)
                res.send(err);

            res.json(log)
        })
    })

    app.get("/projectlog", function(req, res) {
        ProjectLog.find({project_id: req.query.project_id}, (err, log) => {
            if (err)
                res.send(err)
    
            res.json(log)
        })
    })

}
  
module.exports = routes;
