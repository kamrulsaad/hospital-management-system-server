const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  await User.updateOne({ _id: user.addedBy }, { $push: { userAdded: user._id } })
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findAllUserService = async () => {
  return await User.
    find({}, { password: 0 })
    .populate(
      [
        {
          path: "userAdded",
          options: {
            projection:
            {
              password: 0,
              addedBy: 0,
              userAdded:0,
              patientAdded: 0
            }
          }
        },
        {
          path: "patientAdded",
          options: {
            projection:
            {
              issuedBy: 0,
            }
          }
        },
      ]
    )
}

// exports.findUserByToken = async (token) => {
//   return await User.findOne({ confirmationToken: token });
// };