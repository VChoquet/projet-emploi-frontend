import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res){
        res.status(501).json({error: `${error.message}`});
    },
    onNoMatch(req, res){
        res.status(405).json({error: `Method ${req.method} not allowed`});
    },
});

apiRoute.use(upload.single('theFile'));

apiRoute.post((req, res) => {
    res.status(200).json({data: 'file uploaded'});
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};