const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        v = String(v);
        return /^[0-9]{10}$/.test(v); // Validate phone number format (10 digits)
      },
      message: (props) =>
        `${props.value} is not a valid 10 digit phone number!`,
    },
  },
  password: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  isAdmin: { type: Boolean, default: false },
  loginType: { type: String, required: true },
  isAccountPrivate: { type: Boolean, required: true },
  isLogin: { type: Boolean, required: true, default: true },
});

// remove password and version keys and _id from response
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, response) {
    delete response.password;
    delete response._id;
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
