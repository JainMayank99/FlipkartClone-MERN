const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const categorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    parentId: {
      type: ObjectId,
      ref: "CategorySchema",
      default: null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategorySchema", categorySchema);
