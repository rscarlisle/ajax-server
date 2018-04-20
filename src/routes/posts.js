const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");

router.post("/", controller.createPost);
router.delete("/:id", controller.deletePost);
router.get("/", controller.getAllPosts);
router.get('/:id', controller.getPostById);
router.put('/:id', controller.updatePost);

module.exports = router;