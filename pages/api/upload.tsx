import nextConnect from "next-connect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

let filename: string;

const setFilename = (file: Express.Multer.File) => {
    filename = file.originalname.replace(/\.[^/.]+$/, "").replaceAll(" ", "_") + "_" + Date.now() + path.extname(file.originalname);
}

const upload = multer({
    storage: multer.diskStorage({
        destination:function(req, file, cb){
            cb(null, "public/uploads");
            setFilename(file);
        },
        filename: (req, file, cb) => cb(null, file.originalname.replace(/\.[^/.]+$/, "").replaceAll(" ", "_") + "_" + Date.now() + path.extname(file.originalname)),
    }),
});



const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res){
        res.status(501).json({error: `${error.field}`});
    },
    onNoMatch(req, res){
        res.status(405).json({error: `Method ${req.method} not allowed`});
    },
});



apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
    res.status(200).json({data: "/public/uploads/" + filename});
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};