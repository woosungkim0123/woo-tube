import mongoose from "mongoose";
// model을 만드는 이유
// db에 알려줘야함 우리 데이터가 어떻게 생겼는지
// 모델의 형태를 정의해줄 필요가있음(schema(스키마))
const videoSchema = new mongoose.Schema({
  // 같은의미임 title이랑 description
  title: { type: String },
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
