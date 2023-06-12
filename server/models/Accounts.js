const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: [
        "Checking",
        "Saving",
        "Investment",
        "Project",
        "Credit Card",
        "Utilities",
        "Billing",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Entertainment",
        "Uncategorized",
      ],
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
