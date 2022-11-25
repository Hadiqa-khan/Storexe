// import { create } from "ipfs-http-client";
const { randomUUID, publicDecrypt } = require("crypto");
const CryptoJs = require("crypto-js");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
// const CryptoJs = require('crypto-js');
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
  console.log("Word Arry", wordArray);
  const str = CryptoJs.enc.Hex.stringify(wordArray);
  console.log("Hex String", str);
  const ciphertext = CryptoJs.AES.encrypt(str, "mysecret");
  console.log("Encypted", ciphertext);
  console.log("CipherText:", ciphertext.toString());
  var newct = ciphertext.toString();
  return newct;
};

function decrypt(arg){
    var decryptedData = CryptoJs.AES.decrypt(arg, 'mysecret');
    let decryptText = decryptedData.toString(CryptoJs.enc.Utf8);
    let nothex=CryptoJs.enc.Hex.parse(decryptText);
    console.log("decryptText ：" + nothex.toString(CryptoJs.enc.Utf8));
}
    async function sendFiles() {
    let ipfs = await client();
    let pathToFile = path.format({
        dir: "E:\\uni",
        base: "fizzbuzz.py",
    });
    // console.log(pathToFile)
    let tFile = fs.readFileSync(pathToFile);
    let ct = encrypt(tFile);
    let testBuffer = new Buffer(ct);
    console.log(testBuffer);
    let result = await ipfs.add(testBuffer);
    console.log(result);
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

getFile("QmamWHhjLEFZZosht7u8Y4tUQCgCh7K27LEeekNaAPt6o8");

//   app.post('/addFile',function(req,res)
//   {
//     client.files.add(testBuffer,function(err,file){
//         if(err){
//             console.log(err);
//         }
//         console.log(file);
//     })
//   })

//   app.get('/getFile',function(req,res){
//     const hash=""
//     client.files.get(hash,function(err,file){
//         files.forEach((file)=>
//         {
//             console.log(file.path)
//             console.log(file.content.toString('utf8'))
//         })
//     })
//   })

// app.listen(3000,()=> console.log( "App listening on port 3000"));
