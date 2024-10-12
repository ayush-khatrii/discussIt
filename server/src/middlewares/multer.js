import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    storage: storage
});


const uploadAvatar = multerUpload.single("avatar")


export { uploadAvatar }
