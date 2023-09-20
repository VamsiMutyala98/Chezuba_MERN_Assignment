const Employee = require('../model/employee');
const catchAsync = require('../utils/catchAsync');
const { encryptingPassword } = require('../utils/helper');

exports.create = catchAsync( async (req, res) => {
  const password = encryptingPassword(process.env.EMPLOYEES_PASSWORD);
  const data = { ...req.body, isEmployee: true, password }
  const EmployeeResponse = await Employee.create(data);
  if (EmployeeResponse) {
    this.getEmployeeById(EmployeeResponse?._id)
  };
});

exports.update = catchAsync( async (req, res) => {
  const data = { ...req.body }
  if (data.password) {
    data.password = encryptingPassword(req.body.password);
  }
  console.log(data, req?.params?.id)
  const EmployeeResponse = await Employee.findByIdAndUpdate(req?.params?.id, {...data}, {
      new: true,
      runValidators: true,
    }).lean();
  if (EmployeeResponse) {
    this.getEmployeeById(req, res, EmployeeResponse?._id);
  }
});

exports.getAll = catchAsync( async (req, res) => {
  const EmployeeResponse = await Item.find({ isEmployee: true }).lean();
  if (EmployeeResponse) {
      res.status(200).json({
        status: 200,
        message: 'Employee details fetched successfully',
        data: EmployeeResponse,
      })
    }
  }
);

exports.deleteItem = catchAsync( async (req, res) => {
  const EmployeeResponse = await Employee.findByIdAndDelete(req?.params?.id, { new: true, runValidators: true });
  if (EmployeeResponse) {
      res.status(200).json({
        status: 200,
        message: 'Employee deleted successfully',
      })
    }
  }
);

exports.getAllEmployees = catchAsync( async (req, res) => {
  const employeePipeline = [
    {
      $match: {
        isAdmin: false,
      },
    },
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
    {
      $unwind: {
        path: "$branchDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        branchId: 0,
      },
    },
  ]
  const response = await Employee.aggregate(employeePipeline);
  if (response) {
      const EmployeeResponse = JSON.parse(JSON.stringify(response));
      res.status(200).json({
        status: 200,
        message: 'Employee fetched successfully',
        data: EmployeeResponse
      })
    }
  }
);

exports.getEmployeeById = catchAsync( async (req, res, id) => {
  const employeePipeline = [
    {
      $match: {
        isAdmin: false,
      },
    },
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branchDetails",
      },
    },
    {
      $unwind: {
        path: "$branchDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        branchId: 0,
      },
    },
  ]
  const response = await Employee.aggregate(employeePipeline);
  if (response) {
      const EmployeeResponse = JSON.parse(JSON.stringify(response));
      res.status(200).json({
        status: 200,
        message: 'Employee details fetched successfully',
        data: EmployeeResponse
      })
    }
  }
);

