const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["Income", "Expenses"],
    },
    amount: {
      type: Number,
      required: true,
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "transportation",
        "Shopping",
        "Healt",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Uncategorized",
      ],
    },
    color: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
