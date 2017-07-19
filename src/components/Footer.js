import React from 'react';
import { List } from 'semantic-ui-react'
import { Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="footer">
    <Divider />
    <Container textAlign='center'>
      <List floated='right' horizontal>
        <List.Item disabled href='#'>© Hokage, Inc.</List.Item>
        <List.Item><Link to='/'>Home</Link></List.Item>
      </List>
    </Container>
  </div>
)

export default Footer;