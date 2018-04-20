const model = require("../models/posts")

const createPost = (req, res, next) => {
    const response = model.createPost(req.body);
    if (response.errors) return next(sendErrors(response));
    res.status(201).json({response});
};

const deletePost = (req, res, next) => {
    const response = model.deletePost(req.params.id);
    res.status(204).json();
}

const getAllPosts = (req, res, next) => {
    const response = model.getAllPosts();
    res.status(200).json({response});
}

const getPostById = (req, res, next) => {
    const response = model.getPostById(req.params.id);
    if (response.errors) return next(sendErrors(response));
    res.status(200).json({response});
};

const updatePost = (req, res, next) => {
    const response = model.updatePost(req.params.id, req.body);
    if (response.errors) return next(sendErrors(response));
    res.status(200).json({response});
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
};