let mongoose = require("mongoose");
let favoritePostSchema = mongoose.Schema(
  {
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        },
    post: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
        },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("favoritePost", favoritePostSchema);
// products
