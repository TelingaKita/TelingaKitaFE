import React from "react";

const TentangPengembang = () => {
  return (
    <div className="px-6 py-4 max-w-4xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">
        👨‍💻 Tentang Pengembang
      </h2>

      <p className="mb-4 text-justify">
        Halo! Saya adalah mahasiswa yang mengembangkan aplikasi ini sebagai kontribusi
        untuk komunitas Tuli pengguna BISINDO (Bahasa Isyarat Indonesia). Aplikasi ini
        dibuat sebagai proyek akhir untuk mendukung inklusi dan akses teknologi.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        🔍 Teknologi yang Digunakan
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>MobileNetV3-Small</strong>: CNN ringan untuk klasifikasi gambar gesture</li>
        <li><strong>MediaPipe</strong>: Deteksi koordinat tangan secara real-time</li>
        <li><strong>Voting Model</strong>: Gabungan 3 model prediksi dengan sistem voting</li>
        <li><strong>Augmentasi Citra</strong>: Untuk meningkatkan variasi dan akurasi pelatihan</li>
      </ul>

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
        Terima kasih telah menggunakan aplikasi ini. Semoga dapat menjadi jembatan komunikasi yang inklusif!
      </p>
    </div>
  );
};

export default TentangPengembang;
