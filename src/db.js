import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wootube");

const db = mongoose.connection;
// on은 여러번실행
// once는 오로지 한번실행

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("👿 DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
/*, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
*/
