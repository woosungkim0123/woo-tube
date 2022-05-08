"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// model을 만드는 이유
// db에 알려줘야함 우리 데이터가 어떻게 생겼는지
// 모델의 형태를 정의해줄 필요가있음(schema(스키마))
// 두번째방법

/*
export const formatHashtags = (hastags) =>
  hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
*/
var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLegnth: 80
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now()
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  meta: {
    views: {
      type: Number,
      required: true,
      "default": 0
    },
    rating: {
      type: Number,
      required: true,
      "default": 0
    }
  }
}); // 미들웨어는 모델이 만들어지기전에 만들어야함

/*
// 첫번째 방법
videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
*/
// 세번째방법

videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word : "#".concat(word);
  });
});

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;