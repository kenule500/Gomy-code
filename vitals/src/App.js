import React from 'react';
// Import required React-Bootstrap components
import { Container, Navbar, Nav, Card, Row, Col } from 'react-bootstrap';
// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="App">
        {/* 1. Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">BRCA Academy</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Classes</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* 2. Heading */}
        <Container className="mt-5 text-center">
          <h1 className="display-4 fw-bold mb-4">Welcome to Royal Class Academy</h1>
          
          {/* 3. Three Cards */}
          <Row className="g-4">
            {[1, 2, 3].map((cardNum) => (
              <Col key={cardNum} md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>Course Module {cardNum}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Core Excellence</Card.Subtitle>
                    <Card.Text>
                      Detailed overview of our exclusive Year {cardNum} curriculum and 
                      student development milestones.
                    </Card.Text>
                    <Card.Link href="#">Read More</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;