const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const CryptoJs = require("crypto-js");
const multer = require("multer");
const fs = require("fs");
const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());

const uploadFile = multer({ dest: "public/" });

const client = async () => {
  const projectId = "2I5g1KBOukX333szskGyUz7Y6vf";
  const projectSecret = "deca1b92db8ceb91ec687f66a4c345c3";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const { create } = await import("ipfs-http-client");
  const ipfs = create({
    host: "infura-ipfs.io:5001",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
};
const encrypt = (arg) => {
  const wordArray = CryptoJs.lib.WordArray.create(arg);

  const str = CryptoJs.enc.Hex.stringify(wordArray);

  const ciphertext = CryptoJs.AES.encrypt(str, "mysecret");

  var newct = ciphertext.toString();
  return newct;
};
const decrypt = (arg) => {
  var decryptedData = CryptoJs.AES.decrypt(arg, "mysecret");
  let decryptText = decryptedData.toString(CryptoJs.enc.Utf8);
  let nothex = CryptoJs.enc.Hex.parse(decryptText);
  console.log("decryptText ：" + nothex.toString(CryptoJs.enc.Utf8));
  return nothex.toString(CryptoJs.enc.Utf8);
};
async function sendFiles(tFile) {
  let ipfs = await client();
  // let res1 = await ipfs.add("KILL");
  // console.log("ipfsHash", res1.path);
  let ct = encrypt(tFile);
  console.log(typeof ct);
  let testBuffer = new Buffer(ct);
  console.log("Encrpyt ", testBuffer);
  let result = await ipfs.add(testBuffer);

  console.log("ipfsHash", result.path);
  return result.path;
}

async function getFile(hash) {
  let ipfs = await client();

  let asyncitr = ipfs.cat(hash);

  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString();
    const decryptdta = decrypt(data);
    return decryptdta;
    // console.log(data);
  }
}
app.post("/getFile", async (req, res) => {
  const { Hash } = req.body;
  console.log(req.body);
  const data = await getFile(Hash);
  res.status(200).send(data);
});
app.post("/addFile", uploadFile.single("file"), async (req, res) => {
  console.log("In");
  const file = fs.readFileSync(req.file.path);

  const hash = await sendFiles(file);
  console.log("Hash", hash);
  res.status(200).send(hash);
});
app.listen(4000, () => console.log("App listening on port 4000!"));
