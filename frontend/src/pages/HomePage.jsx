import React from 'react'
import { Container } from '@mui/material';
import { Hero } from '../components/Hero';
import Input from '../components/Input';

export const HomePage = () => {

    

  return (
    <Container sx={{ minHeight: '100vh', }}>
        <Hero />
        <Input />      
    </Container>
  )
}
