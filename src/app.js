require('dotenv').config()
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const methodOverride = require('method-override');

const mainRoutes = require("./routes/main");
const datosRoutes = require('./routes/datos');

const app = express();

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: process.env.SECRET,
  })
);

app.use("/", mainRoutes);
app.use('/datos', datosRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

module.exports = app;
