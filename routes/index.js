var express = require("express");
var router = express.Router();

var roleModel = require("../schemas/role");
var userModel = require("../schemas/user");
var postModel = require("../schemas/post");
var componentPostModel = require("../schemas/componentPost");
var commentModel = require("../schemas/comment");
var typePostModel = require("../schemas/typePost");
var favoriteModel = require("../schemas/favoritePost");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// chạy con zợ này để có data cho hệ thống
router.get("/initData", async function (req, res, next) {
  // tạo role
  let roles = [
    new roleModel({ name: "admin" }),
    new roleModel({ name: "user" }),
    new roleModel({ name: "mod" }),
  ];
  let role = await roleModel.find();
  if (role.length == 0) {
    roles.forEach(async (rolea) => {
      await rolea.save();
    });
  }
  // tạo user
  let users = [
    new userModel({
      username: "admin_01@gmail.com",
      password: "admin_01@_gmail",
      email: "mihhiu@gmail.com",
      role: roles[0]._id,
      fullname: "Doan Minh Hieu",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "admin_02@gmail.com",
      password: "admin_02@_gmail",
      email: "truogVu@gmail.com",
      role: roles[0]._id,
      fullname: "Cao Truong Vu",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "username_01@gmail.com",
      password: "username_01@_gmail",
      email: "username_01@gmail.com",
      role: roles[1]._id,
      fullname: "username_01",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "username_02@gmail.com",
      password: "username_02@_gmail",
      email: "username_02@gmail.com",
      role: roles[1]._id,
      fullname: "username_02",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "username_03@gmail.com",
      password: "username_03@_gmail",
      email: "username_03@gmail.com",
      role: roles[1]._id,
      fullname: "username_03",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "username_04@gmail.com",
      password: "username_04@_gmail",
      email: "username_04@gmail.com",
      role: roles[1]._id,
      fullname: "username_04",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "username_05@gmail.com",
      password: "username_05@_gmail",
      email: "username_05@gmail.com",
      role: roles[1]._id,
      fullname: "username_05",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
    new userModel({
      username: "mod_01@gmail.com",
      password: "mod_01@_gmail",
      email: "mod_01@gmail.com",
      role: roles[2]._id,
      fullname: "mod_01",
      avatar: "/public/avatar/default-avatar.jpg",
    }),
  ];
  let user = await userModel.find();
  if (user.length == 0) {
    users.forEach(async (user) => {
      await user.save();
    });
  }

  // create list brand
  let typePosts = [
    new typePostModel({ title: "Tin tức", conslution: "Tin tức" }),
    new typePostModel({ title: "Sự kiện", conslution: "Sự kiện" }),
    new typePostModel({ title: "Lập trình", conslution: "Lập trình" }),
    new typePostModel({ title: "Cá nhân", conslution: "Cá nhân" }),
  ];
  let typePostExist = await typePostModel.find();
  if (typePostExist.length == 0) {
    typePosts.forEach(async (typePost) => {
      await typePost.save();
    });
  }

  let posts = [
    new postModel({
      title:
        "Tổng thống donald trump áp thuế 46%. Ảnh hưởng như thế nào đến nền kinh tế việt nam?",
      conslution:
        "Mình mong tình hiện tại là sự xấu nhất của thị trường việt nam, và những điều tệ hơn ở tương lai sẽ không quá tệ. Quá tệ ở đây là đừng xảy ra thêm 1 cuộc xung đột quân sự nào nữa. Nó sẽ khiến nền kinh tế kiệt quệ",
      user: users[0]._id,

      typePost: [typePosts[0]._id, typePosts[1]._id],
    }),
    new postModel({
      title:
        "ChatGPT 4o đang là mô hình AI agent thông minh nhất? thật khó diễn tả",
      conslution:
        "Mình nghĩa việc đánh giá 1 AI có phải là mạnh nhất không ở thời điểm này là không chính xác. bởi liên quan đến nhiều cán cân so sánh khác nhau",
      user: users[1]._id,
      typePost: [typePosts[2]._id, typePosts[3]._id],
    }),
  ];
  let postExist = await postModel.find();
  if (postExist.length == 0) {
    posts.forEach(async (post) => {
      await post.save();
    });
  }

  let componentPosts = [
    new componentPostModel({
      content:
        "Bài viết đầu tiên -> đây là nội dung bài viết đầu tiên. Thật vô tree, nhma nó dài quá, thật lười suy nghĩ để viết ra 1 bài blog cho việc test:D",
      imageUrl: null,
      index: 0,
      postId: posts[0]._id,
    }),
    new componentPostModel({
      content: null,
      imageUrl: "/public/imagePost/donald_trump.jpeg",
      index: 1,
      postId: posts[0]._id,
    }),
    new componentPostModel({
      content:
        "Bài viết thứ 2 -> vấn đề về AI agent, là một lập trình viên, mình nghĩ con AI nào cũng là con AI đáng xài. Vì mục đích của lập trình viên indie là làm ra sản phẩm, và sản phẩm đó có thể là 1 con AI agent",

      index: 0,
      postId: posts[1]._id,
    }),
    new componentPostModel({
      content: null,
      imageUrl: "/public/imagePost/ai_agent.jpeg",
      index: 1,
      postId: posts[1]._id,
    }),
  ];
  let componentPostExist = await componentPostModel.find();
  if (componentPostExist.length == 0) {
    componentPosts.forEach(async (componentPost) => {
      await componentPost.save();
    });
  }

  let favorites = [
    new favoriteModel({ user: users[3]._id, post: posts[0]._id }),
    new favoriteModel({ user: users[3]._id, post: posts[1]._id }),
    new favoriteModel({ user: users[4]._id, post: posts[0]._id }),
    new favoriteModel({ user: users[4]._id, post: posts[1]._id }),
    new favoriteModel({ user: users[2]._id, post: posts[0]._id }),
    new favoriteModel({ user: users[2]._id, post: posts[1]._id }),
    new favoriteModel({ user: users[5]._id, post: posts[0]._id }),
    new favoriteModel({ user: users[6]._id, post: posts[0]._id }),
  ];
  let favoriteExist = await favoriteModel.find();
  if (favoriteExist.length == 0) {
    favorites.forEach(async (favorite) => {
      await favorite.save();
    });
  }

  let comments = [
    new commentModel({
      post: posts[0]._id,
      user: users[2]._id,
      content:
        "Bài viết đầu tiên -> đây là nội dung bài viết đầu tiên. Thật vô tree, nhma nó dài quá, thật lée suy nghĩ seksi viết ra 1 bài blog cho việc test:D",
    }),
    new commentModel({
      post: posts[1]._id,
      user: users[3]._id,
      content: "Hãy nhìn vào sự thành công này",
      imageUrl: "/public/imagePost/commnent_01_01.jpeg",
    }),
    new commentModel({
      post: posts[0]._id,
      user: users[4]._id,
      content:
        "Bài viết đầu tiên -> đây là nội dung bài viết đầu tiên. Thật vô tree, nhma nó dài quá, thật lée suy nghĩ seksi viết ra 1 bài blog cho việc test:D",
    }),
  ];
  let commentExist = await commentModel.find();
  if (commentExist.length == 0) {
  }
  comments.forEach(async (comment) => {
    await comment.save();
  });

  return res.send("done");
});

module.exports = router;
