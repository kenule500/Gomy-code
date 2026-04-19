import React from 'react';
import Player from './Player';
import players from './players';
import { Container, Row, Col } from 'react-bootstrap';

const PlayersList = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        {players.map((player, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="d-flex justify-content-center">
            {/* Using the Spread Operator to pass all attributes at once */}
            <Player {...player} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlayersList;