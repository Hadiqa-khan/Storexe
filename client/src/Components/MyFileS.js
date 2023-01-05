import React, { useState } from "react";
import "./style.css";
import useEth from "../contexts/EthContext/useEth";
import axios from "axios";
export default function MyFileS() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [data, setData] = useState([]);
  const [orignalData, setOrignaldata] = useState("");

  const loadFiles = async () => {
    const result = await contract.methods
      .share_files()
      .call({ from: accounts[0] });
    setData(result);
    console.log(result);
  };
  const decryptFile = async (hash) => {
    const decryptData = await axios.post("http://localhost:4000/getFile", {
      Hash: hash,
    });
    setOrignaldata(decryptData.data);
    console.log(decryptData.data);
  };

  return (
    <div>
      <header className="App-header">
        Storexe
        <p style={{ fontSize: "20px", fontStyle: "italic" }}>
          Secure File Storage
        </p>
      </header>
      <div className="main">
        <button className="btn" id="ForFiles" onClick={loadFiles}>
          Check Shared Files
        </button>

        <table border="1" className="Files">
          <thead>
            <td>Id</td>
            <td>Owner</td>
            <td>Shared By</td>
            <td>Encrypted File Uri</td>
            <td>Decrypt File</td>
          </thead>

          {data
            ? data.map((item) => (
                <tr>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>
                    <a
                      href={`https://infura-ipfs.io/ipfs/${item[3]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`https://infura-ipfs.io/ipfs/${item[3]}`}
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn"
                      id="ForDecrypt"
                      onClick={() => {
                        decryptFile(item[3]);
                      }}
                    >
                      Decrypt
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </table>
        {orignalData ? (
          <div style={{ overflow: "scroll", width: "95%", height: "500px" }}>
            <textarea
              id="txtComment"
              style={{ height: "100%", width: "100%" }}
              value={orignalData}
            ></textarea>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
