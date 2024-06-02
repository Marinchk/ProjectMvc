const path = require('path');
const Project = require('../models/Project');


exports.getProjects = (_, res) => {
    res.render('list', { projectList: Project.projectList });
}

exports.addProject = (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProject.html'));
};

exports.newProject = (req, res) => {
    try {
        Project.addProject(new Project(req.body.name, req.body.description, req.body.users));
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getUpdateProject = (req, res) => {
    const id = req.params.id;
    const project = Project.findById(id);
    if (project) {
        project.id = id;
        res.render('updateProject', { project });
    } else {
        res.status(404).send('No project found');
    }
};

exports.updateProject = (req, res) => {
    const id = req.params.id;
    try {
        Project.updateProject(id, req.body.name, req.body.description, req.body.users);
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteProject = (req, res) => {
    try {
        Project.deleteProject(req.params.id);
        res.redirect('/');
    } catch (error) {
    res.status(404).send(error.message);
    }
};
