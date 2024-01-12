import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Navbar from "../home/Navbar.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://195.35.29.110:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const userData = await response.json();
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.userId);
      await delay(1000);
      document.location.href="/";
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
      <div>
        <Navbar/>
        <Container maxWidth="sm">
          <Box mt={5}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="mail"
                  type="email"
                  value={formData.mail}
                  onChange={handleChange}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth mt={3}>
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </div>
  );
};

export default Login;
