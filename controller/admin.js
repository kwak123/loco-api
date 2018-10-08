const db = require('../db');
const KEY = require('../env/keys').PRIVILEGED_ACCESS;

const updateDB = (req, res) => {
  let sub = req.query.sub;
  let key = req.query.key;
  if (key === KEY) {
    db.updateSchedule(sub)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    })
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  updateDB
};