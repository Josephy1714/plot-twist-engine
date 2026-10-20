const http = require('node:http');
const { handle, tick } = require('./game-engine.cjs');

const port = Number(process.env.PORT || 4173);
const rooms = new Map();
const server = http.createServer((req, res) => handle(req, res, rooms));

setInterval(() => tick(rooms), 500);
server.listen(port, '0.0.0.0', () => {
  console.log(`Plot Twist Engine listening on http://localhost:${port}`);
});
