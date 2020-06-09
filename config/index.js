module.exports = {
    SERVER_DETAILS: {
        port: 8080
    },
    MAIL_SERVER_STATUS: [{
            serverName: 'mailGun',
            enabled: false,
        },
        {
            serverName: 'sendiBlue',
            enabled: true,
        },
    ],
    API_KEYS: {
        mailGun: {
            enabled: false,
            domain: 'sandbox0f0f5eb9a6ec4bbf90faf88c37a527ec.mailgun.org',
            api_key: 'b310649e58063c1debff747360be1a0c-a2b91229-dd55a886'
        },
        sendiBlue: {
            enabled: true,
            api_key: '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'
        }
    }
};