//cách cũ
// import fs from "fs";
// import path from "path";

// const fileRemover = (filename) => {
//   fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
//     if (err && err.code == "ENOENT") {
//       console.log(`File ${filename} doesn't exist, won't remove it`);
//     } else if (err) {
//       console.log(`Error occured while trying to remove file ${filename}`);
//     } else {
//       console.log(`Removed ${filename}`);
//     }
//   });
// };

// export { fileRemover };

import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
  const filePath = path.join(__dirname, "../uploads", filename);

  // Kiểm tra xem tệp có tồn tại không
  if (fs.existsSync(filePath)) {
    try {
      // Sử dụng try/catch để bắt lỗi từ fs.unlink
      fs.unlinkSync(filePath);
      console.log(`Removed ${filename}`);
    } catch (err) {
      console.error(
        `Error occurred while trying to remove file ${filename}:`,
        err
      );
    }
  } else {
    console.log(`File ${filename} doesn't exist, won't remove it`);
  }
};

export { fileRemover };
