const express = require("express");
const {
  createAccountCtrl,
  fetchSingleAccountCtrl,
  fetchAllAccountCtrl,
  updateAccountCtrl,
  deleteAccountCtrl,
} = require("../../controllers/accounts/accountCtrl");
const isLogin = require("../../middleware/isLogin");

const accountRoute = express.Router();

accountRoute.post("/", isLogin, createAccountCtrl);

accountRoute.get("/:id", isLogin, fetchSingleAccountCtrl);

accountRoute.get("/", isLogin, fetchAllAccountCtrl);

accountRoute.put("/:id", isLogin, updateAccountCtrl);

accountRoute.delete("/:id", isLogin, deleteAccountCtrl);

module.exports = accountRoute;
