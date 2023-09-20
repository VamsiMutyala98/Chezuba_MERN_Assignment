const Item = require('../model/item');
const catchAsync = require('../utils/catchAsync');


exports.create = catchAsync( async (req, res) => {
  const data = { ...req.body }
  const ItemResponse = await Item.create(data);
  if (ItemResponse) {
    res.status(200).json({
      status: 200,
      message: 'Item name created successfully'
    });
  };
});

exports.update = catchAsync( async (req, res) => {
  const data = { ...req.body }
  const ItemResponse = await Item.findByIdAndUpdate(req?.params?.id, {...data}, {
      new: true,
      runValidators: true,
    });
  if (ItemResponse) {
    res.status(200).json({
      status: 200,
      message: 'Item details updated successfully',
      data: ItemResponse,
    })
  }
});

exports.getAll = catchAsync( async (req, res) => {
  const ItemResponse = await Item.find({}).lean();
  if (ItemResponse) {
      res.status(200).json({
        status: 200,
        message: 'Item details fetched successfully',
        data: ItemResponse,
      })
    }
  }
);

exports.deleteItem = catchAsync( async (req, res) => {
  const ItemResponse = await Item.findByIdAndDelete(req?.params?.id, { new: true, runValidators: true });
  if (ItemResponse) {
      res.status(200).json({
        status: 200,
        message: 'Delete item successfully',
      })
    }
  }
);
