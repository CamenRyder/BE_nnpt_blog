let postModel = require("../schemas/post");
let userModel = require("../schemas/user");
let typePostModel = require("../schemas/typePost");
let commentModel = require("../schemas/comment");

module.exports = {
  GetAllPost: async function () {
    return await postModel
      .find({
        isDeleted: false,
        // user: userId,
      })
      .populate(["user", "typePost"]);
    // .skip((page - 1) * pageSize)
    // .limit(pageSize);
  },
  GetPostById: async function (postId)  {
    var post = await postModel
      .findById(postId)
      .populate([{ path: "user" }, { path: "typePost", select: "title" }])
      .lean();

    var commentByPost = await commentModel
      .find({
        isDeleted: false,
        post: postId,
      })
      .populate(["post", "user"]);
     post.commentByUsers = commentByPost;
    return post;
  },

  CreateAPost: async function (
    title,
    conslution,
    userId,
    typePost,
    totalComment,
    totalLiked
  ) {
    // check typePost by title
    let typePostCheck = await typePostModel.findOne({ title: typePost });
    if (!typePostCheck) {
      throw new Error("Type post not found");
    }
    let post = new postModel({
      title: title,
      conslution: conslution,
      user: userId,
      typePost: typePostCheck._id,
      totalComment: totalComment,
      totalLiked: totalLiked,
    });
    return await post.save();
  },
  UpdateAPost: async function (postId, body) {
    let post = await postModel.findById(postId);
    let allowField = [
      "title",
      "conslution",
      "user",
      "typePost",
      "totalComment",
      "totalLiked",
    ];
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        post[key] = body[key];
      }
    }
    return await post.save();
  },
  DeleteAPost: async function (postId) {
    let post = await postModel.findById(postId);
    post.isDeleted = true;
    return await post.save();
  },

  // filter a Post
  FilterPost: async function (page, pageSize, userId, title) {
    return await postModel
      .find({
        isDeleted: false,
        user: userId,
        title: { $regex: title, $options: "i" },
      })
      .populate(["user", "typePost"])
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  },
};
