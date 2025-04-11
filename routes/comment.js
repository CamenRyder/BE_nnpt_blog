var express = require("express");
var router = express.Router();
let commentController = require("../controllers/comment");
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
  "/:postId",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let postId = req.params.postId;
      console.log(postId);
      let comments = await commentController.GetAllCommentByPostId(postId);
      CreateSuccessRes(res, comments, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  upload.single("image"),
  async function (req, res, next) {
    try {
      const file = req.file;
      let imageUrl = null;
      if (file && file.filename == "image") {
        console.log(file);

        imageUrl = `/public/imagePost/${file.filename}`;
      }

      let body = req.body;
      let newComment = await commentController.CreateAComment(
        body.postId,
        req.user._id,
        body.content,
        imageUrl
      );
      CreateSuccessRes(res, newComment, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let comment = await commentController.UpdateAComment(
        req.params.id,
        req.body
      );
      CreateSuccessRes(res, comment, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let comment = await commentController.DeleteAComment(req.params.id);
      CreateSuccessRes(res, comment, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
