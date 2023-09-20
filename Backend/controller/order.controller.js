const Order = require('../model/order');
const Counter = require('../model/counter');
const catchAsync = require('../utils/catchAsync');
const { ObjectId } = require('mongodb');
const moment = require('moment');

exports.create = catchAsync( async (req, res) => {
  const data = { ...req.body, status: 'CARTITEMS', userId: req?.userDetails?._id };
  const userAndBranchIsExists = await Order.findOne({ userId: req?.userDetails?._id, branchId: data?.branchId, status: 'CARTITEMS'}).lean();
  if (!userAndBranchIsExists) {
    const orderCount = await Counter.findOneAndUpdate({ name: 'Order Count'}, { $inc: { count: 1 } }, {
      new: true,
      runValidators: true,
    }).lean();
    if (orderCount) {
      data.orderId = orderCount.count;
    }
    data.items = [
      {
        itemId: data.itemId,
        totalItems: 1,
      }
    ]
    const response = await Order.create(data);
    if (response) {
      this.getOrderDetailsById(req, res, response._id);
    }
  } else {
    const orderItems = userAndBranchIsExists.items;
    const itemIndex = orderItems.findIndex((item) => item.itemId.equals(new ObjectId(data.itemId)));
    if (itemIndex > -1) {
      if (req?.query?.type === 'INC') {
        orderItems[itemIndex].totalItems += 1
      } else if (req?.query?.type === 'REMOVE') {
        orderItems.splice(itemIndex, 1);
      } else {
        orderItems[itemIndex].totalItems -= 1
      }
    } else {
      orderItems.push({ itemId: data.itemId, totalItems: 1});
    }
    const response = await Order.findByIdAndUpdate(userAndBranchIsExists?._id, { $set: { items: [...orderItems]}}, {
      new: true,
      runValidators: true,
    }).lean();
    if (response) {
      this.getOrderDetailsById(req, res, response._id);
    }
  }
});

exports.statusUpdate = catchAsync( async (req, res) => {
  const data = { ...req.body }
  if (data.status) {
    const OrderResponse = await Order.findByIdAndUpdate(req?.params?.id, {...data}, {
      new: true,
      runValidators: true,
    });
    if (OrderResponse) {
      this.getOrderDetailsById(req, res, OrderResponse._id)
    }
  } else {
    res.status(200).json({
      status: 400,
      message: 'Status field is required*'
    });
  }
  
});

