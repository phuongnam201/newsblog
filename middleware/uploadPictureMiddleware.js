//cách cũ

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()} - ${file.originalname}`);
//   },
// });

// const uploadPicture = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 3 * 1000000, //3mb
//   },
//   fileFilter: function (req, file, cb) {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
//       return cb(new Error("Only images are allowed"));
//     }
//     cb(null, true);
//   },
// });

// export { uploadPicture };

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000000, // 3MB
  },
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only images (png, jpg, jpeg) are allowed"));
    }
    cb(null, true);
  },
});

export { uploadPicture };
