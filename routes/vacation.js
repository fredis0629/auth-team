const express = require("express");
const Users = require("../helpers/sequelizeInit").Users;

const router = express.Router();

router.get("/:id", (req, res) => {
  Users.findByPk(req.params.id).then(user => {
    if (user !== null) {
      const base = 10;
      const date = new Date();
      const fullYears = 2;
      const joinedAt = new Date(user.joinedAt);
      res.json(calculateVacation(base, date, fullYears, joinedAt));
    } else {
      res.status(422).send("No user found.");
    }
  });
});

calculateVacation = (base = 10, date, fullYears, joinedAt) => {
  const result = {};
  const diffTime = Math.abs(joinedAt - date);
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) / 365;
  const daysAdded = diffYears - fullYears > 0 ? Math.ceil(diffYears) - fullYears : 0;
  result.total = base + daysAdded;
  return result;
};

module.exports = router;