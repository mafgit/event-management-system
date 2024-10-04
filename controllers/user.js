const db = require("../db");

const get_users = (req, res) => {
  db.execute("select * from users", (err, results) => {
    if (err) res.json({ err });
    else res.json({ results });
    console.log(results);
  });
};

module.exports = { get_users };
