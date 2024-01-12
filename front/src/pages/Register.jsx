import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from "../home/Navbar.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    mail: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
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

      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
      <div>
        <Navbar/>
        <Container maxWidth="sm">
          <Box mt={5}>
            <Typography variant="h4" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
              />
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
                Register
              </Button>
            </form>
          </Box>
        </Container>
      </div>
  );
};

export default Register;