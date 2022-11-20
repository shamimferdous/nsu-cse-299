const stream = require('stream');
const express = require('express');
const router = express.Router();
const { scryptSync, createCipheriv } = require('crypto');
const { mkdirSync, existsSync, writeFileSync } = require('fs');
const fs = require("fs");
const path = require("path");



const multer = require('multer');
const drive = require('../utils/service');
const upload = multer();



//----------


// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const crypto = require("crypto");
// const fs = require("fs");
// const path = require("path");
// const stream = require("stream");


// const storage = multer.memoryStorage()
// const upload = multer({ storage });




const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    console.log('this is buffer stream');
    console.log(typeof (bufferStream))
    console.log(bufferStream)

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
};

router.post('/v1/upload', upload.any(), async (req, res) => {
    try {
        const { body, files } = req;
        console.log(files)

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }

        console.log(body);
        res.status(200).send('Form Submitted');
    } catch (f) {
        console.log(f)
        res.send(f.message);
    }
});

// const CryptoAlgorithm = "aes-256-cbc";

// // Obviously keys should not be kept in code, these should be populated with environmental variables or key store
// const secret = {
//     iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
//     key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
// }


// function encrypt(algorithm, buffer, key, iv) {
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
//     return encrypted;
// };

// function decrypt(algorithm, buffer, key, iv) {
//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
//     return decrypted;
// }

// function getEncryptedFilePath(filePath) {
//     return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + "_encrypted" + path.extname(filePath))
// }

// async function saveEncryptedFile(buffer, filePath, key, iv, fileObject) {
//     const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);

//     filePath = getEncryptedFilePath(filePath);
//     if (!fs.existsSync(path.dirname(filePath))) {
//         fs.mkdirSync(path.dirname(filePath))
//     }

//     //uploading file to google drive
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(encrypted.buffer);

//     const { data } = await drive({ version: 'v3' }).files.create({
//         media: {
//             mimeType: fileObject.mimeType,
//             body: bufferStream,
//         },
//         requestBody: {
//             name: fileObject.originalname,
//             parents: ['1Pph1R69ehuoWkG2YbZHGYbYMzulA1Yd0'],
//         },
//         fields: 'id,name',
//     });

//     console.log(`Uploaded file ${data.name} ${data.id}`);


//     fs.writeFileSync(filePath, encrypted);
// }

// function getEncryptedFile(filePath, key, iv) {
//     filePath = getEncryptedFilePath(filePath);
//     const encrypted = fs.readFileSync(filePath);
//     const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
//     return buffer;
// }

// router.post("/v1/upload", upload.single("file"), (req, res, next) => {
//     console.log(req.file);
//     console.log("file upload: ", req.file.originalname);
//     saveEncryptedFile(req.file.buffer, path.join("./uploads", req.file.originalname), secret.key, secret.iv, req.file);
//     res.status(201).json({ status: "ok" });
// });

// router.post("/v1/upload", (req, res, next) => {
//     // console.log("Getting file:", req.params.fileName);
//     const buffer = getEncryptedFile(path.join("./uploads", `file-${Math.random()}`), secret.key, secret.iv);
//     const readStream = new stream.PassThrough();
//     readStream.end(buffer);
//     res.writeHead(200, {
//         "Content-disposition": "attachment; filename=" + `file-${Math.random()}`,
//         "Content-Type": "application/octet-stream",
//         "Content-Length": buffer.length
//     });
//     res.end(buffer);
// });


module.exports = router;