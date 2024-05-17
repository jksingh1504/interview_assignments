const { Router } = require("express");
const route = Router();
const userController = require("../controller/user.controller.js");

route.post("/user/register", userController.register);
route.post("/user/authenticate", userController.authenticate);
// route.post("/user/oauth",userController.OAuth)
route.post("/user/signout", userController.signOut);
route.get("/user/profile", userController.getProfileDetails);
route.patch("/user/profile", userController.updateProfile);
route.get("/users", userController.getUsers);

module.exports = route;
