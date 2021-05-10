// implement your posts router here
const express = require("express");

const Posts = require("./posts-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
    });
  }
});
router.get("/:id/comments ", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const addPost = await Posts.insert(newPost);
      res.status(201).json(addPost);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const updatedPost = await Posts.update(req.params.id, req.body);
      if (!updatedPost) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.json(updatedPost);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified",
    });
  }
  router.delete("/api/posts/:id", (req, res) => {
    Posts.remove(req.params.id)
      .then((deletedPost) => {
        if (!deletedPost) {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          res.json(deletedPost);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post could not be removed",
          error: err,
        });
      });
  });
});
module.exports = router;
