const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  await User.updateOne({ _id: user.addedBy }, { $push: { userAdded: user._id } })
  return user;
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email }, { userAdded: 0, patientAdded: 0 });
};

exports.getAllDoctorsService = async () => {
  return await User.find({ role: "doctor" }).select("firstName lastName");
};

exports.getUserInfoService = async (email) => {
  return await User.findOne({ email }).populate(
    [
      {
        path: "userAdded",
        options: {
          projection:
          {
            password: 0,
            addedBy: 0,
            userAdded: 0,
            patientAdded: 0
          }
        }
      }
    ]
  );
};

exports.findAllUserService = async () => {
  return await User.find({}).select("firstName lastName role email");
}

exports.getUserByIdService = async (_id) => {
  return await User.findById(_id, {password: 0}).populate('addedBy', 'firstName lastName role email')
}

// exports.findUserByToken = async (token) => {
//   return await User.findOne({ confirmationToken: token });
// };