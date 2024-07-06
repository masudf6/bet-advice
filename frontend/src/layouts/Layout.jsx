import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const darkTheme = {
  palette: {
    mode: "dark",
    
  }
}

const lightTheme = {
  palette: {
    mode: "light"
  }
}

function Layout({ children }) {
  const [theme, setTheme] = useState(window.sessionStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    window.sessionStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  let currentTheme = theme === 'dark' ? createTheme(darkTheme) : createTheme(lightTheme)

  return (
    <ThemeProvider theme={currentTheme}>
        <CssBaseline/>
        <Container maxWidth="md">
          <Container container direction="column">
              <Navbar theme={theme} toggleTheme={toggleTheme} />
                { children }
              <Footer />
          </Container>
        </Container>
    </ThemeProvider>
  )
}

export default Layout