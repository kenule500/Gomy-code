import React from 'react';
import { Card } from 'react-bootstrap';

const Player = ({ name, team, nationality, jerseyNumber, age, imageUrl }) => {
  // Inline styling for the "Royal" feel
  const cardStyle = {
    width: '18rem',
    margin: '20px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    border: '2px solid #D4AF37' // Royal Gold border
  };

  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={imageUrl} style={{ borderRadius: '15px 15px 0 0', height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Text>
          <strong>Team:</strong> {team} <br />
          <strong>Nationality:</strong> {nationality} <br />
          <strong>Jersey:</strong> #{jerseyNumber} <br />
          <strong>Age:</strong> {age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Default Props
Player.defaultProps = {
  name: "Unknown Player",
  team: "Free Agent",
  nationality: "Global",
  jerseyNumber: 0,
  age: "N/A",
  imageUrl: "https://via.placeholder.com/150"
};

export default Player;