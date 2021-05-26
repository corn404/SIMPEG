const route = require("express").Router();
const { AuthController } = require("../controllers");

route.get("/", AuthController.GetUser);
route.put("/reset", AuthController.ResetPassword);
route.post("/register", AuthController.CreateUser);
route.post("/login", AuthController.LoginUser);
route.delete("/hapus/:id", AuthController.DeleteUser);

module.exports = route;
