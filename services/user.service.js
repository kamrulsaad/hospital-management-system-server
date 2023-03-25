const User = require("../models/User");
const fs = require('fs');
const path = require('path');

exports.signupService = async (userInfo) => {
  return await User.create(userInfo)
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email }, { userAdded: 0, patientAdded: 0 });
};

exports.updateImageUrlService = async (req) => {

  const user = await User.findOne({ email: req.user.email });

  if (user) {
    if (user.imageURL) {

      const previousImagePath = path.join(__dirname, '..', user.imageURL.replace(`${req.protocol}://${req.get('host')}/`, ''));

      fs.unlink(previousImagePath);
    }
  }

  user.imageURL = `${req.protocol}://${req.get('host')}/${req.file.path}`

  await user.save();

  return user.imageURL
}

  exports.getAllDoctorsService = async (pagination) => {

    const { limit, startIndex } = pagination;

    const total = await User.find({ role: "doctor" }).countDocuments()

    const doctors = await User.find({ role: "doctor" }).select("firstName lastName email").skip(startIndex).limit(limit);;

    return { total, doctors }
  };

  exports.getUserInfoService = async (email) => {
    return await User.findOne({ email })
  };

  exports.updatePassService = async (password, _id) => {
    return await User.updateOne({ _id }, { password })
  }

  exports.findAllUserService = async (pagination) => {

    const { limit, startIndex } = pagination;

    const total = await User.countDocuments()

    const users = await User.find({}).select("firstName lastName role email").skip(startIndex).limit(limit);

    return { users, total }
  }

  exports.getUserByIdService = async (_id) => {
    return await User.findById(_id, { password: 0 }).populate('addedBy', 'firstName lastName role email')
  }