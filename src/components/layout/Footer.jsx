import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
    let today=new Date();
  return (
    <footer className='bg-dark text-light py-3 footer mt-lg-5 z-2'>
        <Container>
            <Row>
                <Col xs={12} md={12} className='text-center'>
                    <p>&copy; {today.getFullYear()} lakeSide Hotel</p>
        
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer