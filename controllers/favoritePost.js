// create a favorite post controller
let favoritePostModel = require("../schemas/favoritePost");

module.exports = {
  GetAllFavoritePostByPostId: async function (postId) {
    let favoritePost = await favoritePostModel
      .find({
        isDeleted: false,
        post: postId,
      })
      .populate([
        { path: "user", select: "fullname avatarUrl" },
        { path: "post", select: "title" },
      ]);
    return favoritePost;
  },

  // favorite post by user id
  FavoritePostByUser: async function (body) {
    let favoritePost = await favoritePostModel.find({
      post: body.post,
      user: body.user,
    });
    if (favoritePost.length > 0) {
      favoritePost[0].isDeleted = !favoritePost[0].isDeleted;
      await favoritePost[0].save();
    } else {
      let newFavoritePost = new favoritePostModel({
        post: body.post,
        user: body.user,
      });
      await newFavoritePost.save();
      return newFavoritePost;
    }
    return favoritePost;
  },
};
