"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _middlewares = require("./middlewares");

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
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2000000
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
})); // 이제 이 미들웨어가 사이트로 들어오는 모두를 기억하게됨

app.use(_middlewares.localsMiddleware);
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
var _default = app;
/*
const {
  session: {
    user: {id},
  },
  body{name}
}


세션 업데이트 시켜줄려면?
db도 업데이트하고 이것도 업데이트

직접하는것 req.session.user ={
  ...req.session.user,
  //업데이트해줌밑에꺼
  name,
  email,

}



*/

exports["default"] = _default;