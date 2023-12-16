const jwt = require('jsonwebtoken');
require('dotenv').config();

const { DataBaseModelNames } = require('../database/constants');
const Member = require('../database/models')[DataBaseModelNames.MEMBER];

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      const error = new Error('Please Login.');
      error.statusCode = 401;
      throw error;
    }

    const tokenValue = token.split(' ')[1];

    jwt.verify(
      tokenValue,
      process.env.MEMBER_JWT_SECRET,
      async (err, decoded) => {
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

        try {
          const member = await Member.findByPk(decoded.id, {
            where: { deletedAt: null, accountStatus: 'ACTIVATED' },
          });

          if (!member) {
            const error = new Error('User not found!');
            error.statusCode = 403;
            throw error;
          }
          req.memberId = member.id;

          next();
        } catch (error) {
          next(error);
        }
      },
    );
  } catch (error) {
    next(error);
  }
};
