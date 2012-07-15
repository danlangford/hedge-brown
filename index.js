var http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy'),
    fs = require('fs');

var hedge = function (c) {

    var msg=[];

    // step 1) forward all http requests to https
    var hostNport = c.host + ':' + c.http.port,
        hostNportS = c.host + ':' + c.https.port;


    var httpRedirect = http.createServer(function (req, res) {
        res.writeHead(302, {
            'Location':'https://' + hostNportS + req.url
        });
        res.end();
    }).listen(c.http.port);

    msg.push('listening on '+ hostNport);
    msg.push('traffic to http://'+ hostNport +' will be forwarded to https://'+ hostNportS);

    var options = {

        // step 2) read ssl certs
        https:{
            key:fs.readFileSync(c.https.key),
            cert:fs.readFileSync(c.https.cert)
        },

        // just a stub, we fill it out in step 3
        router:{}
    };

    // step 3) define proxy routes
    for (var k in c.router) {
        // if the route does not start with the hostname
        if (k.indexOf(c.host) != 0) {
            // then prepend the hostname to the route
            options.router[c.host + k] = c.router[k];
        }
    }

    for(var i in options.router) {
        msg.push('added route: '+i+' > '+options.router[i]);
    }

    var proxy = new httpProxy.createServer(options, function (req, res, proxy) {

        // could i do the auth here?

        proxy.proxyRequest(req, res
            //,{host:'',port:0,buffer:{}} // dont pass in deets, they are provided by routing table
        );

        // and show a 403 if they are not authed?

    }).listen(c.https.port);
    msg.push('listening on '+ hostNportS);

    console.log(msg);

    // or should i take more of a middleware approach?
    // create a https server, use the `.use()` function, etc.

    // https://github.com/nodejitsu/node-http-proxy/tree/master/examples

    /*
     https.createServer(httpsOpts, function (req, res) {
     proxy.proxyRequest(req, res)
     }).listen(1234);
     */

};

exports = module.exports = hedge;