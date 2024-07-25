const db = require("../database/models");

const controller = {
  create: async(req, res) => {
    const horas = await db.Horas.findAll()
    return res.render("create", {horas});
  },
  async store(req, res) {
    try {
      const horas = await db.Horas.findAll()
      const newDate = {
        ...req.body,
      };
      await db.Datos_Panels.create(newDate, horas);
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = controller;
