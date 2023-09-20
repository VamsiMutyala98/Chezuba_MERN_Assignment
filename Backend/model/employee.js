const Mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const EmployeeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'email is required*'],
    validate: {
      validator: function (v) {
        return /\b[A-Z0-9._%+-]+@gmail\.[A-Z]{2,}\b/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'mobile number is required*'],
    validate: {
      validator: function (v) {
        return /^[6789]{1}\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  branchId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    unique: [true, 'Branch manager already exists!'],
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isEmployee: {
    type: Boolean,
    default: false,
  }
});

EmployeeSchema.plugin(timeStamps);

const Employee = Mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
