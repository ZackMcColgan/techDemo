Engineering Exercise 
Anomaly Detection - IP Blocking 

Author: Zack McColgan

First iteration of a HTTP service that can determine whether a given IP address is allowed or blocked by this source: https://iplists.firehol.org/files/. 
If the IP is determined to be blocked, helpful information will be returned with the response, such as the source (the list that has the IP blocked) and other metadata.

API Documentation:
GET server:port/{ip}
Finds whether an IP address is allowed or blocked

Return:
If the IP is blocked: 
Sample Response:
[
    {
        "blocklist": "firehol_level2.netset",
        "ip": "119.92.186.19"
    }
]
Status Code: 200

If the IP is not blocked:
Status Code: 200
Sample Response: "IP not found in BlockLists"

Build Steps:
1. npm install


How to Test:
npm run test

How to run Benchmarking:
1. Ensure API is running
2. npm run bench

Results of last bench:
     20 runs sampled with concurrency: 1

    Started: 2019-12-09 04:31:14.409
    Ended: 2019-12-09 04:31:15.057 (0.648 seconds)
    30.91 ops/sec ± 2.81%
    0 errors
    Sample arithmetic mean: 0.032354
    Sample standard deviation: 0.001945
    Margin of error: 0.000910
    The standard error of the mean: 0.000435
    The sample variance: 0.000004

    75% Percentile: 0.032997
    95% Percentile: 0.039084
    99% Percentile: 0.039358
    99.9% Percentile: 0.039358


What the project is built with
- NodeJS
- Express
- ES6
- Tests:
	Mocha
	Supertest

Exclusive Copyright
