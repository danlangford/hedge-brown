var hedge = require('..');

// not "usage" per se, but getting a few fake apps
// up for us to proxy to
var fakeServer = require('./fakeServer');

fakeServer.create('hot dog', 3101);
fakeServer.create('cool cat', 3102);

var config = {
    host:'localhost',
    https:{
        key:'certs/cert.pem',
        cert:'certs/cert.pem',
        port:8443
    },
    http:{
        port:8080
    },
    router:{
        '/a1':'127.0.0.1:3101',
        '/a2':'127.0.0.1:3102',
        '/a3':'127.0.0.1:3103'
    }
};

hedge(config);



