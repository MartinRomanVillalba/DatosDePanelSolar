const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'views/index.html'))
})
app.set("views", path.join(__dirname, "views"));

const port = 3030;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
