import { Request } from "express";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb:any) {
		cb(null, "public/temp");
	},
    filename:function(req:Request,file:Express.Multer.File, cb:any){
        cb(null, file.originalname);
    }
});
const upload =multer({storage:storage});

export default upload;