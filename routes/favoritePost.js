var express = require("express");
var router = express.Router();
var favoritePostController = require("../controllers/favoritePost");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

router.post(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let body = req.body;
      console.log(body);
      
      let newFavoritePost = await favoritePostController.FavoritePostByUser(
        body
      );
      CreateSuccessRes(res, newFavoritePost, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:postId",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let postId = req.params.postId;
      let favoritePost =
        await favoritePostController.GetAllFavoritePostByPostId(postId);
      CreateSuccessRes(res, favoritePost, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
