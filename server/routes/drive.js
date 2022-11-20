// const stream = require('stream');
// const express = require('express');
// const router = express.Router();
// const { scryptSync, createCipheriv } = require('crypto');
// const { mkdirSync, existsSync, writeFileSync } = require('fs');
// const fs = require("fs");
// const path = require("path");


// const multer = require('multer');
const drive = require('../utils/service');
const passport = require('passport');


//----------


const express = require('express');
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const File = require('../models/File');


const storage = multer.memoryStorage()
const upload = multer({ storage });




// const uploadFile = async (fileObject) => {
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(fileObject.buffer);
//     const { data } = await drive({ version: 'v3' }).files.create({
//         media: {
//             mimeType: fileObject.mimeType,
//             body: encrypt(bufferStream),
//         },
//         requestBody: {
//             name: fileObject.originalname,
//             parents: ['1Pph1R69ehuoWkG2YbZHGYbYMzulA1Yd0'],
//         },
//         fields: 'id,name',
//     });
//     console.log(`Uploaded file ${data.name} ${data.id}`);
// };

// router.post('/v1/upload', upload.any(), async (req, res) => {
//     try {
//         const { body, files } = req;
//         console.log(files)

//         for (let f = 0; f < files.length; f += 1) {
//             await uploadFile(files[f]);
//         }

//         console.log(body);
//         res.status(200).send('Form Submitted');
//     } catch (f) {
//         console.log(f)
//         res.send(f.message);
//     }
// });

const CryptoAlgorithm = "aes-256-cbc";

// Obviously keys should not be kept in code, these should be populated with environmental variables or key store
const secret = {
    iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
    key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
}


function encrypt(algorithm, buffer, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return encrypted;
};

function decrypt(algorithm, buffer, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
}

function getEncryptedFilePath(filePath) {
    return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + "_encrypted" + path.extname(filePath))
}

async function saveEncryptedFile(buffer, filePath, key, iv, fileObject, user) {
    const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);

    filePath = getEncryptedFilePath(filePath);
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
    }

    //uploading file to google drive
    const bufferStream = new stream.PassThrough();
    bufferStream.end(encrypted);

    const { data } = await drive({ version: 'v3' }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ['1Pph1R69ehuoWkG2YbZHGYbYMzulA1Yd0'],
        },
        fields: 'id,name',
    });

    console.log(`Uploaded file ${data.name} ${data.id}`);

    //saving file info to db
    const newFile = new File({
        name: fileObject.originalname,
        mime_type: fileObject.mimetype,
        drive_id: data.id,
        size: fileObject.size,
        user: user._id
    });

    newFile.save();


    fs.writeFileSync(filePath, encrypted);
}

function getEncryptedFile(encrypted, key, iv) {
    // filePath = getEncryptedFilePath(filePath);
    // const encrypted = fs.readFileSync(filePath);
    const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
    return buffer;
}

router.post("/v1/upload", passport.authenticate('jwt', { session: false }), upload.single("file"), (req, res, next) => {

    console.log(req.file);
    console.log("file upload: ", req.file.originalname);
    saveEncryptedFile(req.file.buffer, path.join("./uploads", req.file.originalname), secret.key, secret.iv, req.file, req.user);
    res.status(201).json({ status: "ok" });
});


router.get("/v1/download/:driveID", async (req, res, next) => {
    // 101P_6yLStzFQF9qdhuyKKjQNTH-PtChD

    let db_file = await File.findOne({ drive_id: req.params.driveID });

    try {
        const file = await drive({ version: 'v3' }).files.get({
            fileId: req.params.driveID,
            alt: "media",
            supportsAllDrives: true
        },
            { responseType: "stream" },
            function (err, { data }) {
                if (err) {
                    return reject("The API returned an error: " + err);
                }
                let buf = [];
                data.on("data", function (e) {
                    buf.push(e);
                });
                data.on("end", function () {
                    const g_buffer = Buffer.concat(buf);
                    console.log(g_buffer);
                    // fs.writeFile("filename", buffer, err => console.log(err)); // For testing
                    // resolve(buffer);

                    const buffer = getEncryptedFile(g_buffer, secret.key, secret.iv);
                    const readStream = new stream.PassThrough();
                    readStream.end(buffer);
                    res.writeHead(200, {
                        "Content-disposition": "attachment; filename=" + db_file.name,
                        "Content-Type": db_file.mime_type,
                        "Content-Length": buffer.length
                    });
                    res.end(buffer);
                });
            });

        // console.log(file);


    } catch (err) {
        console.log(err);
    }

    // console.log("Getting file:", req.params.fileName);
    // const buffer = getEncryptedFile(path.join("./uploads", `file-${Math.random()}`), secret.key, secret.iv);
    // const readStream = new stream.PassThrough();
    // readStream.end(buffer);
    // res.writeHead(200, {
    //     "Content-disposition": "attachment; filename=" + `file-${Math.random()}`,
    //     "Content-Type": "application/octet-stream",
    //     "Content-Length": buffer.length
    // });
    // res.end(buffer);
});

//get all files
router.get('/v1/files/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let files = await File.find({ user: req.user._id }).lean();
    res.status(200).json({ files: files });
})


module.exports = router;