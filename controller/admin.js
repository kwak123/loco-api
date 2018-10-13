const db = require('../db');
const KEY = require('../env/keys').PRIVILEGED_ACCESS;

const updateDB = (req, res) => {
  const { sub, key } = req.query;
  if (key === KEY) {
    db.updateSchedule(sub)
      .then(() => res.sendStatus(200))
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log(error);
        return res.sendStatus(404);
      });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  updateDB,
};
