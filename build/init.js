"use strict";

require("dotenv/config");

require("regenerator-runtime");

require("./db");

require("./models/Video");

require("./models/User");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;

_server["default"].listen(PORT, function () {
  return console.log("\u2705 Server listening on port http://localhost:".concat(PORT));
});