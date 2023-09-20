const catchAsync = require("../utils/catchAsync");
const Employee = require("../model/employee");
const Counter = require("../model/counter");
const Item = require("../model/item");
const { items, encryptingPassword } = require("../utils/helper");

exports.defaultAdmin = catchAsync( async () => {
  const isSuperAdminExistInDB = await Employee.findOne({ name: 'Super Admin'});
  if (!isSuperAdminExistInDB) {
    const data = {
      name: 'Super Admin',
      email: process.env.OWNER_EMAIL,
      phoneNumber: process.env.OWNER_PHONE_NUMBER,
      password: encryptingPassword(process.env.OWNER_PASSWORD),
      isAdmin: true,
    };
    const UserResponse = await Employee.create(data);
    if (UserResponse) {
      return {
        status: 200,
        message: 'Default Admin created successfully',
      }
    };
  }
});

exports.defaultItems= catchAsync( async () => {
  const totalItems = await Item.find({}).lean();
  if (totalItems.length !== items.length) {
    const promises = [];
    for (var i = 0; i < items.length; i++) {
      const promise = new Promise(async(resolve, reject) => {
        try {
          const ItemResponse = await Item.create(items[i]);
          if (ItemResponse) {
            return resolve({
              status: 200,
              message: 'Item Name created successfully',
              data: ItemResponse,
            });
          };
        } catch(error) {
          console.log(error);
          return reject({
            status: 400,
            message: 'Error in creating items',
          })
        }
      });
      promises.push(promise);
    }

    Promise.allSettled(promises).then((reCheck) => {
      reCheck.forEach((pRes) => {
        if (pRes.status === 'rejected') {
          console.log("Failed to create items");
        } else {
          console.log(`Item "${pRes?.value?.data?.name}" created successfully`);
        }
      });
    });
  }
});

exports.defaultOrderCount = catchAsync( async () => {
  const isOrderCountExists = await Counter.findOne({ name: 'Order Count'});
  if (!isOrderCountExists) {
    const data = {
      name: 'Order Count',
      count: 0,
    };
    const orderResponse = await Counter.create(data);
    if (orderResponse) {
      return {
        status: 200,
        message: 'Order count created successfully',
      }
    };
  }
});
