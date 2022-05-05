"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect("mongodb://127.0.0.1:27017/wetbue");

var db = _mongoose["default"].connection; // on은 여러번실행
// once는 오로지 한번실행

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  return console.log("👿 DB Error", error);
};

db.on("error", handleError);
db.once("open", handleOpen);
/*, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
*/