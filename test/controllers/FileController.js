/**
 * Unit tests for the FileController
*/
const assert = require('chai').assert;
const config = require('config');

const blockLists = config.get('blockLists');
let FileController = require('../../controllers/FileController');
let fileController = new FileController();

// TODO: Setup mock files instead of using prod files for tests. Ip addresses will change and break tests in the future
describe('FileController Tests', async () => {
    it('fetchBlockLists should return true and populate the blockLists folder', async () => { 
        const result = await fileController.fetchBlockLists(blockLists);

        assert.isTrue(result);
        // TODO: Add assert for checking that the files are there and correct

        // TODO: Delete the files after running this test
    });

    it('fetchBlockLists should return false when no blocklist array is not provided', async () => {
        const result = await fileController.fetchBlockLists(null);

        assert.isFalse(result);
    });
});
