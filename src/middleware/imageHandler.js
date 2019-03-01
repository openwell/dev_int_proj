import multer from 'multer';
import path from 'path';
import errorHandler from './errorHandler';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${path.join(__dirname, '../../uploads')}`);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only...Format(jpeg,jpg,png,gif)');
};
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

const imageHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (typeof req.file === 'undefined') {
      return errorHandler(400, res, 'Input a valid image');
    }
    if (err instanceof multer.MulterError) {
      return errorHandler(400, res, `${err.message} MaxFile Size 1mb`);
    }
    if (err) {
      return errorHandler(400, res, err);
    }
    return next();
  });
};

export default imageHandler;
