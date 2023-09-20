const Branch = require('../model/branch');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync( async (req, res) => {
  const data = { ...req.body }
  const BranchResponse = await Branch.create(data);
  if (BranchResponse) {
    res.status(200).json({
      status: 200,
      message: 'Branch name created successfully',
      data: BranchResponse,
    });
  };
});

exports.update = catchAsync( async (req, res) => {
  const data = { ...req.body }
  const BranchResponse = await Branch.findByIdAndUpdate(req?.params?.id, {...data}, {
      new: true,
      runValidators: true,
    }).lean();
  if (BranchResponse) {
    res.status(200).json({
      status: 200,
      message: 'Branch details updated successfully',
      data: BranchResponse,
    })
  }
});

exports.getAll = catchAsync( async (req, res) => {
  const BranchResponse = await Branch.find({});
  if (BranchResponse) {
      res.status(200).json({
        status: 200,
        message: 'Branch details fetched successfully',
        data: BranchResponse,
      })
    }
  }
);

exports.deleteItem = catchAsync( async (req, res) => {
  const BranchResponse = await Branch.findByIdAndDelete(req?.params?.id, { new: true, runValidators: true });
  if (BranchResponse) {
      res.status(200).json({
        status: 200,
        message: 'Delete branch successfully',
      })
    }
  }
);
