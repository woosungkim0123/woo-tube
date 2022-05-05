"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/:id(\\d+)", _videoController.watch);
videoRouter.route("/:id(\\d+)/edit").get(_videoController.getEdit).post(_videoController.postEdit);
videoRouter.route("/upload").get(_videoController.getUpload).post(_videoController.postUpload);
var _default = videoRouter;
exports["default"] = _default;