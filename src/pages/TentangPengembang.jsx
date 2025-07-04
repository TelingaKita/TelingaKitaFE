import React from "react";

const TentangPengembang = () => {
  return (
    <div className="px-6 py-4 max-w-4xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">
        👨‍💻 Tentang Pengembang
      </h2>

      <p className="mb-4 text-justify">
        Halo! Saya adalah seorang mahasiswa yang mengembangkan aplikasi ini sebagai bentuk kontribusi
        nyata dalam mendukung komunikasi yang inklusif bagi komunitas Tuli di Indonesia, khususnya pengguna
        BISINDO (Bahasa Isyarat Indonesia). Aplikasi ini merupakan bagian dari proyek akhir saya, yang
        bertujuan untuk menerapkan teknologi kecerdasan buatan dalam kehidupan sehari-hari.
      </p>

      <p className="mb-4 text-justify">
        Ide utama dari aplikasi ini adalah untuk menjembatani komunikasi antara pengguna bahasa isyarat
        dengan masyarakat umum melalui teknologi klasifikasi gerakan tangan secara real-time. Pengembangan
        dilakukan selama beberapa bulan dengan melibatkan proses pelabelan dataset, augmentasi citra,
        pelatihan model CNN, serta integrasi ke dalam antarmuka web dan mobile.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        🚀 Fitur Utama Aplikasi
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li>Pengenalan huruf BISINDO secara real-time menggunakan kamera</li>
        <li>Pengolahan gambar tangan ke dalam bentuk segmentasi hitam</li>
        <li>Klasifikasi menggunakan model CNN MobileNetV3-Small</li>
        <li>Output berupa teks prediksi dan suara otomatis</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">
        🔍 Teknologi yang Digunakan
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>MobileNetV3-Small</strong>: CNN ringan untuk klasifikasi gambar gesture</li>
        <li><strong>MediaPipe Hands</strong>: Untuk mendeteksi koordinat tangan secara real-time</li>
        <li><strong>TensorFlow + TFLite</strong>: Pelatihan dan deployment model ke Android/web</li>
        <li><strong>React & React Native</strong>: Antarmuka pengguna web dan mobile</li>
        <li><strong>Socket.IO</strong>: Komunikasi real-time antara frontend dan backend</li>
        <li><strong>Streamlit & Flask</strong>: Untuk prototipe awal dan server prediksi</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">
        🧠 Proses Pengembangan
      </h3>
      <p className="mb-4 text-justify">
        Dataset gesture tangan diperoleh dari berbagai sumber serta dibuat sendiri melalui kamera webcam. Model CNN dilatih menggunakan arsitektur MobileNetV3, kemudian dikonversi ke TFLite
        agar dapat digunakan di perangkat seluler. Sistem voting ditambahkan agar dapat menangani
        ketidakpastian dari prediksi model secara individu.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        📌 Catatan Penggunaan
      </h3>
      <p className="mb-4 text-justify">
        Aplikasi ini hanya mendeteksi huruf-huruf tunggal dari BISINDO. Untuk pengenalan kata dan kalimat,
        dibutuhkan pendekatan sequence modeling (seperti RNN atau Transformer) yang mungkin akan menjadi
        pengembangan selanjutnya. Aplikasi dapat dijalankan pada perangkat desktop maupun seluler, dan
        disarankan menggunakan pencahayaan yang cukup agar hasil deteksi lebih akurat.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        🙋‍♂️ Informasi Kontak
      </h3>
      <p className="mb-2">
        📧 <strong>Email:</strong>{" "}
        <a
          href="mailto:Padmavati.tanuwijaya@student.ukdc.ac.id"
          className="text-blue-600 hover:underline"
        >
          Padmavati.tanuwijaya@student.ukdc.ac.id
        </a>
      </p>
      <p className="mb-4">
        🏫 <strong>Institusi:</strong> Universitas Katolik Darma Cendika
      </p>

      <p className="italic text-gray-800">
        Terima kasih telah menggunakan aplikasi ini. Semoga dapat menjadi jembatan komunikasi
        antara komunitas Tuli dan masyarakat umum, serta mendorong terciptanya lingkungan yang
        lebih inklusif melalui teknologi.
      </p>

      <footer className="mt-8 text-center text-xs text-gray-400">
        <p>© 2025 TelingaKita — Penerjemah BISINDO berbasis AI</p>
      </footer>
    </div>
  );
};

export default TentangPengembang;
