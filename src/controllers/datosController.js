const db = require("../database/models");

const controller = {
  create(req, res) {
    return res.render("create");
  },
  async store(req, res) {
    try {
      const newDate = {
        ...req.body,
      };
      await db.Datos_Panels.create(newDate);
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = controller;
