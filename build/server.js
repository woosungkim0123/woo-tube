"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 파일자체를 import함 함수를 import하는게 아님
// 서버는 이라인을 보는순간 mongo에연결됨
// db는 모든게 다 실행되고 나서 시작됨

/*
const curr = new Date();

// 2. UTC 시간 계산
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

// 3. UTC to KST (UTC + 9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

console.log("한국시간 : " + kr_curr);
*/
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("common");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); // express는 form을 어떻게 다루는지 모름
// form을 처리하고 싶다고 말해야함
// form의 body를 이해함
// extended는 body에 있는 정보들을 보기 좋게 갖추어줌

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _globalRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
var _default = app;
exports["default"] = _default;