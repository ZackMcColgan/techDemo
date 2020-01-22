const express = require('express');
const router = express.Router();
const ipRegex = require('ip-regex');

const BlockListController = require('../controllers/BlockListController');
const blockListController = new BlockListController();

/**
 * @api {get} /{ip} Checks if an IP address in blocked or not
 * @apiSuccess (Success 200) 
 * @apiSuccessExample {json} Success response:
 *     HTTP 200 OK
 *     "IP not found in BlockLists"
 *
 * @blockedIPExample {json} Blocked IP response:
 *     HTTP 401 Unauthorized 
 *     [
 *        {
 *           "blocklist": "firehol_level2.netset",
 *            "ip": "119.92.186.19"
 *        }
 *      ]
*/
router.get('/:ip', async (req, res) => {
    if (!ipRegex({ exact: true }).test(req.params.ip)) return res.status(400).send("IP address is not valid"); // Check if valid IP
        
    let result = await blockListController.isIPBlocked(req.params.ip);

    if (!result) res.status(200).send("IP not found in BlockLists");
    else {
        res.status(401).send(result);
    }
});

/**
 * @api {get} /{ip}/{CIDR} Checks if an IP address CIDR range is blocked or not
 * @apiSuccess (Success 200)
 * @apiSuccessExample {json} Success response:
 *     HTTP 200 OK
 *     "IP not found in BlockLists"
 *
 * @blockedIPExample {json} Blocked IP response:
 *     HTTP 401 Unauthorized
 *     [
 *        {
 *           "blocklist": "firehol_level2.netset",
 *            "ip": "119.92.186.19"
 *        }
 *      ]
*/
router.get('/:ip/:CIDR', async (req, res) => {
    if (!ipRegex({ exact: true }).test(req.params.ip) || !isValidCIDR(req.params.CIDR)) return res.status(400).send("IP address is not valid"); // Check if valid IP

    const combinedIP = req.params.ip + "/" + req.params.CIDR;

    let result = await blockListController.isIPBlocked(combinedIP);

    if (!result) res.status(200).send("IP not found in BlockLists");
    else res.status(401).send(result);
});

/**
 * Checks if an inputted CIDR is valid
 * @param {any} CIDR The CIDR to check if valid
 * @return {bool} True: Valid CIDR, False: Invalid IP
 */
function isValidCIDR(CIDR) {
    if (isNaN(CIDR) || CIDR < 0 || CIDR >= 32) return false;

    return true;
}

module.exports = router;
