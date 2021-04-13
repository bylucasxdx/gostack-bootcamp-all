const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');
const app = express();

const projects = [];

app.use(cors());
app.use(express.json());

function logRequests(req, res, next) {
    const { method, url } = req;

    console.log(`${method}: ${url}`);

    return next();
}

app.use(logRequests);

app.get('/projects', (req, res) => {
    const { title } = req.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.json(results);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = {
        id: uuid(),
        title,
        owner
    }

    projects.push(project);

    return res.status(201).json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(404).json({ message: 'Not found!'});
    }

    const project = {
        id, 
        title,
        owner
    }

    projects[projectIndex] = project;

    return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(404).json({ message: 'Not found!'});
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3003, () => {
    console.log(`Listening on port 3003`);
})