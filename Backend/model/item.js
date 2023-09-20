const Mongoose = require("mongoose");
const timeStamps = require("mongoose-timestamp");

const ItemSchema = new Mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item name is required*'],
    unique: [true, 'Item name already exists!'],
  },
  img: {
    type: String,
    required: [true, 'Image url is required*'],
  },
  price: {
    type: Number,
    required: [true, 'price is required*'],
  },
});

ItemSchema.plugin(timeStamps);

const Item = Mongoose.model("item", ItemSchema);

module.exports = Item;