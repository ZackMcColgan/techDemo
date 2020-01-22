const request = require('request-promise-native');
const fs = require('fs-extra');
const config = require('config');
const blockListSaveLocation = config.get('blockListSaveLocation');

/**
 * Handles file maniplualtion and fetching the specified block lists
*/
class FileController {
    /**
     * Retrieves all filenames for a give file directory
     * @param {string} directory The file path where the filenames will be retrieved from 
     */
    async getFileNames(directory) {
        fs.ensureDir(directory);

        return await fs.readdir(directory);
    }

    /**
     * Fetches IP blocklists from external website then stores the files
     * @param {array} blockLists An array of what lists should be fetched. Example: ["List1", "List2", "List3"]
     * @return {bool} true: Data fetching is successful, false:  Data fetching is unsuccessful
     */
    async fetchBlockLists(blockLists) {
        const blockListWebsite = 'https://iplists.firehol.org/files/';

        try {
            fs.ensureDir(blockListSaveLocation);

            if (!blockLists) return false;

            blockLists.map(async (blockList) => {
                await request(blockListWebsite + blockList + '.netset')
                    .pipe(fs.createWriteStream(blockListSaveLocation + '/' + blockList + '.netset'));
            });

            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = FileController;
 