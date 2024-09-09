const createError = require("http-errors");
const multer = require("multer");
function uplaoder(
    subfolder_path,
    allowed_files_types,
    max_file_size,
    error_msg,
){
    //file uploads folder
    const UPLOADS_FOLDER=`{__dirname}/../public/uploads/{subfolder_path}`

    //define the storage
    const storage= multer.diskstorage({
        destination:(req,file,cb)=>{
            cb(null,UPLOADS_FOLDER);
        },
        filename:(req,file,cb)=>{
           const fileExt=path.extname(file.originalname);
           const fileName=file.originalname
           .replace(fileExt,'')
           .toLowerCase()
           .split(' ')
           .join('-')+'-'+Date.now()
           cb(null,fileName+fileExt);
        }
    })
    //prpeare the final multer upload object
    const upload=multer({
        storage:storage,
        limits:{ fileSize:max_file_size},
        fileFilter:(req,file,cb)=>{
            if(allowed_files_types.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb(createError(error_msg));
            }
        }
    })

    return upload
}

module.exports = uplaoder;