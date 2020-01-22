const apiBenchmark = require('api-benchmark');
const config = require('config');
const fs = require('fs')

const ip = config.get('server.ip');
const port = config.get('server.port');
const benchmarkSaveLocation = config.get('benchmarkSaveLocation');

var service = {
    IPBlockingAPI: "http://" + ip + ":" + port + "/"
};


var routes = {
    ipLookup: {
        method: 'get',
        route: '/123.139.56.148',
        headers: {
            'Accept': 'application/json'
        }
    },
     ipLookupOneFile: {
        method: 'get',
        route: '/119.92.186.19',
        headers: {
            'Accept': 'application/json'
        }
    },
     IpNotInBlockList: {
        method: 'get',
        route: '/192.92.186.19',
        headers: {
            'Accept': 'application/json'
        }
    }
    
};

apiBenchmark.measure(service, routes, function (err, results) { 
    if (!results) console.log("Remember to have the API running in order to perform benchmarking");

    console.log(results);

    apiBenchmark.getHtml(results, function (error, html) {
        fs.writeFile(benchmarkSaveLocation + '/results.html', html, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved to: " + benchmarkSaveLocation);
        }); 
    });
});