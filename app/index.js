const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const path = require("path");
const app = express();
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = YAML.load("./docs/openapi.yaml");

/** Swagger Docs */
app.get("/documentation.json", (req, res) => res.send(swaggerDocument));
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

/** Install Router */
app.use(router);

module.exports = app;
