const moment = require("moment");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: function (req, file, done) {
    console.log(__dirname);
    done(null, "src/public/uploads/");
  },

  filename: function (req, file, done) {
    done(
      null,
      `${moment().format("yyyyMMDD_HHmmss")}_${file.originalname}`
        .split(" ")
        .join("_")
    );
  },
});

const filterFile = (req, file, done) => {
  if (file.mimetype === "application/pdf") {
    done(null, true);
  } else {
    done(null, false);
  }
};

const uploadFile = multer({
  //   dest: "src/public/uploads/",
  storage: storageFile,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: filterFile,
});

module.exports = {
  uploadFile,
};
