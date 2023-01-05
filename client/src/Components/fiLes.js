import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default class FiLes extends Component {
  render() {
    return (
      <>
        <center>
          {" "}
          <h1>Files</h1>{" "}
        </center>

        <div className="container">
          <form action="/action_page.php">
            <label> Upload file to IPFS storage</label>
            <input type="file" id="myFile" name="filename" />
          </form>
          <Button variant="primary">Add File</Button>{" "}
          <form action="/action_page.php">
            <label>Enter Folder Name:</label>
            <input type="Text" id="myText" name="mytext" />
          </form>
          <Button variant="primary">Add Folder</Button>{" "}
        </div>
        <h1> </h1>
        <Table striped bordered hover size="sm" className="container" >
          <thead>
            <tr>
              <th>FileName</th>
              <th >File Address</th >
              <th>isFile</th>
              <th>Share</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </Table>
      </>
    );
  }
}
