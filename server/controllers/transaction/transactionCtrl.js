const Transaction = require("../../models/Transaction");
const Account = require("../../models/Accounts");
const User = require("../../models/User");
const { AppErr } = require("../../utils/appErr");

const createTransactionCtrl = async (req, res, next) => {
  const {
    name,
    transactionType,
    amount,
    category,
    account,
    note,
    initialBalance,
  } = req.body;
  try {
    // check is user login

    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(new AppErr("user not found", 404));
    }

    // find account

    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(new AppErr("account not found", 404));
    }

    // create transaction

    const transaction = await Transaction.create({
      name,
      transactionType,
      amount,
      account,
      category,
      note,
      initialBalance,
      createdBy: req.user,
    });

    // push transaction into account transaction field

    accountFound.transactions.push(transaction._id);

    // resave account
    await accountFound.save();

    res.json({ status: "success", data: transaction });
  } catch (err) {
    next(new AppErr(err));
  }
};

const fetchAllTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    res.json({ status: "success", data: transaction });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const fetchSingleTransaction = async (req, res) => {
  try {
    const trans = await Transaction.findById(req.params.id);
    await res.status(200).json({ status: "success", data: trans });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const updateTransactionCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await res.status(200).json({ status: "success", data: trans });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.findByIdAndDelete(req.params.id);
    await res.status(200).json({ status: "success", data: null });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

module.exports = {
  createTransactionCtrl,
  fetchAllTransactionCtrl,
  fetchSingleTransaction,
  updateTransactionCtrl,
  deleteTransactionCtrl,
};
