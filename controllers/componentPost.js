let componentPost = require("../schemas/componentPost");

module.exports = {
  GetAllComponentPostByPostId: async function (postId) {
    return await componentPost
      .find({
        isDeleted: false,
        post: postId,
      })
      .populate(["post"]);
  },

  GetComponentPostById: async function (componentPostId) {
    return await componentPost.findById(componentPostId).populate(["post"]);
  },

  CreateAComponentPost: async function (postId, index, imageUrl, content) {
    let a = new componentPost({
      post: postId,
      index: index,
      imageUrl: imageUrl,
      content: content,
    });
    return await a.save();
  },

  UpdateAComponentPost: async function (componentPostId, body) {
    let a = await componentPost.findById(componentPostId);
    let allowField = ["content", "imageUrl", "index"];
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        a[key] = body[key];
      }
    }
    return await a.save();
  },

  DeleteAComponentPost: async function (componentPostId) {
    let a = await componentPost.findById(componentPostId);
    a.isDeleted = true;
    return await a.save();
  },
};
