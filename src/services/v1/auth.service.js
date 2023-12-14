const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { DataBaseModelNames } = require('../../database/constants');
const Admin = require('../../database/models')[DataBaseModelNames.ADMIN];

const authService = {
  logIn: async (req) => {
    try {
      const { email, password } = req;

      const admin = await Admin.findOne({ where: { email: email } });
      if (!admin) {
        throw new Error('Admin Not Found.');
      }

      if (admin.accountStatus !== 'ACTIVATED') {
        throw new Error(`Your Account is ${admin.accountStatus}`);
      }

      const passwordIsValid = bcrypt.compareSync(password, admin.password);

      if (!passwordIsValid) {
        throw new Error('Invalid Password');
      }

      if (admin.authToken) {
        try {
          jwt.verify(admin.authToken, process.env.JWT_SECRET);
        } catch (err) {
          // If the token is expired or invalid, generate a new one
          const newToken = authService.signToken(admin);

          // Update the user's authToken in the database with the new token
          await authService.updateAdminAuthToken(admin, newToken);
        }
      } else {
        // If the user doesn't have an existing token, generate a new one
        const token = authService.signToken(admin);

        await authService.updateAdminAuthToken(admin, token);
      }

      const adminData = await Admin.findByPk(admin.id, {
        attributes: ['name', 'email', 'authToken'],
      });

      return {
        message: 'Log In successfully.',
        data: adminData,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  logOut: async (req) => {
    const admin = await Admin.findByPk(req.adminId);

    if (!admin) {
      throw new Error('Admin Not Found');
    }

    await authService.updateAdminAuthToken(admin, null);

    return {
      status: 200,
      message: 'Logout Successfully',
    };
  },

  signToken: (admin) => {
    return jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  updateAdminAuthToken: async (admin, newToken) => {
    try {
      await admin.update({ authToken: newToken });
    } catch (error) {
      throw new Error(`Failed to update admin authToken.`);
    }
  },
};

module.exports = authService;
