const Mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'email is required*'],
    unique: [true, 'Email already exists!'],
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
    unique: [true, 'Phone already exists!'],
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
  },
  password: {
    type: String,
    required: true,
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  }
});

UserSchema.plugin(timeStamps);

const User = Mongoose.model("user", UserSchema);

module.exports = User;