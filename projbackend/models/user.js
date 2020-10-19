var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1")
const { ObjectId } = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
      required: true,
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
        type: String
      },
      addressess: [String]
    },
    password: {
      salt: String,
      encryPass: {
        type: String,
        required: true,
      },
    },
    wishListItems: [ProductSchema],
    Cart: [{
      Product: ProductSchema,
      Quantity: {
        type: Number,
        default: 1,
      },
      isSavedForLater: {
        type: Boolean,
        default: false
      }
    }],
    Suggestion: [CategorySchema],
    MyProducts: [ProductSchema]//For Role 1 only (Sellers)
  },
  { timestamps: true }
);

userSchema
  .path("password")
  .set(function (password) {
    this._pass = password;
    this.password.salt = uuidv1();
    this.password.encryPass = this.securePassword(password);
  })
  .get(function () {
    return this._pass;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
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
