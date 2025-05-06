# UTS Pemograman Web 2
## PROFIL
| Variable           |             Isi            |
| -------------------|----------------------------|
| *Nama*           |         Muhammad Arif Mulyanto      |
| *NIM*            |          312310359        |
| *Kelas*          |          TI.23.A.5         |
| *Mata Kuliah*    |     Pemograman Web 2  |
| *Dosen Pengampu* | Agung Nugroho, S.Kom., M.Kom.|

# Pendahuluam
Di era transformasi digital saat ini, kebutuhan akan aplikasi yang mampu bekerja secara real-time semakin tinggi. Mulai dari layanan chat, notifikasi instan, hingga sistem voting online, semuanya mengandalkan teknologi yang mampu mengirim dan menerima data tanpa jeda waktu yang terasa. Salah satu teknologi yang dirancang khusus untuk kebutuhan ini adalah WebSocket.

WebSocket memungkinkan komunikasi dua arah yang berlangsung terus-menerus antara klien dan server. Berbeda dengan protokol HTTP tradisional yang bersifat request-response dan stateless, WebSocket memberikan koneksi yang persisten sehingga data dapat dikirim kapan saja, baik dari klien maupun server, tanpa harus membangun koneksi baru setiap kali terjadi pertukaran data.

Pada artikel ini, kita akan membahas konsep dasar WebSocket beserta implementasinya dalam membangun aplikasi Live Voting Real-Time. Aplikasi ini memungkinkan pengguna untuk memberikan suara dan melihat hasil voting yang otomatis terupdate secara langsung tanpa perlu me-refresh halaman.

Semua logika voting dan visualisasi grafik menggunakan Chart.js diintegrasikan langsung dalam satu file HTML (client.html) untuk kesederhanaan. Dengan tambahan desain modern berbasis HTML & CSS, aplikasi ini dapat dijadikan contoh nyata untuk membangun sistem real-time yang menarik dan interaktif tanpa struktur file yang kompleks.

# Pembahasan Utama
## Apa itu WebSocket? 
WebSocket adalah protokol komunikasi yang memungkinkan koneksi dua arah secara terus-menerus antara klien dan server. Berbeda dengan protokol HTTP tradisional yang bersifat request-response, WebSocket membuka koneksi yang tetap aktif (persistent). Dengan koneksi ini, server dapat langsung mendorong (push) data baru ke klien tanpa harus menunggu permintaan (request) dari klien terlebih dahulu. Inilah yang membuat WebSocket sangat cocok untuk aplikasi real-time seperti chat, notifikasi instan, dan sistem voting seperti yang kita implementasikan di sini.

## Perbedaan WebSocket Dan HTTP
WebSocket dan HTTP adalah dua protokol berbeda dalam cara mereka mengelola koneksi antara klien dan server, antara lain :

![tabel](https://github.com/user-attachments/assets/aff094cf-7a9b-4c1d-82d1-f3077339b1b6)

Eksperimen: Membangun Aplikasi Live Voting
Dalam eksperimen ini, kita membangun aplikasi sederhana yang memungkinkan pengguna melakukan voting secara real-time. Saat satu pengguna melakukan vote, seluruh pengguna lain yang membuka aplikasi akan langsung melihat hasil voting yang terupdate secara otomatis tanpa perlu me-refresh halaman.

## Struktur Aplikasi
- Server: Menggunakan Node.js dan library ws untuk membuat WebSocket server.

- Client: Menggunakan file HTML modern yang sudah menanamkan seluruh kode JavaScript (termasuk Chart.js) langsung di dalamnya.

## 1. Kode Server (server.js)
Server ini menggunakan Node.js dan library ws untuk mengelola koneksi WebSocket. Server menyimpan jumlah voting dalam sebuah objek, lalu menyebarkan (broadcast) hasil terbaru ke semua klien setiap kali ada perubahan.

``` js
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
```

## Penjelasan Kode Client:

- Chart.js di-load langsung dari CDN di baris <script src=”https://cdn.jsdelivr.net/npm/chart.js"></script>.
- Script voting dan update grafik ditulis langsung di dalam <script> di file ini, sehingga praktis untuk eksperimen lokal.
- Fungsi vote(pilihan) akan mengirimkan pesan ke server setiap kali tombol diklik.
- Setiap kali server mengirim data terbaru, grafik akan langsung ter-update otomatis secara real-time.

# Hasil Eksperimen

![ss](https://github.com/user-attachments/assets/998eb8d4-171c-4463-8e7f-2099b20d6952)

# Setelah aplikasi dijalankan:

- Ketika seorang pengguna melakukan vote (contoh: klik “Vote A”), maka seluruh klien lain yang membuka aplikasi akan langsung melihat update jumlah vote tanpa perlu menekan refresh.
- Grafik yang menggunakan Chart.js akan langsung bergerak naik mengikuti jumlah vote terbaru.
- Proses ini berlangsung real-time berkat koneksi WebSocket yang selalu aktif antara server dan semua klien.

# Analisis

## Implementasi ini membuktikan bahwa :

- WebSocket sangat efektif untuk aplikasi real-time seperti live voting.
- Dengan menanamkan Chart.js dan script voting langsung di file client.html, kita dapat membuat aplikasi yang sederhana namun tetap powerful untuk skenario real-time.
- Pendekatan ini cocok untuk eksperimen, presentasi, atau polling sederhana pada acara seperti seminar, webinar, atau kelas daring.

