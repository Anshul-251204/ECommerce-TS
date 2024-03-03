import multer, { diskStorage } from "multer";

const storage = diskStorage({
	destination: function (req, file: Express.Multer.File, cb: any) {
		cb(null, "public/temp");
	},
	filename: function (
		req,
		file: Express.Multer.File,
		cb: any
	) {
		cb(null, file.originalname);
	},
});
const upload =multer({storage:storage});

export default upload;