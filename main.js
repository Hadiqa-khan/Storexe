// import { create } from "ipfs-http-client";
const { randomUUID, publicDecrypt } = require("crypto");
const CryptoJs = require("crypto-js");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { send } = require("process");

const app = express();
const multer = require("multer");
const cors = require('cors');
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')


async function client() {
  const { create } = await import("ipfs-http-client");
  const projectId = "2HSTD4N9w97PpunnUCB9TwKX8Yu";
  const projectSecret = "943aa3c8150398d75fd4355feac4e876";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = await create({
    host: "infura-ipfs.io:5001",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
}
function encrypt(arg){
 
  const wordArray = CryptoJs.lib.WordArray.create(arg);
  //console.log("Word Arry", wordArray);
  const str = CryptoJs.enc.Hex.stringify(wordArray);
  //console.log("Hex String", str);
  const ciphertext = CryptoJs.AES.encrypt(str, "mysecret");
  //console.log("Encypted", ciphertext);
  //console.log("CipherText:", ciphertext.toString());
  var newct = ciphertext.toString();
  return newct;
};

function decrypt(arg){
    var decryptedData = CryptoJs.AES.decrypt(arg, 'mysecret');
    let decryptText = decryptedData.toString(CryptoJs.enc.Utf8);
    let nothex=CryptoJs.enc.Hex.parse(decryptText);
    console.log("decryptText ：" + nothex.toString(CryptoJs.enc.Utf8));
}
function cid_of_file(cid)
{
    return cid;
}
    async function sendFiles(file) {
    let ipfs = await client();
    let ct = encrypt(file);
    let testBuffer = new Buffer(ct);
    let result = await ipfs.add(testBuffer);
    cid_of_file(result.path);
    }
//sendFiles();

    async function getFile(hash) {
    let ipfs = await client();

    let asyncitr = ipfs.cat(hash);

    for await (const itr of asyncitr) {
        let data = Buffer.from(itr).toString();
        decrypt(data);

        // console.log(data);
    }
    }

// getFile("QmamWHhjLEFZZosht7u8Y4tUQCgCh7K27LEeekNaAPt6o8");




app.post('/sendFile',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
        const file = fs.readFileSync(req.file.path);
        sendFiles(file);
        //res.send();

    })
    



});

// app.get('/getFile',function(req,res){
//     console.log(req.body);
//     getFile("QmNmFkp7mqrcuAeLSdcAQdQuFYiZ5vFwtLSAdnM4UjU3Y4");
//     res.send('File retrieve succesffully');

//  })

app.listen(8000,()=> console.log( "App listening on port 8000"));
