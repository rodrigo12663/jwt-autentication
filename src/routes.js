const Express = require("express");

const app = Express.Router();
const UserController = require("./app/controllers/UserController.js");

app.post("/users",UserController.store);
app.get("/users",UserController.index);
app.post("/auth",UserController.authentication)

module.exports = app;