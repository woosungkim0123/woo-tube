// 파일자체를 import함 함수를 import하는게 아님
// 서버는 이라인을 보는순간 mongo에연결됨
// db는 모든게 다 실행되고 나서 시작됨
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("common");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

// express는 form을 어떻게 다루는지 모름
// form을 처리하고 싶다고 말해야함
// form의 body를 이해함
// extended는 body에 있는 정보들을 보기 좋게 갖추어줌
// form으로 오는 데이터를 처리해줌
app.use(express.urlencoded({ extended: true }));

// text 이해하게 해줌(한가지만 보냄)
//app.use(express.text());

/*
Express에 내장된 미들웨어 기능입니다.
body-parser를 기반으로 request payload로 전달한 JSON을 파싱합니다.
문자열을 받아서 json으로 바꿔줍니다.
주의할 점은 express.json()은 header에 Content-Type이 express.json()의 기본 값인 "application/json"과 일치하는 request만 보는 미들웨어를 반환합니다.
다시 말해, headers: { "Content-type": "application/json" }인 request만 express.json()을 실행한다.
*/
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// 이제 이 미들웨어가 사이트로 들어오는 모두를 기억하게됨
// locals속성은 템플릿에서 사용할 수 있느 ㄴ것
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
