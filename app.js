const http = require('http')
const net = require('net');
const fs = require('fs');
const serverPort = 80;

var resolvConf = fs.readFileSync("/etc/resolv.conf", "utf8");
console.log("resolv.conf");
console.log(resolvConf);

const test_host = "google.com";
const test_port = 80;

function testDns(host, port, cb) {
    const client = net.createConnection({ host: host, port: port }, () => {
        client.end();
        cb(null, host);
    });
    client.on('error', (err) => {
        cb(err);
    });
};

const server = http.createServer((request, response) => {
    testDns(test_host, test_port, function (err, host) {
        if (err) {
            response.end('Azure App Service - Web App for Containers\n' +
                '[DNS TEST] connection error: ' + JSON.stringify(err) + "\n\n" +
                'etc/resolv.conf:\n' +
                resolvConf);
        }
        response.end('Azure App Service - Web App for Containers\n' +
            '[DNS TEST] connected to server: ' + host + '\n\n' +
            '/etc/resolv.conf:\n' +
            resolvConf);
    });
});

server.listen(serverPort, (err) => {
    if (err) {
        return console.log('could not start server', err)
    }
    console.log(`server is listening on ${serverPort}`)
});

function stop() {
    console.log("Stopping...");
    server.close();
}

process.once('SIGTERM', stop);
process.once('SIGINT', stop);
