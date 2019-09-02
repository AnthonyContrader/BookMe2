import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import Navbar from 'react-bootsrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <Navbar bg="light" expand="lg">
   <Navbar.Brand href="#home">BookME</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
       <Nav.Link href="#link">Users</Nav.Link>
       <Nav.Link href="#link">Stories</Nav.Link>
       <NavDropdown title="Categories" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.2">Sci-fi</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Romance</NavDropdown.Item>
       </NavDropdown>
     </Nav>
     <Form inline>
       {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
       <Button variant="outline-success">Logout</Button>
     </Form>
   </Navbar.Collapse>
 </Navbar>
 </header>
</div>


  );
}

export default App;
