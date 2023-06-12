const express = require("express");
const {
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  userProfileCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middleware/isLogin");

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);

userRoutes.post("/login", loginUserCtrl);

userRoutes.delete("/", isLogin, deleteUserCtrl);

userRoutes.get("/profile/", isLogin, userProfileCtrl);

userRoutes.put("/", isLogin, updateUserCtrl);

module.exports = userRoutes;
