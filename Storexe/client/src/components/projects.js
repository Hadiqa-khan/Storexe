import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function Projects() {
  return (
    <>
    
      <Form className="container" >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Create a New Project </Form.Label>
          <Form.Control type="text" placeholder="Enter Project Name" />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        
          <Button variant="primary" type="submit">
          Add Member 
        </Button>
            <h1>  </h1>
          <Form.Control  type="text" placeholder="Enter Address (Public-Key)" />
          <Button>-</Button>
        </Form.Group>
        
        <Button id="submit">Submit</Button>
        
        

      </Form>
      <form action="/action_page.php" className="container">
            <label>Type Message here:</label>
            <input type="Text" id="myText" name="mytext" />
            <h1></h1>
            <Button> Send Message </Button>
          </form>
    </>
  );
}
