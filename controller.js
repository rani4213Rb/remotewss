const WebSocket = require('ws');

// ✅ LIVE WebSocket server URL (Render se)
const socket = new WebSocket('wss://remotewss.onrender.com');

socket.on('open', () => {
  console.log('✅ Connected to remote device');

  // 🛠️ Command bhejna target phone ko
  const command = {
    type: 'command',
    data: 'open_camera'  // 🔁 Change karo: 'vibrate', 'show_toast', 'play_sound'
  };

  socket.send(JSON.stringify(command));
  console.log('📤 Command sent:', command);
});

socket.on('message', (message) => {
  console.log('📩 Received:', message.toString());
});

socket.on('close', () => {
  console.log('❌ Disconnected from server');
});

socket.on('error', (err) => {
  console.error('⚠️ Error:', err.message);
});
