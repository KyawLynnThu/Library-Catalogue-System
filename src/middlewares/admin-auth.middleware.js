const jwt = require('jsonwebtoken');
require('dotenv').config();

const { DataBaseModelNames } = require('../database/constants');
const Admin = require('../database/models')[DataBaseModelNames.ADMIN];

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      const error = new Error('Token not present or invalid format!');
      error.statusCode = 401;
      throw error;
    }

    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          const error = new Error('Token Expired!');
          error.statusCode = 403;
          throw error;
        }
        const error = new Error('Invalid Token!');
        error.statusCode = 401;
        throw error;
      }

      const admin = await Admin.findByPk(decoded.id);
      if (!admin) {
        const error = new Error('Admin not found!');
        error.statusCode = 403;
        throw error;
      }

      req.adminId = admin.id;

      next();
    });
  } catch (error) {
    next(error);
  }
};