exports.getOrderDetailsById = catchAsync( async (req, res, id) => {
  const orderPipeline = [
    {
      $match: {
        "_id": id,
      },
    },
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items.itemId",
        foreignField: "_id",
        as: "items.itemId",
      },
    },
    {
      $unwind: {
        path: "$items.itemId",
        preserveNullAndEmptyArrays: true,
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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $unwind:
        {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $addFields: {
        dItems: "$items.itemId",
      },
    },
    {
      $addFields: {
        "dItems.totalItems": "$items.totalItems",
        totalPrice: {
          $multiply: [
            "$items.totalItems",
            "$items.itemId.price",
          ],
        },
      },
    },
    {
      $project: {
        items: "$dItems",
        orderId: 1,
        totalPrice: 1,
        userDetails: {
          _id: 1,
          name: 1,
          email: 1,
          phoneNumber: 1,
          isPhoneNumberVerified: 1,
        },
        status: 1,
        branchDetails: {
          _id: 1,
          name: 1,
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        totalPrice: {
          $push: "$totalPrice",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $addFields: {
        totalPrice: {
          $reduce: {
            input: "$totalPrice",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
      },
    },
  ]
  const OrderResponse = await Order.aggregate([...orderPipeline]);
  if (OrderResponse) {
    res.status(200).json({
      status: 200,
      message: 'Order placed successfully',
      data: OrderResponse,
    });
  }
});

exports.getOrderDetails = catchAsync( async (req, res) => {
  let employeeMatchQuery = [];
  let customerMatchQuery = [];
  let statusMatchQuery = [];
  if (req?.userDetails?.isCustomer && req?.userDetails?._id) {
    customerMatchQuery = [
      {
        $match: {
          "userId": new ObjectId(req?.userDetails?._id),
        },
      },
  ];
  }
  if (req?.query?.status !== 'ALL') {
    statusMatchQuery = [
      {
        $match: {
          "status": req.query.status,
        },
      },
  ];
  }
  if (req?.userDetails?.isEmployee && req?.userDetails?.branchId) {
    employeeMatchQuery = [
      {
        $match: {
          "branchId": new ObjectId(req?.userDetails?.branchId),
        },
      },
  ];
  }
  const orderPipeline = [
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items.itemId",
        foreignField: "_id",
        as: "items.itemId",
      },
    },
    {
      $unwind: {
        path: "$items.itemId",
        preserveNullAndEmptyArrays: true,
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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $unwind:
        {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $addFields: {
        dItems: "$items.itemId",
      },
    },
    {
      $addFields: {
        "dItems.totalItems": "$items.totalItems",
        totalPrice: {
          $multiply: [
            "$items.totalItems",
            "$items.itemId.price",
          ],
        },
      },
    },
    {
      $project: {
        items: "$dItems",
        orderId: 1,
        totalPrice: 1,
        userDetails: {
          _id: 1,
          name: 1,
          email: 1,
          phoneNumber: 1,
          isPhoneNumberVerified: 1,
        },
        status: 1,
        branchDetails: {
          _id: 1,
          name: 1,
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        totalPrice: {
          $push: "$totalPrice",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $addFields: {
        totalPrice: {
          $reduce: {
            input: "$totalPrice",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
      },
    },
  ]
  const OrderResponse = await Order.aggregate([...customerMatchQuery, ...employeeMatchQuery, ...statusMatchQuery, ...orderPipeline]);
  if (OrderResponse) {
    res.status(200).json({
      status: 200,
      message: 'Order details fetched successfully',
      data: OrderResponse,
    });
  }
});

exports.getOrderAnalysis = catchAsync( async (req, res) => {
  let branchQuery = [];
  if (req?.query.branchId) {
    branchQuery = [
      {
        $match: { "branchId": new ObjectId(req?.query?.branchId)}
      }
    ]
  }
  const dataQuery = [
    {
      $match: {
        "createdAt": {
          "$gte": moment(req?.query?.fromDate || new Date(), 'YYYY-MM-DD').startOf('day').utc(true).toDate(),
          "$lte": moment(req?.query?.endDate || new Date(), 'YYYY-MM-DD').endOf('day').utc(true).toDate()
        },
      }
    }
  ]

  console.log(dataQuery[0][`$match`].createdAt, branchQuery)
  const orderPipeline = [
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "items.itemId",
        foreignField: "_id",
        as: "items.itemId",
      },
    },
    {
      $unwind: {
        path: "$items.itemId",
        preserveNullAndEmptyArrays: true,
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
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $unwind:
        {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
    },
    {
      $addFields: {
        dItems: "$items.itemId",
      },
    },
    {
      $addFields: {
        "dItems.totalItems": "$items.totalItems",
        totalPrice: {
          $multiply: [
            "$items.totalItems",
            "$items.itemId.price",
          ],
        },
      },
    },
    {
      $project: {
        items: "$dItems",
        orderId: 1,
        totalPrice: 1,
        userDetails: {
          _id: 1,
          name: 1,
          email: 1,
          phoneNumber: 1,
          isPhoneNumberVerified: 1,
        },
        status: 1,
        branchDetails: {
          _id: 1,
          name: 1,
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$items",
        },
        totalPrice: {
          $push: "$totalPrice",
        },
        orderId: {
          $first: "$orderId",
        },
        userDetails: {
          $first: "$userDetails",
        },
        status: {
          $first: "$status",
        },
        branchDetails: {
          $first: "$branchDetails",
        },
      },
    },
    {
      $addFields: {
        totalPrice: {
          $reduce: {
            input: "$totalPrice",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
      },
    },
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group:
        {
          _id: "$items.itemName",
          totalItems: {
            $sum: "$items.totalItems",
          },
          id: {
            $first: "$_id"
          },
          totalPrice: {
            $push: "$totalPrice",
          },
        },
    },
    {
      $project: {
        type: "$_id",
        _id: "$id",
        totalItems: 1,
        totalPrice: {
          $reduce: {
            input: "$totalPrice",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
      },
    },
  ]
  const OrderResponse = await Order.aggregate([...branchQuery, ...dataQuery, ...orderPipeline]);
  if (OrderResponse) {
    res.status(200).json({
      status: 200,
      message: 'Order details fetched successfully',
      data: OrderResponse,
    });
  }
});