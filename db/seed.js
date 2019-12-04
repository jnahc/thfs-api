const db = require('../models');

const castList = require('./cast.json');

// removes all cast

db.Cast.deleteMany({}, () => {
  castList.forEach(cast => {
    db.Cast.create(cast, (error, createdCast) => {
      if (error) return console.log (error);
      console.log(createdCast);
    })
  })
})


// remove to deleteMany