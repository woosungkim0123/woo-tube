import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRotuer from "./routers/videoRotuer";

const app = express();
const logger = morgan("common")
app.use(logger)

/*
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next();
}
const privateMiddleware = (req, res, next) => {
  const url = req.url
  if(url === "/protected") {
    return res.send("<h1>Not allowed</h1>")
  }
  console.log('allowed')
  next();
}
const handleHome = (req, res) => {
  
  return res.send('1');
  // res.end 끝내는거
}
const handlePrivate = (req, res) => {
  return res.send('welcome private lounge');
}
app.use(logger)
app.use(privateMiddleware)
app.get("/", handleHome)
app.get("/", handlePrivate)
*/
// route 추가
// handleHome은 사실상 finalWare, 마지막으로 호출되는 함수, return 하면 연결이 종료되니까
// 그래서 next가 필요없음
// 하지만 모든 controller가 미들웨어가 될 수 있음
// res.send('111')을 next 이전에 적으면 다음 함수는 호출되지않음


app.use("/", globalRouter)
app.use("/users", userRouter)
app.use("/videos", videoRotuer)





const PORT = 4000;
app.listen(PORT, () => console.log( `✅ Server listening on port http://localhost:${PORT}`));
