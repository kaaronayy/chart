var SSE = require('sse'),
    http = require('http');

var val = 0;
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'mimetype': 'text/event-stream',
        'Access-Control-Allow-Origin': '*'
    });

    setInterval(function () {
        val++;
        msg = "id: msg1\ndata: test" + val + "\n\n";

        res.write(msg);
    }, 3000);


});

server.listen(3000, '127.0.0.1', function () {
    var sse = new SSE(server);
    sse.on('connection', function (client) {
        client.send('hi there');
    });
});