let mongoose = require("mongoose");
let postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    conslution: {
      type: String,
      required: true,
      unique: true,
    },
    totalLiked: {
      type: Number,
      default: 0,
    },
    totalComment: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    typePost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typePost",
      },
    ],

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
// products
