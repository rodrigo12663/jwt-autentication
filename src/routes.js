const Express = require("express");

const app = Express.Router();
const UserController = require("./app/controllers/UserController.js");
const auth = require("./app/middlewares/auth.js");

app.post("/users",UserController.store);
app.get("/users",auth,UserController.index);
app.post("/auth",UserController.authentication);

module.exports = app;