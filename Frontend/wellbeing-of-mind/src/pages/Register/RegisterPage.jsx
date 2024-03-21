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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [passwordConditions, setPasswordConditions] = useState({
        length: false,
        digit: false,
        lowercase: false,
        uppercase: false,
        nonAlphanumeric: false,
    });

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPasswordConditions({
            length: password.length >= 8,
            digit: /\d/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            nonAlphanumeric: /\W|_/.test(password),
        });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      
      const username = formData.get('username');
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const password = formData.get('password');
  
      const newErrors = {};
      if (!username) newErrors.username = 'Username is required';
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!email) newErrors.email = 'Email is required';
      if (!password) {
          newErrors.password = 'Password is required';
      } else {
          if (!(passwordConditions.length && passwordConditions.digit && passwordConditions.lowercase && passwordConditions.uppercase && passwordConditions.nonAlphanumeric)) {
              newErrors.password = 'Password does not meet requirements';
          }
      }
  
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
          try {
              const response = await fetch('https://localhost:5226/api/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      Username: username,
                      FirstName: firstName,
                      LastName: lastName,
                      Email: email,
                      Password: password,
                  }),
              });
  
              if (response.ok) {
                  console.log('User registered successfully!');
                  navigate('/login');
              } else {
                  console.error('Registration failed');
              }
          } catch (error) {
              console.error('Error:', error);
          }
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
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '8px',
                        padding: '24px',
                    }}
                >
                    <img src={logo} alt="Logo" style={{ width: "200px", marginBottom: 16 }} />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handlePasswordChange}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Password must meet the following requirements:
                                    <ul>
                                        <li style={{color: passwordConditions.length ? 'green' : 'red'}}>Minimum 8 characters</li>
                                        <li style={{color: passwordConditions.digit ? 'green' : 'red'}}>At least one digit</li>
                                        <li style={{color: passwordConditions.lowercase ? 'green' : 'red'}}>At least one lowercase letter</li>
                                        <li style={{color: passwordConditions.uppercase ? 'green' : 'red'}}>At least one uppercase letter</li>
                                        <li style={{color: passwordConditions.nonAlphanumeric ? 'green' : 'red'}}>At least one non-alphanumeric character</li>
                                    </ul>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            className='text-white bg-dark'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link className='text-white' href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
