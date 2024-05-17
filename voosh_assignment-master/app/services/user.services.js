const { default: axios } = require("axios");
const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

//register new user
async function register(userDetails) {
  try {
    // hashing password for security
    userDetails.password = bcrypt.hashSync(userDetails.password, 8);
    const newUser = new userModel(userDetails);
    await newUser.save();
    return {
      message: "new user registered successfuly.",
      user: newUser,
    };
  } catch (error) {
    if (
      error.errorResponse &&
      error.errorResponse.code === 11000 &&
      error.errorResponse.keyPattern.email
    ) {
      throw "User already registered.";
    }
    throw error;
  }
}

// authenticate or login user
async function authenticate(userParams) {
  try {
    const { email, password } = userParams;
    const userDetails = await userModel.findOne({ email });
    console.log(userDetails);
    if (
      !userDetails ||
      !bcrypt.compareSync(
        password /*password by user*/,
        userDetails.password /*password from database*/
      )
    )
      throw "Invalid user credentials.";
    // make the user login
    await userModel.updateOne({ email }, { isLogin: true });
    const updatedUser = await userModel.findOne({ email });
    return { message: "login successful.", user: updatedUser };
  } catch (error) {
    throw error;
  }
}

async function OAuth() {
  try {
    const { CLIENT_ID, OAUTH_REDIRECT_URL } = process.env;
    const res = await axios.post(
      `https://accounts.google.com/o/oauth2/v2/auth`,
      {
        redirect_uri: OAUTH_REDIRECT_URL,
        client_id: CLIENT_ID,
        response_type: "code",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

// sign out the user
async function signOut(email) {
  try {
    // user is signed out
    const user = await userModel.findOneAndUpdate(
      { email },
      { $set: { isLogin: false } }
    );
    if (!user) throw "User not registered.";
    return { message: "You have been signed out successfully." };
  } catch (error) {
    throw error;
  }
}

// get user profile details
async function getProfileDetails(email) {
  try {
    if (!email) throw "Please enter a registered email.";
    const user = await userModel.findOne({ email });
    if (!user) throw "User not registered.";
    return user;
  } catch (error) {
    throw error;
  }
}

// update user profile
async function updateProfile(updateDetails) {
  try {
    const { email, updateParams } = updateDetails;
    const { password, email: updateParamsEmail } = updateParams
      ? updateParams
      : {};
    // hashing the password if available
    if (password) {
      updateParams.password = bcrypt.hashSync(password, 8);
    }
    const user = await userModel.findOneAndUpdate({ email }, updateParams);
    if (!user) throw "User not registered.";
    // get updated user details
    const userDetails = await userModel.findOne({
      email: updateParamsEmail || email,
    });
    return {
      message: "profile details updated successfully.",
      user: userDetails,
    };
  } catch (error) {
    throw error;
  }
}

// get list of public and private user accounts based on user admin status true/false
async function getUsers(email) {
  try {
    if (!email) throw "Please enter a registered email.";
    const userDetails = await userModel.findOne({ email });
    //show all public and private accounts to admin
    if (userDetails.isAdmin) return await userModel.find();
    //show only public accounts to normal user
    return await userModel.find({ isAccountPrivate: false });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  authenticate,
  signOut,
  getProfileDetails,
  updateProfile,
  getUsers,
  OAuth,
};
