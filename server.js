const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const projectController = require('./controllers/projectController');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', projectController.getProjects);
app.get('/add', projectController.addProject);
app.post('/project', projectController.newProject);
app.get('/project/:id/edit', projectController.getUpdateProject);
app.post('/project/:id/update', projectController.updateProject);
app.delete('/project/:id', projectController.deleteProject);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
