import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);

  res.locals.siteName = "WooTube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    // flash 미들웨어를 설치하면 message locals를 만들어줌
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 20000000 },
  storage:
    process.env.NODE_ENV === "production"
      ? multerS3({
          s3,
          bucket: "wootube/avatars",
        })
      : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 50000000 },
  storage:
    process.env.NODE_ENV === "production"
      ? multerS3({ s3, bucket: "wootube/videos", acl: "public-read" })
      : undefined,
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);
