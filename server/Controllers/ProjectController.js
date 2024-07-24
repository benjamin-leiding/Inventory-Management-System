const Project = require("../Models/ProjectModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.CreateProject = async (req, res, next) => {

    try {

        const { name, ownerId, description } = req.body;

        const createdAt = Date.now()

        const project = await Project.create({ name, ownerId, description, createdAt });

        res
            .status(201)
            .json({ message: "Project was being created", success: true, project : project });

        next();

    } catch (error) {

        console.error(error);

    }

};

module.exports.GetAllProjects = async (req, res, next) => {

    try {

        const projects = await Project.find();
        console.log(projects)

        res
            .status(201)
            .json({ message: "Project was being created", success: true, projects : projects });

        next();

    } catch (error) {

        console.error(error);

    }

};

