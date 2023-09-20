const User = require('../model/user');
const Employee = require('../model/employee');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { encryptingPassword, checkingEncryptionPassword } = require('../utils/helper');


exports.create = catchAsync( async (req, res) => {
  const password = encryptingPassword(req.body.password);
  const data = {
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    password,
    isCustomer: true,
  }
  const response = await User.create(data);
  if (response) {
    const UserResponse = JSON.parse(JSON.stringify(response));
    const token = jwt.sign({...UserResponse, isCustomer: true}, process.env.JWT_SECRET_KEY)
    res.status(200).json({
      status: 200,
      message: 'User Data Created Successfully',
      data: {...JSON.parse(JSON.stringify(UserResponse)), isCustomer: true, token},
    });
  };
});

exports.update = catchAsync( async (req, res) => {
  const data = { ...req.body }
  if (data.password) {
    data.password = encryptingPassword(req.body.password);
  }
  const response = await User.findByIdAndUpdate(req?.userDetails?._id, {...data}, {
      new: true,
      runValidators: true,
    });
  if (response) {
    const UserResponse = JSON.parse(JSON.stringify(response));
    res.status(200).json({
      status: 200,
      message: 'User Details Updated Successfully',
      data: {...UserResponse, isCustomer: true},
    })
  }
});

exports.login = catchAsync( async (req, res) => {
  const data = { ...req.body }
  const response = await User.findOne({ email: data.email }).lean();
  if (response) {
    const UserResponse = JSON.parse(JSON.stringify(response));
    const comparePassword = checkingEncryptionPassword(data.password, UserResponse.password);
    if (comparePassword) {
      const token = jwt.sign({...UserResponse, isCustomer: true}, process.env.JWT_SECRET_KEY)
      res.status(200).json({
        status: 200,
        message: 'Login Successfully',
        data: { ...UserResponse, token, isCustomer: true},
      })
    } else {
      res.status(400).json({
        status: 400,
        message: 'Wrong Password'
      })
    }
  } else {
    const response = await Employee.findOne({ email: data.email }).lean();
    if (response) {
      const EmployeeResponse = JSON.parse(JSON.stringify(response));
      const comparePassword = checkingEncryptionPassword(data.password, EmployeeResponse.password);
      if (comparePassword) {
        const token = jwt.sign({...EmployeeResponse, isEmployee: true}, process.env.JWT_SECRET_KEY)
        res.status(200).json({
          status: 200,
          message: 'Login Successfully',
          data: { ...EmployeeResponse, token, isEmployee: true},
        })
      } else {
        res.status(200).json({
          status: 400,
          message: 'Wrong Password'
        })
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'Email not exist! Please try to sign up first'
      })
    }
  }
});
