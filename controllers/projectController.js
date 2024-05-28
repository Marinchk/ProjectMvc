const path = require('path');
const Project = require('../models/Project');

const projectList = [];

exports.getProjects = (_, res) => {
    res.render('list', { projectList });
};

exports.addProject = (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProject.html'));
};

exports.newProject = (req, res) => {
    const { name, description, users } = req.body;
    projectList.push(new Project(name, description, users));
    res.redirect('/');
};

exports.getUpdateProject = (req, res) => {
    const id = req.params.id;
    if (!projectList[id]) {
        res.status(404).send('No project');
    } else {
        const project = projectList[id];
        project.id = id;
        res.render('updateProject', { project });
    }
};


exports.updateProject = (req, res) => {
    const id = req.params.id;
    const { name, description, users } = req.body;
    if (!projectList[id]) {
        res.status(404).send('No project');
    } else {
        projectList[id].name = name;
        projectList[id].description = description;
        projectList[id].users = users;
        res.redirect('/');
    }
};




exports.deleteProject = (req, res) => {
    const id = req.params.id;
    if (!projectList[id]) {
        res.status(404).send('No project');
    } else {
        projectList.splice(id, 1);
        res.redirect('/');
    }
};
