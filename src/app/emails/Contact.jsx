import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

const ContactEmail = ({ name, email, message }) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio</Preview>
    <Body>
      <Container>
        <Heading>New message from your portfolio</Heading>
        <Text><strong>Name:</strong> {name}</Text>
        <Text><strong>Email:</strong> {email}</Text>
        <Text><strong>Message:</strong></Text>
        <Text>{message}</Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;
