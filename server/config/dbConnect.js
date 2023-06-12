const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nzalavadiya:Nihar23052019@income-expense-app.ob4wewn.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("database connected successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

dbConnect();
