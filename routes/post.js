var express = require("express");
var router = express.Router();
var postController = require("../controllers/post");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

/* GET users listing. */
router.get(
  "/",
  // check_authentication,
  // check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      // let page = req.params.page || 1;
      // let pageSize = req.params.pageSize || 10;
      // let userId = req.user._id;
      let posts = await postController.GetAllPost();
      CreateSuccessRes(res, posts, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  // check_authentication,
  // check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let post = await postController.GetPostById(req.params.id);
      console.log(post);
      
      
      CreateSuccessRes(res, post, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async function (req, res, next) {
    try {
      let body = req.body;
      let newPost = await postController.CreateAPost(
        body.title,
        body.conslution,
        req.user._id,
        body.typePost,
        body.totalComment,
        body.totalLiked
      );
      CreateSuccessRes(res, newPost, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async function (req, res, next) {
    try {
      let post = await postController.UpdateAPost(req.params.id, req.body);
      CreateSuccessRes(res, post, 200);
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
      let post = await postController.DeleteAPost(req.params.id);
      CreateSuccessRes(res, post, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
