const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('./AppError');

/**
 * @function {encrypting password}
 * @param {string} password 
 * @returns hashpassword
 */
exports.encryptingPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

/**
 * @function {checkingEncryptionPassword}
 * @param {string} password 
 * @param {string} hashPassword 
 * @returns boolean
 */
exports.checkingEncryptionPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

exports.parseJWT = (token) => {
  const base64Url = token.split(".")[1];
  var decodedValue = JSON.parse(global.window.atob(base64Url));

  return decodedValue;
};

exports.auth = (req, res, next, role) => {
  const token =  req?.headers?.authorization && req?.headers?.authorization.split(' ')[1];
  try {
    if (token) {
      // const token = authHeader && authHeader.split(' ')[1]
      jwt.verify(token,"Secret_Key",(err,decoded)=>{
          if(err) {
            next(new AppError('InValid Token', 401));
          } else if (decoded.isEmployee  && !decoded.isAdmin && !role.includes('EMPLOYEE')) {
            next(new AppError('Access denied for Employees', 401));
          } else if (decoded.isCustomer && !role.includes('CUSTOMER')) {
            next(new AppError('Access denied for Customers', 401));
          } else if (decoded.isAdmin === 'true' && !role.includes('ADMIN')) {
            next(new AppError('Access denied for Customers and Employeers', 401));
          } else {
            req.userDetails = decoded;
            next();
          }
      })
    } else {
      next(new AppError('Authorization token is required', 400));
    }
  } catch (error) {
    console.error(error, "error");
    next(new AppError('Token is expired! Please Login', 401));
  }
}

exports.authWithParams = (param1, param2) => {
  return (req, res, next) => {
    // You can access param1 and param2 here and use them as needed
    // For example, you can pass them to the original 'auth' function
    this.auth(req, res, next, param1, param2);
  };
};

exports.items = [
  {
    itemName: 'Cake',
    img: 'https://img.freepik.com/free-photo/assortment-pieces-cake_114579-57227.jpg?t=st=1695039906~exp=1695040506~hmac=43419168a37ba8b9261e59f6c8cf136294606e641dbb8db303799112722bc7d8',
    price: '500',
  },
  {
    itemName: 'Cookies',
    img: 'https://img.freepik.com/free-photo/chocolate-cookies-with-grid-white-table_181624-57138.jpg?t=st=1695040052~exp=1695040652~hmac=002c9fe2769b23584e36946f43c9fe143b543df995834f13398ff90e10fa5f07',
    price: '50',
  },
  {
    itemName: 'Muffins',
    img: 'https://img.freepik.com/free-photo/cupcakes_74190-20.jpg',
    price: '100',
  }
]