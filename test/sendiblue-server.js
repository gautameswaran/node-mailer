// TESTING - Sendiblue Mail server
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const config = require('../config');

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
const { sendiBlue } = config.API_KEYS;
apiKey.apiKey = sendiBlue.api_key;

// Configure API key authorization: partner-key
var partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = sendiBlue.api_key;

var api = new SibApiV3Sdk.AccountApi()
api.getAccount().then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});
