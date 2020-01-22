const findInFiles = require('find-in-files');
const config = require('config');
const blockListSaveLocation = config.get('blockListSaveLocation');

/**
 * Handles Blocklists
*/
class BlockListController
{
    /**
     * Searches through all files for the given IP address
     * @param {string} ip The IP that will be searched for in the files
     * @return The results of the search, False: If the IP is not found
     */
    async isIPBlocked(ip) {
        let formattedResults = [];
       
        let results = await findInFiles.find(ip, blockListSaveLocation);

        if (!Object.keys(results).length) return false;
      
        for (let result in results) {
            let res = results[result];

            formattedResults.push(
                {
                    'blocklist': result.replace("data\\blockLists\\", ''),
                    'ip': res.matches[0]
                });
        }

        return formattedResults;
    }
}

module.exports = BlockListController;

