require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email Transporter (Configure with your credentials in .env)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Routes
app.post('/api/contact', async (req, res) => {
    const { name, email, projectType, budget, message } = req.body;

    console.log('Received message from:', name);

    // 1. Send email to yourself
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER || 'tejdeep0707@gmail.com',
        subject: `New Portfolio Lead: ${projectType} from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType}
Budget: ${budget}
Message: ${message}
        `
    };

    try {
        // If credentials are set, send the actual email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('--- Email Simulation (Credentials missing in .env) ---');
            console.log(mailOptions.text);
            console.log('----------------------------------------------------');
        }
        
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

// Serve the frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
    console.log('Email leads will be printed to terminal unless .env is configured.');
});
