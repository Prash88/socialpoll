// @flow
import React from 'react';
import { List } from 'semantic-ui-react';
import { Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = () =>
  <div className="footer">
    <div>process.env.PUBLIC_URL</div>
    <Divider />
    <Container textAlign="center">
      <List floated="right" horizontal>
        <List.Item disabled href="#">
          © Hokage, Inc.
        </List.Item>
        <List.Item>
          <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
        </List.Item>
      </List>
    </Container>
  </div>;

export default Footer;
