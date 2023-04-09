const express = require("express");
const { PostModel } = require("../Models/post.model");
const postRouter = express.Router();

// Get All Data
postRouter.get("/", async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    res.send(allPosts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new post
postRouter.post("/", async (req, res) => {
  try {
    let data = req.body;
    const post = new PostModel(data);
    const savedPost = await post.save();
    // res.send(savedPost);
    res.send({ message: "Post create successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve a post by id
postRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let post = await PostModel.findById(id);
    res.send(post);
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong" });
  }
});

// Update a post's content by id
postRouter.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updatedPost = await PostModel.findById(id);
    updatedPost.content = req.body.content;
    updatedPost.updated_at = Date.now();

    await PostModel.findByIdAndUpdate({ _id: id }, updatedPost);
    return res.send({ msg: "Updated successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete a post by id
postRouter.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await PostModel.findByIdAndDelete(id);
    res.send({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Increment the like count of a post by id
postRouter.post("/:id/like", async (req, res) => {
  res.post.likes += 1;
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Decrement the like count of a post by id
postRouter.post("/:id/unlike", async (req, res) => {
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
// async function getPost(req, res, next) {
//   try {
//     const post = await PostModel.findById(req.params.id);
//     if (post == null) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.post = post;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

module.exports = { postRouter };
