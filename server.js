const http = require('http');
const WebSocket = require('ws');

// ✅ Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Remote WebSocket Server is running ✅');
});

// ✅ Attach WebSocket server to HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('✅ New device connected');

  ws.on('message', (message) => {
    console.log('📩 Command received from controller:', message.toString());

    // Echo back (for test only)
    ws.send('Command received: ' + message.toString());
  });

  ws.on('close', () => {
    console.log('❌ Device disconnected');
  });
});

// ✅ Listen on Render dynamic port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
