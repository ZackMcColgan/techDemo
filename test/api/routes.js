/**
 * API testing for the ip blocking routes
*/
const assert = require('chai').assert;
const request = require('supertest');

const app = require('../../app');

describe('API Tests', async () => {
    it('GET /{ip} should find the ip address in the block lists', async () => {
        const blockedIP = "123.139.56.148"

        return request(app)
            .get('/' + blockedIP)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(res => {
                assert(res.body[0].blocklist, 'firehol_level4.netset');
                assert(res.body[0].ip, blockedIP);
            });
    });

    it('GET /{ip} should not find the IP in the block lists', async () => {
        const notBlockedIP = "192.139.56.148"

        return request(app)
            .get('/' + notBlockedIP)
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                assert.isEmpty(res.body);
            });
    });

    it('GET /{ip} should return not authorized when bad text is entered', async () => {
        const badInput = "BadInput"

        return request(app)
            .get('/' + badInput)
            .set('Accept', 'application/json')
            .expect(400)
            .then(res => {
                assert(res.body, 'IP address is not valid');
            });
    });

    it('GET /{ip} should return not authorized when bad text is entered', async () => {
        const badInput = "BadInput"

        return request(app)
            .get('/' + badInput)
            .set('Accept', 'application/json')
            .expect(400)
            .then(res => {
                assert(res.body, 'IP address is not valid');
            });
    });

    it('GET /{ip}/{CIDR} should be able to find a CIDR IP', async () => {
        const cidrIP = "45.41.0.0/18"

        return request(app)
            .get('/' + cidrIP)
            .set('Accept', 'application/json')
            .expect(401)
            .then(res => {
                assert(res.body[0].blocklist, 'firehol_level1.netset');
                assert(res.body[0].ip, cidrIP);
            });
    });

    it('GET /{ip}/{CIDR} should handle an invalid CIDR IP', async () => {
        const cidrIP = "45.41.0.0/bad"

        return request(app)
            .get('/' + cidrIP)
            .set('Accept', 'application/json')
            .expect(400)
            .then(res => {
                assert(res.body, 'IP address is not valid');
            });
    }); 
});
