import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

function PasswordValidator({ password }) {
    const validatePassword = (password) => {
        const length = password.length >= 8;
        const digit = /\d/.test(password);
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);
        const nonAlphanumeric = /\W|_/.test(password);
        
        return {
            length,
            digit,
            lowercase,
            uppercase,
            nonAlphanumeric,
        };
    };

    const passwordConditions = validatePassword(password);

    return (
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
    );
}

export default PasswordValidator;