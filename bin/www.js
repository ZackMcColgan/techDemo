#!/usr/bin/env node
const FileController = require('../controllers/FileController');
const fileController = new FileController();

/**
 * Module dependencies.
 */
const config = require('config');
const app = require('../app');
const debug = require('debug')('repo:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.get('server.port') || '3000');
const ip = config.get('server.ip') || '127.0.0.1';
const refreshRate = config.get('refreshRate');
const blockLists = config.get('blockLists');
let refreshIntervalId;

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, ip);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

process.on('SIGINT', () => {
    server.close();
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 * On Startup goes out and retrieves the specified block lists from the config file
 */
async function onListening() {
    console.log('Listening on ' + ip + ':' + port);

    await updateBlockLists();

    refreshIntervalId = setInterval(updateBlockLists, refreshRate);
}


function onClose() {
    console.log("Stopping the server");
    clearInterval(refreshIntervalId);
}

/**
 * Handles updating the blocklist 
*/
async function updateBlockLists() {
    console.log("Updating the BlockLists");

    if (!config.blockLists || !await fileController.fetchBlockLists(blockLists)) {
        console.log("Issue with updating blocklists");
        return;
    }
        
    console.log("Successfully updated the block lists");
}
