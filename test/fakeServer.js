var fakeServer = {
    create: function(words, port){
        process.nextTick(function(){
            require('http').createServer(function (req, res) {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end('Hello World\n'+words+'\n'+
                    JSON.stringify(req.headers, true, 2));
            }).listen(port, '127.0.0.1');
            //listening on ip 127.0.0.1 = local traffic only
        });
    }
};

exports = module.exports = fakeServer;