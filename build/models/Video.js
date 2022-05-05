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
var videoSchema = new _mongoose["default"].Schema({
  // 같은의미임 title이랑 description
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now()
  },
  hashtags: [{
    type: String
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
});

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;