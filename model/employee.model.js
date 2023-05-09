const mongoose = require("mongoose");

const empSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    department: String,
    salary: Number,
  },
  { versionKey: false }
);

const EmpModel = mongoose.model("employee", empSchema);

module.exports = { EmpModel };
