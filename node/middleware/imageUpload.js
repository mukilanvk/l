import multer from "multer";
import path from 'path';

const storage =multer.diskStorage({
    destination:function(req,file,callback) {
    callback(null,"uploads/");
    },
    filename: function(req,file,callback){
        const simpleName = `${Date.now()}${path.extname(file.originalname)}`; 
        callback(null,simpleName)
    }
})


const fileFilter = (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Only images are allowed"), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
    limits: { files: 5}
  }).array("productImage", 5);
  
  
  export const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message:  "Image upload failed.",
        });
      }
      next();
    });
  };