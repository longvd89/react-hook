/**
 * Created by vulong on 30/07/2019.
 */

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(numCPUs);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
    masterProcess()
} else {
    childProcess()
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}


function childProcess() {
    console.log(`Worker ${process.pid} started`);

    process.on('message', function(message) {
        console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
    });

    console.log(`Worker ${process.pid} sends message to master...`);
    process.send({ msg: `Message from worker ${process.pid}` });

    console.log(`Worker ${process.pid} finished`);
}




function masterProcess() {
    console.log(`Master ${process.pid} is running`);
    var workers = [];
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);

        const worker = cluster.fork();
        workers.push(worker);

        // Listen for messages from worker
        worker.on('message', function(message) {
            console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
        });
    }

    // Send message to the workers
    workers.forEach(function(worker) {
        console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
        worker.send({ msg: `Message from master ${process.pid}` });
    }, this);
}
