const mailgun = require("mailgun-js");
const SibApiV3Sdk = require('sib-api-v3-sdk');

const config = require('../config');
const {
    mailGun,
    sendiBlue
} = config.API_KEYS;


const defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = sendiBlue.api_key;

// Configure API key authorization: partner-key
const partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = sendiBlue.api_key;

const apiInstance = new SibApiV3Sdk.EmailCampaignsApi()

// MailGun init config
const DOMAIN = mailGun.domain;
const api_key = mailGun.api_key;
const mg = mailgun({
    apiKey: api_key,
    domain: DOMAIN
});

const selectMailServer = () => {
    const {
        MAIL_SERVER_STATUS
    } = config;
    const activeServers = MAIL_SERVER_STATUS.filter((server) => server.enabled);
    if (!activeServers.length) {
        return false;
    }
    return activeServers[0];
}

module.exports.sendMail = ({
    to,
    subject,
    content
}) => {
    const data = {
        from: 'Gautam Eswaran <gautam@samples.mailgun.org>',
        to,
        subject,
        text: content
    };

    console.log('data', data);
    const selectedServer = selectMailServer();

    if (!selectedServer) {
        return false;
    }

    switch(selectedServer.serverName) {
        case 'mailGun':
            mailGunMailer(data);
            break;
        case 'sendiBlue':
            sendiBlueMailer(data);
            break;
        default:
            console.log('No mail server available');
    }

};

const mailGunMailer = (data) => {
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
};

const sendiBlueMailer = (data) => {
    const emailTo = new SibApiV3Sdk.SendTestEmail();
    const campaignId = 1;

    apiInstance.sendTestEmail(campaignId, emailTo).then(function () {
        console.log('Mail sent successfully.');
    }, function (error) {
        console.error(error);
    });
};

