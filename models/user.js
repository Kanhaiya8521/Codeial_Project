const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
//   console.log('multer({storage: storage})', multer({storage: storage}).fileFilter);
  const upload = multer({storage: storage, fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .svg, .webp, .jpg and .jpeg format allowed!"));
    }},
});

  userSchema.statics.uploadedAvatar = upload.single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH ;

const User = mongoose.model('User', userSchema);
module.exports = User;

