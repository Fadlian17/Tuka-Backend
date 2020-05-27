const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

router.get("/comments", (req, res) => {
  Comment.find()
    .populate("category", "_id title")
    .then((comments) => {
      res.json({
        comments,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//membuat kolom komentar
router.post("/new-comment", (req, res) => {
  const { body, post } = req.body;

  if (!body || !post) {
    res.json({ err: "All field are required" });
  }

  Post.findOne({ _id: post_id })
    .then((post_found) => {
      const comment = new Comment({
        title,
        post: post_found,
      });

      comment
        .save()
        .then(() => {
          res.json({ msg: "Comment has been Created" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/comments/post/:postId", (req, res) => {
  Comment.find({ post: { _id: req.params.postId } })
    .populate("post", "_id title")
    .then((posts) => {
      res.json({
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/comment-num", (req, res) => {
  Comment.count({})
    .then((comment) => {
      res.json({
        comment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
