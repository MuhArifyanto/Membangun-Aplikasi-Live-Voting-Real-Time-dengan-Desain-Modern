# Pendahuluam
Di era transformasi digital saat ini, kebutuhan akan aplikasi yang mampu bekerja secara real-time semakin tinggi. Mulai dari layanan chat, notifikasi instan, hingga sistem voting online, semuanya mengandalkan teknologi yang mampu mengirim dan menerima data tanpa jeda waktu yang terasa. Salah satu teknologi yang dirancang khusus untuk kebutuhan ini adalah WebSocket.

WebSocket memungkinkan komunikasi dua arah yang berlangsung terus-menerus antara klien dan server. Berbeda dengan protokol HTTP tradisional yang bersifat request-response dan stateless, WebSocket memberikan koneksi yang persisten sehingga data dapat dikirim kapan saja, baik dari klien maupun server, tanpa harus membangun koneksi baru setiap kali terjadi pertukaran data.

Pada artikel ini, kita akan membahas konsep dasar WebSocket beserta implementasinya dalam membangun aplikasi Live Voting Real-Time. Aplikasi ini memungkinkan pengguna untuk memberikan suara dan melihat hasil voting yang otomatis terupdate secara langsung tanpa perlu me-refresh halaman.

Semua logika voting dan visualisasi grafik menggunakan Chart.js diintegrasikan langsung dalam satu file HTML (client.html) untuk kesederhanaan. Dengan tambahan desain modern berbasis HTML & CSS, aplikasi ini dapat dijadikan contoh nyata untuk membangun sistem real-time yang menarik dan interaktif tanpa struktur file yang kompleks.

# Pembahasan Utama
*** Apa itu WebSocket? ***
WebSocket adalah protokol komunikasi yang memungkinkan koneksi dua arah secara terus-menerus antara klien dan server. Berbeda dengan protokol HTTP tradisional yang bersifat request-response, WebSocket membuka koneksi yang tetap aktif (persistent). Dengan koneksi ini, server dapat langsung mendorong (push) data baru ke klien tanpa harus menunggu permintaan (request) dari klien terlebih dahulu. Inilah yang membuat WebSocket sangat cocok untuk aplikasi real-time seperti chat, notifikasi instan, dan sistem voting seperti yang kita implementasikan di sini.

Perbedaan WebSocket Dan HTTP
WebSocket dan HTTP adalah dua protokol berbeda dalam cara mereka mengelola koneksi antara klien dan server, antara lain :
