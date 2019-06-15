const express = require("express");
const app = express();
const port = 8002;
const db = require("./database.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  
    next();
});


app.get("/all_arrests", async (req, res, next) => {
  db.query(
    "SELECT * from pd_cad",
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});


app.get("/most_recent_arrest", async (req, res, next) => {
  db.query(
    "SELECT * from gta_rp.pd_cad ORDER BY time_stamp DESC LIMIT 1",
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});



app.listen(port);
