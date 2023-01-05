const { ethers } = require("hardhat");

async function main() {
  const FileShare = await ethers.getContractFactory("FileShare");

  const NFTMP = await FileShare.deploy();

  console.log("Contract Deploy At Address :", NFTMP.address);
}

main()
  .then(() => process.emit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
