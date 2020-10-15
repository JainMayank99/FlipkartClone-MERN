var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
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
      required: true,
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
    },
    address: String,
    password: {
      salt: String,
      encryPass: {
        type: String,
        required: true,
      },
    },
    previousOrders: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    wishlistItems: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.password.salt = uuidv1();
    this.password.encryPass = this.securePassword(password);
  })
  .get(function () {
    return this._password;
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

module.exports = mongoose.model("User", userSchema);
