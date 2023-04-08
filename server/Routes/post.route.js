const express = require("express");
const { PostModel } = require("../Models/post.model");
const postRouter = express.Router();

// Create a new post
postRouter.post("/", async (req, res) => {
  try {
    const post = new PostModel({
      user: req.body.user_id,
      content: req.body.content,
    });
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve a post by id
postRouter.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Update a post's content by id
postRouter.put("/:id", getPost, async (req, res) => {
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  res.post.updated_at = Date.now();
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post by id
postRouter.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Increment the like count of a post by id
postRouter.post("/:id/like", getPost, async (req, res) => {
  res.post.likes += 1;
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Decrement the like count of a post by id
postRouter.post("/:id/unlike", getPost, async (req, res) => {
  if (res.post.likes > 0) {
    res.post.likes -= 1;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve the total number of posts
postRouter.get("/analytics/posts", async (req, res) => {
  try {
    const count = await PostModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve the top 5 most liked posts
postRouter.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ likes: -1 }).limit(5);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a post by id
async function getPost(req, res, next) {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.post = post;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { postRouter };
