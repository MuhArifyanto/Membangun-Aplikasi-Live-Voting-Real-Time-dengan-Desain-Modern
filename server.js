const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let votes = { A: 0, B: 0, C: 0 };

// Menyajikan file HTML saat akses ke root (/)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});

// Menyajikan endpoint untuk mendapatkan data vote
app.get('/votes', (req, res) => {
  res.json(votes);
});

// Endpoint untuk menerima vote
app.post('/vote', express.json(), (req, res) => {
  const vote = req.body.vote;
  if (votes[vote] !== undefined) {
    votes[vote]++;
    res.json({ success: true, votes: votes });
  } else {
    res.json({ success: false });
  }
});

// WebSocket untuk komunikasi real-time
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(votes));  // Kirim data awal ke client saat terhubung

  ws.on('message', function incoming(message) {
    const vote = message.toString();
    if (votes[vote] !== undefined) {
      votes[vote]++;
      // Broadcast update ke semua client
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(votes));
        }
      });
    }
  });
});

// Mulai server di port 8080
server.listen(8080, () => {
  console.log('Server berjalan di http://localhost:8080');
});
