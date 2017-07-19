import React from 'react';
import { List } from 'semantic-ui-react'
import { Container, Divider } from 'semantic-ui-react'
import '../css/App.css';

const Footer = () => (
  <div className="footer">
    <Divider />
    <Container textAlign='center'>
      <List floated='right' horizontal>
        <List.Item disabled href='#'>© Hokage, Inc.</List.Item>
        <List.Item href='#'>Login</List.Item>
        <List.Item href='#'>Sign Up</List.Item>
      </List>
    </Container>
  </div>
)

export default Footer;
