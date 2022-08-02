const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
 destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: function (req, file, cb) {
     let ext = path.extname(file.originalname);
     cb(null, Date.now() + ext);
   },
 });
 console.log(storage.filename)
 var upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
     if (
    file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      return cb(null, true);
    } else console.log("only pdf jpg and jng file will support");
     return cb(new Error("You can upload only image files!"));
   },

});

 module.exports = upload;
