const db = require("../database/models");

const controller = {
  index: (req, res) => {
    db.DatosPanels.findAll().then((datos) => {
      res.render("listadatos", {datos: datos})
    })
  },
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
      await db.DatosPanels.create(newDate, horas);
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  detail: (req, res) => {
    db.DatosPanels.findByPk(req.params.id, {
      include: [{
          model: db.Horas,
          as: 'hora',
          where: { id: db.Sequelize.col('DatosPanels.hora_id') }
      }]
  }).then((dato) => {
      res.render("detail", {dato});
  });
  },
  edit: async (req, res) => {
    const horas = await db.Horas.findAll()
    db.DatosPanels.findByPk(req.params.id).then((datos_panels) => {
      res.render('edit', {datos_panels : datos_panels, horas})
    })
  },
  update(req,res){
    db.DatosPanels.update(
      {
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
      },
      {
        where: { id: req.params.id}
      }
    )
    res.redirect("/datos/listadatos")
  },
  destroy: (req,res) => {
    db.DatosPanels.destroy({
      where: { id: req.params.id },
    })
    res.redirect("/datos/listadatos")
  }
};

module.exports = controller;
