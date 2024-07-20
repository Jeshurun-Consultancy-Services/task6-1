const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'durgasushma.21.cse@anits.edu.in',
    pass: 'anits123'   
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: 'durgasushma.21.cse@anits.edu.in', 
    to,                         
    subject,                    
    text: message,            
    html: `<p>${message}</p>`    
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error details:', error);
      return res.status(500).send('Error sending email');
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
