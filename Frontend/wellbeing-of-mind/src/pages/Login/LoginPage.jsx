import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    try {
      const response = await fetch('https://localhost:5226/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: formData.get('email'),
          Password: formData.get('password'),
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/');
        window.location.reload();
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '8px',
            padding: '24px',
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "200px", marginBottom: 16 }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
            className='text-white bg-dark'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className='text-white' href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link className='text-white' href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
