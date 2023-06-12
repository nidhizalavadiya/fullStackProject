const Account = require("../../models/Accounts");
const User = require("../../models/User");
const { AppErr } = require("../../utils/appErr");

const createAccountCtrl = async (req, res, next) => {
  const { name, accountType, initialBalance, notes } = req.body;
  try {
    // find the loggedin User
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }

    // create account
    const account = await Account.create({
      name,
      accountType,
      initialBalance,
      notes,
      createdBy: req.user,
    });

    // push account in user accounts fields
    userFound.accounts.push(account._id);

    // resave user
    await userFound.save();

    return res.json({
      status: "success",
      data: account,
    });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const fetchSingleAccountCtrl = async (req, res, next) => {
  try {
    const accountFound = await Account.findById(req.params.id).populate(
      "transactions"
    );

    await res.status(200).json({
      status: "success",
      data: accountFound,
    });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const fetchAllAccountCtrl = async (req, res, next) => {
  try {
    const getAllAccount = await Account.find().populate("transactions");
    await res.json(getAllAccount);
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const updateAccountCtrl = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    await res.status(200).json({ status: "success", data: account });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

const deleteAccountCtrl = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    await res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppErr(err.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  fetchSingleAccountCtrl,
  fetchAllAccountCtrl,
  updateAccountCtrl,
  deleteAccountCtrl,
};
