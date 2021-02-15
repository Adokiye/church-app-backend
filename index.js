const express = require("express");
const bodyParser = require("body-parser");
const {handleError} = require('./app/helpers/error')
var cors = require("cors");

// create express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "--- Connection Successful! ---" });
});

//import routes
require("./db/routes/user.routes.js")(app);

//default error handling. Call next() on error to forward to default error handler outside a promise or try block
app.use((err, req, res, next) => {
    handleError(err, res);
  });

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on port ${
      process.env.PORT
    }...`
  );
});