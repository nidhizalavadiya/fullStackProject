const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { AppErr, appErr } = require("../../utils/appErr");
const generateWebToken = require("../../utils/generateToken");
const verifyteWebToken = require("../../utils/verifyToken");

const registerUserCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  try {
    // check if user exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User is already Exists", 400));
    }

    // send error if fields are empty
    if (!fullname || !email || !password) {
      return next(new AppErr("Please provide all fields", 400));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullname,
      email,
      password: hasedPassword,
    });
    await res.json({
      status: "success",
      fullname: user.fullname,
      id: user._id,
    });
  } catch (err) {
    next(new AppErr(err, 500));
  }
};

const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid login credentials", 400));
    }

    //heck password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!isPasswordMatched) {
      return next(new AppErr("Invalid login credentials", 400));
    }

    await res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateWebToken(userFound._id),
    });
  } catch (err) {
    next(new AppErr(err, 500));
  }
};

const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(new AppErr(err, 500));
  }
};

const userProfileCtrl = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });

    await res.json(user);
  } catch (err) {
    next(new AppErr(err, 500));
  }
};

const updateUserCtrl = async (req, res, next) => {
  // ROADMAP --> // check if email exists // check if user updating password // update user // send response

  try {
    // check if email exists

    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return next(
          new AppErr("email is taken or you have already this email", 401)
        );
      }
    }

    // check user updating password

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(req.body.password, salt);
      // update user
      const user = await User.findByIdAndUpdate(
        req.user,
        { password: hasedPassword },
        { new: true, runValidators: true }
      );

      // return response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }

    // if user updating other properties

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(user);
    // return response
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(new AppErr(err, 500));
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  userProfileCtrl,
  updateUserCtrl,
};
