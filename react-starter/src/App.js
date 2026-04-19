import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Name from './components/name';
import Price from './components/price';
import Description from './components/description';
import Image from './components/image';
import 'bootstrap/dist/css/bootstrap.min.css';

// Variable for the personalized greeting
const firstName = "Kenule-Nwinee"; 

function App() {
  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <Card style={{ width: '22rem', border: 'none', borderRadius: '20px' }} className="shadow-lg p-3">
        <Image />
        <Card.Body>
          <Name />
          <Price />
          <Description />
        </Card.Body>
      </Card>

      <div className="mt-4 text-center">
        <h4 className="display-6">
          {firstName ? `Hello, ${firstName}!` : "Hello, there!"}
        </h4>
        {firstName && (
          <img 
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png" 
            alt="Welcome" 
            style={{ width: '50px', marginTop: '10px' }} 
          />
        )}
      </div>
    </Container>
  );
}

export default App;