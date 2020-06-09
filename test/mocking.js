const mock = require('mock-require');
mock('http', {
    request: function () {
        console.log('http.request mocked');
    }
});

// MailGun mocking
mock('mailgun-js', {
    mailgun: () => {
        return {
            messages: () => {
                return this;
            },
            send: (data, callback) => {
                return callback(false, 'MailGun success');
            },
        };
    }
});

// sendiblue mocking
mock('sib-api-v3-sdk', {
    SibApiV3Sdk: () => {
        return {
            ApiClient: {
                instance: {},
                authentications: {
                    'api-key': 'api-key',
                    'partner-key': 'partner-key',
                }
            },
            EmailCampaignsApi: () => SendTestEmail = () => {
                return new Promise((resolve) => resolve('done'));
            },

        };
    }
});