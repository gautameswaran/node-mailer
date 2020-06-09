const expect = require('chai').expect;
const should = require('chai').should();
const config = require('../config');
const mocking = require('../test/mocking');
const mailserver = require('../app/mailserver');
const configBackup = {
    ...config
};

describe("1. Mail server selection testing", () => {
    it("a. test mail server able select enabled servers", () => {
        const selectedServers = mailserver.selectMailServer();
        selectedServers.should.be.a('object');
        selectedServers.should.have.property('serverName');
        selectedServers.should.have.property('enabled');
        config.MAIL_SERVER_STATUS = [];
    });

    it("b. mail server selection should be false", () => {
        const selectedServers = mailserver.selectMailServer();
        selectedServers.should.be.false;
    });
    after(() => {
        config.MAIL_SERVER_STATUS = [...configBackup.MAIL_SERVER_STATUS];
    });

});

describe("2. Send mail testing", () => {
    it("a. Able to send a mail", () => {
        const data = {
            to: 'test@test.com',
            subject: 'test',
            content: 'test'
        };
        const response = mailserver.sendMail(data);
        response.should.be.true;
    });
    it("b. Use fallback server for failed mail", () => {
        config.MAIL_SERVER_STATUS[0].enabled = true;
        const data = {
            to: 'test2@test.com',
            subject: 'test2',
            content: 'test2'
        };
        const response = mailserver.sendMail(data);
        response.should.be.true;
    });
    after(() => {
        config.MAIL_SERVER_STATUS = [...configBackup.MAIL_SERVER_STATUS];
    });
});