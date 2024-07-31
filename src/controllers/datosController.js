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
        output: req.body.output,
        output_active: req.body.output_active,
        voltaje: req.body.voltaje,
        porcentaje: req.body.porcentaje,
        charging: req.body.charging,
        discharge: req.body.discharge,
        input_voltaje: req.body.input_voltaje,
        input_power: req.body.input_power,
        fecha: req.body.fecha,
        hora_id: req.body.horas

      };
      await db.Datos_Panels.create(newDate, horas);
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = controller;
