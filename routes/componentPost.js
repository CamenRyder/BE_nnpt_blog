var express = require("express");
var router = express.Router();
let componentPostController = require("../controllers/componentPost");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let { CreateSuccessRes } = require("../utils/responseHandler");
let constants = require("../utils/constants");
let multer = require("multer");
/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imagePost/"); // Lưu vào thư mục "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Đổi tên file
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image/)) {
      cb(new Error("tao chi nhan anh? thoi"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let postId = req.query.postId;
      console.log(postId);

      let componentPosts =
        await componentPostController.GetAllComponentPostByPostId(postId);
      CreateSuccessRes(res, componentPosts, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  upload.single("image"),
  async function (req, res, next) {
    try {
      const file = req.file;
      console.log(file);
      let avatarUrl = null;
      if (file && file.originalname) {
        avatarUrl = `/public/imagePost/${file.filename}`;
      }
      let body = req.body;

      let postId = body.postId;
      // parse string to int
      let index = parseInt(body.index, 0);

      console.log(index);
      let imageUrl = avatarUrl;
      let content = body.content;
      let newComponentPost = await componentPostController.CreateAComponentPost(
        postId,
        index,
        imageUrl,
        content
      );
      CreateSuccessRes(res, newComponentPost, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  upload.single("image"),
  async function (req, res, next) {
    try {
      const file = req.file;
      let avatarUrl = null;
      if (file && file.fieldname == "image") {
        avatarUrl = `/public/imagePost/${file.filename}`;
      }
      let body = req.body;
      body.index = parseInt(body.index, 0);
      body.content;
      body.imageUrl = avatarUrl;
      let componentPost = await componentPostController.UpdateAComponentPost(
        req.params.id,
        body
      );
      CreateSuccessRes(res, componentPost, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async function (req, res, next) {
    try {
      let componentPost = await componentPostController.DeleteAComponentPost(
        req.params.id
      );
      CreateSuccessRes(res, componentPost, 200);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let componentPost = await componentPostController.GetComponentPostById(
        req.params.id
      );
      CreateSuccessRes(res, componentPost, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
