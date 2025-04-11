var express = require("express");
var router = express.Router();
var typePostController = require("../controllers/typePost");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let typePosts = await typePostController.GetAllTypePost();
    CreateSuccessRes(res, typePosts, 200);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    let typePost = await typePostController.GetTypePostById(req.params.id);
    CreateSuccessRes(res, typePost, 200);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  async function (req, res, next) {
    try {
      let typePost = await typePostController.CreateATypePost(req.body);
      CreateSuccessRes(res, typePost, 200);
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
      let typePost = await typePostController.UpdateATypePost(
        req.params.id,
        req.body
      );
      CreateSuccessRes(res, typePost, 200);
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
      let typePost = await typePostController.DeleteATypePost(req.params.id);
      CreateSuccessRes(res, typePost, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
