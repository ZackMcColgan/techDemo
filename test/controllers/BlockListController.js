/**
 * Unit tests for the BlockList controller 
*/
const assert = require('chai').assert;

let BlockListController = require('../../controllers/BlockListController');
let blockListController = new BlockListController();


describe('BlockListController Tests', async () => {

    it('isIPBlocked Should find the ip in the files ', async () => {
        const blockedIP = "123.139.56.148";

        let result = await blockListController.isIPBlocked(blockedIP);

        assert.isArray(result);
        assert(result[0].blocklist, 'firehol_level4.netset');
        assert(result[0].ip, blockedIP);
        assert(result[0].blocklist, 'firehol_level2.netset');
        assert(result[0].ip, blockedIP);
    });

    // Functionality currently not working
    it.skip('isIPBlocked Should find an IP that is in a CIDR range', async () => {
        //CIDR: 5.134.128.0/19
        let result = await blockListController.isIPBlocked('5.134.159.255');

        assert.isArray(result);
    });

    it('isIPBlocked Should not find the IP ', async () => {
        const notBlockedIP = "192.139.56.148";

        let result = await blockListController.isIPBlocked(notBlockedIP);

        assert.isFalse(result);
    });
});
