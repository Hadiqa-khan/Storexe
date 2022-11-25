import React, { useState } from "react";
import './style.css';
export default function FileShared() {
  const [history, setHistory] = useState([]);
  return (
    <div>
       <header className="App-header">Storexe<p style={{fontSize:"20px", fontStyle:"italic"}}>Secure File Storage</p></header>
       <div className="main">
        <button className="btn" id="ForFiles"> Check Shared Files </button>
  
          <table border="1" className="Files">
            <thead>
              <td>Id</td>
              <td>Owner</td>
              <td>Shared By</td>
              <td>Encrypted File Uri</td>
              <td>Decrypt File</td>
            </thead>
           
              <tr>
                <td>1</td>
                <td>0xxx</td>
                <td>nn</td>
                <td>d</td>
                <td> <button className="btn" id="ForDecrypt">Decrypt</button></td>
           
              </tr>
            
          </table>
  
      </div>
    </div>
  )
}


