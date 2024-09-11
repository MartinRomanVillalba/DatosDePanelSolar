const db = require("../database/models");

const controller = {
  index: async (req, res) => {
    const datos = await db.DatosPanels.findAll({
      attributes: ['fecha'],
      group: ['fecha'],
      order: [['fecha', 'ASC']],
    })

    const horas = []
    for(let hour = 7; hour <= 23; hour++){
      for (let minute = 0; minute < 60; minute += 15){
        horas.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        )
      }
    }
    res.render("listadatos", {datos, horas})
  },
  create: async(req, res) => {
    const horas = await db.Horas.findAll()
    return res.render("create", {horas});
  },
  async store(req, res) {
    try {
      console.log(req.body)
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
      return res.redirect("/datos/create");
    } catch (error) {
      console.log("Error al guardar los datos:", error)
      return res.status(500).send(error);
    }
  },
  detail: async (req, res)=>{
    const {fecha, hora} = req.params
    const dato = await db.DatosPanels.findOne({
      where: {
        fecha: fecha,
        hora_id: db.Sequelize.literal(`TIME_FORMAT(hora, "%H:%i") = "${hora}"`)
      },
      include: [{
        model: db.Horas,
        as: 'hora'
      }]
    })
    if(!dato){
      return res.render('no-data', {fecha, hora})
    }
    res.render('detail', {dato})
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
