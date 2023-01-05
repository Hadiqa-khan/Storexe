import React, { useState } from "react";
import "./style.css";
import useEth from "../contexts/EthContext/useEth";
import axios from "axios";
export default function BuTTon() {
  const [file, setfile] = useState("");
  const [waddress, setwaddress] = useState("");

  const {
    state: { contract, accounts },
  } = useEth();

  const minting = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    const url = await axios.post("http://localhost:4000/addFile", formData);
    console.log(url);
    console.log(accounts[0]);
    await contract.methods
      .safeMint(waddress, url.data)
      .send({ from: accounts[0],gas:"3000000" });
  };
  return (
    <div className="main">
      <h2>Share Files</h2>

      <form>
        <label id="ForPub">Wallet Address</label>
        <input
          type="text"
          placeholder="Account Address"
          onChange={(e) => {
            setwaddress(e.target.value);
          }}
        />
        <label id="ForPub">Browse File</label>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => {
            setfile(e.target.files[0]);
          }}
        />
        <button className="btn" type="submit" onClick={minting}>
          Send By Account
        </button>
      </form>
    </div>
  );
}
