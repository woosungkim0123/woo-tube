"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videoController.home);
rootRouter.route("/join").get(_userController.getJoin).post(_userController.postJoin);
rootRouter.route("/login").get(_userController.getLogin).post(_userController.postLogin);
rootRouter.get("/logout", _userController.logout);
rootRouter.get("/search", _videoController.search);
var _default = rootRouter;
exports["default"] = _default;