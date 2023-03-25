const User = require("../models/User");
const fs = require('fs');
const path = require('path');

exports.signupService = async (userInfo) => {
  return await User.create(userInfo)
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email }, { userAdded: 0, patientAdded: 0 });
};

exports.updateImageUrlService = async (email, imageURL, file) => {

  const user = await User.findOne({ email });
  const previousImagePath = path.join(__dirname, '..', user.imageURL.replace(`${process.env.BASE_URL}`, ''));

  console.log(previousImagePath)

  // Save the new profile picture URL to the database
  user.imageURL = file ? `${process.env.BASE_URL}${file.path}` : user.imageURL;

  // Delete the previous profile picture if it exists
  if (previousImagePath && fs.existsSync(previousImagePath)) {
    fs.unlink(previousImagePath, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Deleted previous profile picture: ${previousImagePath}`);
      }
    });
  }

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