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

const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

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

module.exports.selectMailServer = selectMailServer;

const updateMailServerStatus = (updateDetails) => {
    const {
        MAIL_SERVER_STATUS
    } = config;
    const updateIndex = MAIL_SERVER_STATUS.findIndex((server) => server.serverName === updateDetails.serverName);
    if (updateIndex < 0) {
        return false;
    }

    MAIL_SERVER_STATUS[updateIndex] = updateDetails;

    return true;
};

const sendMail = ({
    to,
    subject,
    content
}, retry = false) => {
    const data = {
        from: 'Gautam Eswaran <gautam@samples.mailgun.org>',
        to,
        subject,
        text: content
    };

    const selectedServer = selectMailServer();

    if (!selectedServer) {
        return false;
    }

    switch (selectedServer.serverName) {
        case 'mailGun':
            return mailGunMailer(data, !retry);
            break;
        case 'sendiBlue':
            return sendiBlueMailer(data, !retry);
            break;
        default:
            return false;
    }

};

module.exports.sendMail = sendMail;

const mailGunMailer = (data, retry) => {
    mg.messages().send(data, (error, body) => {
        if (error) {
            updateMailServerStatus({
                serverName: 'mailGun',
                enabled: false,
            });
            if(retry) {
                sendMail(data, true);
            }
        }
        // console.log(body);
    });
    return true;
};

const sendiBlueMailer = (data) => {
    const emailTo = new SibApiV3Sdk.SendTestEmail();
    const campaignId = 1;

    apiInstance.sendTestEmail(campaignId, emailTo).then(() => {
        // console.log('Mail sent successfully.');
    }, (error) => {
        console.error(error);
        updateMailServerStatus({
            serverName: 'sendiBlue',
            enabled: false,
        });
        if(retry) {
            sendMail(data, true);
        }
    });
    return true;
};