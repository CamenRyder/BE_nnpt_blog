let typePostModel = require("../schemas/typePost");
module.exports = {
  GetAllTypePost: async function () {
    return await typePostModel.find();
  },
  GetTypePostById: async function (typePostId) {
    return await typePostModel.findById(typePostId);
  },
  CreateATypePost: async function (body) {
    let typePost = new typePostModel({
      title: body.title,
      conslution: body.conslution,
    });
    return await typePost.save();
  },
  UpdateATypePost: async function (typePostId, body) {
    let typePost = await typePostModel.findById(typePostId);
    let allowField = ["title" , "conslution"];
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        typePost[key] = body[key];
      }
    }
    return await typePost.save();
  },
  DeleteATypePost: async function (typePostId) {
    let typePost = await typePostModel.findById(typePostId);
    typePost.isDeleted = true;
    return await typePost.save();
  },
};
