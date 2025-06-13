const soap = require('soap');

const WSDL_URL = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL';

async function testSoap() {
    try {
        const client = await soap.createClientAsync(WSDL_URL);
        const result = await client.NumberToWordsAsync({ubiNum: 123});
        return result[0];
    } catch (error) {
        console.error('SOAP Error:', error);
        throw error;
    }
}

module.exports = testSoap;