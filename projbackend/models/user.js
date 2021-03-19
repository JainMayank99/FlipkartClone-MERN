var mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');
const { ObjectId } = mongoose.Schema

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      default: ""
    },
    role: {
      type: Number,
      default: 0,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      default: 0,
      required: true,
      unique: true
    },
    address: {
      defaultAddress: {
        default: "",
        type: String,
        maxLength: 100
      },
      addresses: [String]
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    // Cart: [{
    //   Product: {
    //     type: ObjectId,
    //     ref: "ProductSchema"
    //   },
    //   Quantity: {
    //     type: Number,
    //     default: 1,
    //   },
    //   isSavedForLater: {
    //     type: Boolean,
    //     default: false
    //   }
    // }],
    Suggestion: [{
      type: ObjectId,
      ref: "CategorySchema"
    }],
    // MyProducts: [{
    //   type: ObjectId,
    //   ref: "ProductSchema"
    // }],//For Role 1 only (Sellers)
    AddharNo: {
      type: String,
      maxLength: 12
    }
    //otp object
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password
  });


userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("UserSchema", userSchema);
