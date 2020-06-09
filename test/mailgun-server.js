// TESTING - MailGun mail server
const mailgun = require("mailgun-js");
const config = require('../config');
const { mailGun } = config.API_KEYS;
const DOMAIN = mailGun.domain;
const api_key = mailGun.api_key;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
const data = {
	from: 'Gautam Mailgun <me@samples.mailgun.org>',
	to: 'gautameswaran@gmail.com, contact@gautam.co',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

