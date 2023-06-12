const express = require("express");
const {
  createTransactionCtrl,
  fetchAllTransactionCtrl,
  fetchSingleTransaction,
  updateTransactionCtrl,
  deleteTransactionCtrl,
} = require("../../controllers/transaction/transactionCtrl");
const isLogin = require("../../middleware/isLogin");

const transactionRoute = express.Router();

transactionRoute.post("/", isLogin, createTransactionCtrl);

transactionRoute.get("/", isLogin, fetchAllTransactionCtrl);

transactionRoute.get("/:id", isLogin, fetchSingleTransaction);

transactionRoute.put("/:id", isLogin, updateTransactionCtrl);

transactionRoute.delete("/:id", isLogin, deleteTransactionCtrl);

module.exports = transactionRoute;
