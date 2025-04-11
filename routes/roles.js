var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roles");
let { CreateSuccessRes } = require("../utils/responseHandler");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");

/* GET users listing. */
router.get(
  "/",
  check_authentication,
  check_authorization(constants.USER_PERMISSION),
  async function (req, res, next) {
    try {
      let roles = await roleController.GetAllRoles();
      CreateSuccessRes(res, roles, 200);
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
      let newRole = await roleController.CreateARole(req.body.name);
      CreateSuccessRes(res, newRole, 200);
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
      let role = await roleController.UpdateARole(req.params.id, req.body.name);
      CreateSuccessRes(res, role, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  check_authentication,
  check_authorization(constants.ADMIN_PERMISSION),
  async function (req, res, next) {
    try {
      let role = await roleController.DeleteARole(req.params.id);
      CreateSuccessRes(res, role, 200);
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
      let role = await roleController.GetARole(req.params.id);
      CreateSuccessRes(res, role, 200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
