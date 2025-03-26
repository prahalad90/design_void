const express = require("express");
const router = express.Router();
const { addProject, getAllProjects, getProjectbyID } = require('../models/Project')

router.get("/", async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.json(projects);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const project = getProjectbyID(req.params.id);
        res.json(project)
    }
    catch (err) {
        res.status(500).json({ error: 'server error' })
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, status, duedate } = req.body
        const newProject = await addProject(name, description, status, duedate);
        res.status(201).json(newProject)
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;