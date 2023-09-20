const Mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const BranchSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Branch name is required*'],
    unique: [true, 'Branch name already exists!'],
  },
});

BranchSchema.plugin(timeStamps);

const Branch = Mongoose.model("branch", BranchSchema);

module.exports = Branch;