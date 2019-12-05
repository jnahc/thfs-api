const db = require ('../models');

const showCurrentUser = (req, res) => {
  console.log(req.session)
  if (!req.session.currentUser) return res.status(401).json({
    status:401,
    message: `Unauthorized. Please login and try again.`
  });

  db.User.findById(req.session.currentUser.id, (err, foundUser) => {
    if (err) return res.status(500).json({
      status: 500,
      message: err,
    });
    res.status(200).json({
      status: 200,
      data: foundUser,
    });
  });
};

const editCurrentUser = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}, (error, updatedUser) => {
      if (error) return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong! Please try again.'}]
      })
    }
  )
}

module.exports = {
  showCurrentUser,
  editCurrentUser,
}