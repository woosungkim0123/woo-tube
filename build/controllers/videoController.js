"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.search = exports.postUpload = exports.postEdit = exports.home = exports.getUpload = exports.getEdit = void 0;

var _Video = _interopRequireDefault(require("../models/Video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Video["default"].find({});

          case 2:
            videos = _context.sent;
            return _context.abrupt("return", res.render("home", {
              pageTitle: "Home",
              videos: videos
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var watch = function watch(req, res) {
  //const id = req.params.id;
  var id = req.params.id;
  return res.render("watch", {
    pageTitle: "Watch"
  });
};

exports.watch = watch;

var search = function search(req, res) {
  return res.send("Search Video");
};

exports.search = search;

var getEdit = function getEdit(req, res) {
  var id = req.params.id;
  return res.render("edit", {
    pageTitle: "Editing"
  });
};

exports.getEdit = getEdit;

var postEdit = function postEdit(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  return res.redirect("/videos/".concat(id));
};

exports.postEdit = postEdit;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload Video"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, title, description, hashtags;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags;
            _context2.prev = 1;
            _context2.next = 4;
            return _Video["default"].create({
              title: title,
              description: description,
              //createdAt: Date.now(),
              hashtags: hashtags.split(",").map(function (word) {
                return "#".concat(word);
              })
            });

          case 4:
            return _context2.abrupt("return", res.redirect("/"));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.render("upload", {
              pageTitle: "Upload Video",
              errorMessage: _context2.t0._message
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;