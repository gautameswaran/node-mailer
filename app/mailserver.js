const mailgun = require("mailgun-js");
const config = require('../config');
const { mailGun } = config.API_KEYS;
const DOMAIN = mailGun.domain;
const api_key = mailGun.api_key;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

const sendMail = ({to, subject, content}) => {
    const data = {
        from: 'Gautam Eswaran <gautam@samples.mailgun.org>',
        to,
        subject,
        text: content
    };

    console.log('data', data);

    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
};

module.exports.sendMail = sendMail;
