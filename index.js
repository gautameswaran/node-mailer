const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mailServer = require('./app/mailserver');

// App setup
const app = express();
const { port } = process.env.PORT || config.SERVER_DETAILS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.send('Node mail server'));

app.post('/sendmail',  (req, res) => {
    // Get params
    // const { to, subject, content } = req.body || {};
    mailServer.sendMail(req.body);
    // Call mail server to send mail
    // redirect to main page
    res.redirect('/index.html');
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
