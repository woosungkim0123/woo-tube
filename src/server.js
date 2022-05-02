// 파일자체를 import함 함수를 import하는게 아님
// 서버는 이라인을 보는순간 mongo에연결됨
// db는 모든게 다 실행되고 나서 시작됨
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
/*
const curr = new Date();

// 2. UTC 시간 계산
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

// 3. UTC to KST (UTC + 9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

console.log("한국시간 : " + kr_curr);
*/
const app = express();
const logger = morgan("common");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
// express는 form을 어떻게 다루는지 모름
// form을 처리하고 싶다고 말해야함
// form의 body를 이해함
// extended는 body에 있는 정보들을 보기 좋게 갖추어줌
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
