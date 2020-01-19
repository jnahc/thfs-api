const db = require('../models');

// CREATE COMMENT

const createComment = (req,res) => {
  db.Comment.create(req.body, (err, createdComment) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{message: 'Something went wrong. Please try again'}]
    });
    res.status(201).json({
      status: 201,
      count: 1,
      data: createdComment,
      dateCreated: new Date().toLocaleString(),
    });
    //FIND USER - PUSH COMMENT
    db.User.findById({_id:req.params.userId}, (err, user) => {
      console.log(req.params)
      if (err) return console.log(err)
      if (user) {
        user.comments.push(createdComment._id)
        user.save((err, result) => {
          if (err) return console.log(err)
          console.log(result)
        });
      };
    });
    //FIND CAST - PUSH COMMENT
    db.Cast.findById({_id:req.params.castId}, (err, cast) => {
      console.log(req.params)
      if(err) return console.log(err)
      if (cast) {
        cast.comments.push(createdComment.id)
        cast.save((err, result) => {
          if (err) return console.log(err)
          console.log(result)
        });
      };
    });
  });
};

// SHOW ONE COMMENT

const showOneComment = (req,res) => {
  db.Comment.findById(req.params.commentId, (err,foundComment) => {
    if (err) return console.log (err);
    if (foundComment) {
      res.json({
        status: 200,
        count: 1,
        data: foundComment,
        requestedAt: new Date().toLocaleString(),
      });
    } else {
      res.json({
        status: 404,
        count: 0,
        data: `Post with ID ${req.params.postId} was not found. Please try again.`
      });
    };
  });
};

const updateComment = (req,res) => {
  db.Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body,
    {new: true}, (err, updatedComment) => {
      if (err) return res.status(500).json({
        status: 500,
        error: [{message: "Something went wrong! Please try again"}],
      });
      res.json({
        status: 200,
        count: 1,
        data: updatedComment,
        requestedAt: new Date().toLocaleDateString()
      })
    }
  );
};

// DESTROY COMMENT

const destroy = (req, res) => {
  // delete the actual comment
  db.Comment.findByIdAndDelete(
    req.params.commentId, (err, destroyComment) => {
      if (err) return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong! Please trya gain'}],
      });
      res.json({
        status: 200,
        count: 1,
        data: destroyComment,
        requestedAt: new Date().toLocaleString(),
      });
      //find user - delete comment
      db.User.findById({_id:req.params.userId}, (err, user) => {
        if (err) return console.log(err)
        if (user){
          console.log(`Found User - ${user}`)
        }
      });
      //find cast - delete comment
      db.Cast.findById({_id:req.params.castId}, (err, cast) => {
        if (err) return console.log(err)
        if (cast){
          console.log(`Found User - ${cast}`)
        }
      });
    }
  );
};

// COMMENTS BY CAST 

const castComments = (req, res) => {
  db.Cast.findById({_id:req.params.castId}, (err, foundCast) => {
    if (err) return res.status(500)
    if (foundCast) {
      foundCast.populate("comments").execPopulate((err, cast) => {
        if (err) return res.status(500).json({err})
        res.send({status: 200, comments: cast.comments})
      })
    } else {
      res.status(500).json({message: 'Cast not found'})
    }
  });
};

// COMMENTS BY USER
const userComments = (req, res) => {
  db.User.findById({_id:req.params.userId}, (err, foundUser) => {
    if (err) return res.status(500)
    if (foundUser) {
      foundUser.populate("comments").execPopulate((err, user) => {
        if (err) return res.status(500).json({err})
        res.send({status: 200, comments: user.comments})
      })
    } else {
      res.status(500).json({message: 'User not found'})
    }
  });
};

module.exports = {
  createComment,
  showOneComment,
  updateComment,
  destroy,
  castComments,
  userComments,
}