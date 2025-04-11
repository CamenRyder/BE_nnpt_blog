let commentModel = require("../schemas/comment");

module.exports = {
  GetAllCommentByPostId: async function (postId) {
    return await commentModel
      .find({
        isDeleted: false,
        post: postId,
      })
      .populate(["post", "user"]);
  },
  GetCommentById: async function (commentId) {
    return await commentModel.findById(commentId).populate(["post", "user"]);
  },
  CreateAComment: async function (postId, userId, content, imageUrl) {
    let comment = new commentModel({
      post: postId,
      user: userId,
      content: content,
      imageUrl: imageUrl,
    });
    return await comment.save();
  },
  UpdateAComment: async function (commentId, body) {
    let comment = await commentModel.findById(commentId);
    console.log(comment);
    
    let allowField = ["content", "imageUrl"];
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        comment[key] = body[key];
      }
    }
    return await comment.save();
  },
  DeleteAComment: async function (commentId) {
    let comment = await commentModel.findById(commentId);
    comment.isDeleted = true;
    return await comment.save();
  },    
};
