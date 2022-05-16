import mongoose from "mongoose";
// model을 만드는 이유
// db에 알려줘야함 우리 데이터가 어떻게 생겼는지
// 모델의 형태를 정의해줄 필요가있음(schema(스키마))

// 두번째방법
/*
export const formatHashtags = (hastags) =>
  hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
*/
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLegnth: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now() },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
// 미들웨어는 모델이 만들어지기전에 만들어야함
/*
// 첫번째 방법
videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/

// 세번째방법
videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
