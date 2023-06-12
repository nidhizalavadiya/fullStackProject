const express = require("express");
const res = require("express/lib/response");
const cors = require("cors");

// mongoose database connection
require("./config/dbConnect.js");

const globalErrHandler = require("./middleware/globalErrHandler"); // midlewares

// routes
const userRoutes = require("./Routes/users/userRoutes");
const accountRoute = require("./Routes/Accounts/accountRoute");
const transactionRoute = require("./Routes/Transactions/transactionRoute");

// routes ends //

const app = express();

// middlewere///

app.use(express.json()); // pass incoming data (app won't work if you dont use this)
app.use(cors());

// routes /////

// user Routes //
app.use("/api/v1/users", userRoutes);

// account Routes //
app.use("/api/v1/accounts", accountRoute);

// transaction Routes //
app.use("/api/v1/transaction", transactionRoute);

// Error handler ///

app.use(globalErrHandler);

// listen server ////

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
