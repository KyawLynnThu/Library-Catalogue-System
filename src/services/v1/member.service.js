const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/constants');
const Member = require('../../database/models')[DataBaseModelNames.MEMBER];

const memberService = {
  memberLists: async (req) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;
      const keyword = req.query.keyword;

      const offset = (page - 1) * pageSize;

      let whereCondition = { deletedAt: null };
      if (keyword) {
        whereCondition = {
          deletedAt: null,
          [Op.or]: [
            { firstName: { [Op.like]: `%${keyword}%` } },
            { lastName: { [Op.like]: `%${keyword}%` } },
            { email: { [Op.like]: `%${keyword}%` } },
            { phone: { [Op.like]: `%${keyword}%` } },
          ],
        };
      }

      const members = await Member.findAndCountAll({
        where: whereCondition,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phone',
          'accountStatus',
          'createdAt',
        ],
        limit: pageSize,
        offset: offset,
      });

      const totalPages = Math.ceil(members.count / pageSize);

      return {
        message: 'Retrieved all member lists Successfully.',
        currentPage: page,
        totalPages: totalPages,
        pageSize: pageSize,
        totalCounts: members.count,
        data: members.rows,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  memberDetails: async (req) => {
    try {
      const member = await Member.findByPk(req.params.memberId, {
        where: { deletedAt: null },
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phone',
          'address',
          'dob',
          'accountStatus',
          'createdAt',
        ],
      });

      if (!member) {
        throw new Error('User Not Found.');
      }

      return {
        message: 'Retrieved user details successfully.',
        data: member,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  approvedByAdmin: async (req) => {
    try {
      const memberId = req.params.memberId;

      const member = await Member.findByPk(memberId, {
        where: { deletedAt: null },
      });

      if (!member) {
        throw new Error('User Not Found!');
      }

      const result = await member.update(
        { accountStatus: 'ACTIVATED' },
        { where: { id: memberId } },
      );

      return {
        message: 'Admin Approved Successfully.',
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  rejectedByAdmin: async (req) => {
    try {
      const memberId = req.params.memberId;
      const member = await Member.findOne({
        where: {
          id: memberId,
          accountStatus: 'PENDING',
          deletedAt: null,
        },
      });

      if (!member) {
        throw new Error('User Not Found!');
      }

      const result = await member.destroy();

      if (!result) {
        throw new Error('Failed to reject Member');
      }

      return {
        message: 'Member Rejected Successfully.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  registerByUser: async (req) => {
    try {
      const { firstName, lastName, email, password, address, phone, dob } =
        req.body;

      const formattedBirthDate = dayjs(dob).format('YYYY-MM-DD');

      const member = await Member.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 8),
        address,
        phone,
        dob: formattedBirthDate,
        accountStatus: 'PENDING',
      });

      if (!member) {
        throw new Error('Registration Failed');
      }

      return {
        message: 'Register Sucess. Please Wait! we will get back to you.',
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  userLogIn: async (req) => {
    try {
      const { email, password } = req.body;

      const member = await Member.findOne({ where: { email: email } });
      if (!member) {
        throw new Error('User Not Found.');
      }

      if (member.accountStatus !== 'ACTIVATED') {
        throw new Error(`Your Account is not ACIVATED`);
      }

      const passwordIsValid = bcrypt.compareSync(password, member.password);

      if (!passwordIsValid) {
        throw new Error('Invalid Password');
      }

      if (member.authToken) {
        try {
          jwt.verify(member.authToken, process.env.MEMBER_JWT_SECRET);
        } catch (err) {
          const newToken = memberService.signToken(member);

          await memberService.updateUserAuthToken(member, newToken);
        }
      } else {
        const token = memberService.signToken(member);

        await memberService.updateUserAuthToken(member, token);
      }

      const memberData = await Member.findByPk(member.id, {
        attributes: ['firstName', 'lastName', 'email', 'phone', 'authToken'],
      });

      return {
        message: 'Log In successfully.',
        data: memberData,
      };
    } catch (error) {
      throw new Error(error);
    }
  },

  userLogOut: async (req) => {
    const member = await Member.findByPk(req.memberId);

    if (!member) {
      throw new Error('User Not Found');
    }

    await memberService.updateUserAuthToken(member, null);

    return {
      message: 'Logout Successfully',
    };
  },

  signToken: (member) => {
    return jwt.sign(
      { id: member.id, email: member.email },
      process.env.MEMBER_JWT_SECRET,
      {
        expiresIn: process.env.MEMBER_JWT_EXPIRES_IN,
      },
    );
  },

  updateUserAuthToken: async (member, newToken) => {
    try {
      await member.update({ authToken: newToken });
    } catch (error) {
      throw new Error(`Failed to update user authToken.`);
    }
  },
};

module.exports = memberService;
