"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get("/", _videoController.home);
globalRouter.get("/join", _userController.join);
globalRouter.get("/login", _userController.login);
globalRouter.get("/search", _videoController.search);
var _default = globalRouter;
exports["default"] = _default;