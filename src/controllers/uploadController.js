const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (_, file, cb) => {
    let type = 'other';
    if (file.mimetype.startsWith('video')) {
      type = 'video';
    } else if (file.mimetype.startsWith('image')) {
      type = 'image';
    }
    cb(null, `public/${type}/`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
``
const multerFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  dest: 'public/',
  fileFilter: multerFilter,
});

exports.uploadFile = upload.single('file');

exports.uploadFileHandler = (req, res) => {
  return res.status(200).send({
    ok: true,
    data: req.file.path
  });
};
