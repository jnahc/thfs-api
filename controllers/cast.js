const db = require('../models');

// Create Cast

const createCast = (req, res) => {
  db.Cast.create(req.body, (err, createdCast) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{message: 'Something went wrong on createCast. Please try again'}]
    });
    res.status(201).json({
      status: 201,
      count: 1,
      data: createdCast,
      dateCreated: new Date().toLocaleString()
    })
  });
};

// Show All Cast

const showAllCast = (req,res) => {
  db.Cast.find({}, (err, allCast) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{message: 'Something went wrong! Please try again'}],
    });
    res.json({
      status: 200,
      count: allCast.length,
      data: allCity,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

// Show One Cast by ID
const showOneCast = (req, res) => {
  db.Cast.findById({_id: req.params.id}, (error, foundCast) => {
    if (error) return console.log(error);
    if (foundCast) {
      res.json ({
        status: 200,
        count: 1,
        data: foundCity,
        requestedAt: new Date().toLocaleString(),
      });
    } else {
      res.json({
        status: 404,
        count: 0,
        data: `Cast with ID ${req.params.id} was not found. Please try again.`
      })
    };
  });
};

module.exports = {
  createCast,
  showAllCast,
  showOneCast,
}