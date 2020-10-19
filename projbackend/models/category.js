const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    SubCategoryName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategorySchema", categorySchema);
