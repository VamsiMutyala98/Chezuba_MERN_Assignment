const Mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const orderSchema = new Mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'Order Id is required*'],
  },
  branchId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: [true, 'Branch id is required*']
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User id is required*']
  },
  status: {
    type: String,
    enum: ['CARTITEMS', 'CREATED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    required: true,
  },
  items: [
    {
      itemId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Item id is required*']
      },
      totalItems: {
        type: Number,
        required: [true, 'Total items is required*']
      }
    }
  ],
});

orderSchema.plugin(timeStamps);

const Order = Mongoose.model("order", orderSchema);

module.exports = Order;