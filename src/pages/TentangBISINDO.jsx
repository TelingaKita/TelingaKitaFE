import React from "react";
import bersamaImg from "../Bersama.png"; // Ubah path sesuai lokasi gambar

const TentangBISINDO = () => {
  return (
    <section className="p-6 text-black max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📘 Tentang BISINDO</h2>

      <p className="mb-4 leading-relaxed text-justify">
        <strong>Bahasa Isyarat Indonesia (BISINDO)</strong> adalah bahasa isyarat alami yang digunakan oleh komunitas Tuli di berbagai daerah di Indonesia. BISINDO tidak hanya menjadi alat komunikasi, tetapi juga bagian dari budaya dan identitas komunitas Tuli yang kaya dan beragam. Bahasa ini disampaikan melalui kombinasi ekspresi wajah, posisi tubuh, serta gerakan tangan yang memiliki struktur linguistik tersendiri.
      </p>

      <h3 className="text-2xl font-semibold mb-3">🕰️ Sejarah Singkat BISINDO</h3>

      <p className="mb-4 leading-relaxed text-justify">
        Penggunaan bahasa isyarat telah ada sejak lama di komunitas Tuli Indonesia. Namun, BISINDO mulai dikenal luas sebagai bahasa komunitas sekitar awal tahun 2000-an melalui berbagai organisasi, komunitas, dan advokasi yang memperjuangkan hak Tuli atas komunikasi yang setara. Salah satu tokoh penting dalam penyebaran BISINDO adalah Ce Lucia, pendiri IBIC (Indonesia Bahasa Isyarat Center), yang telah aktif mengajarkan dan mempromosikan BISINDO di berbagai daerah.
      </p>

      <p className="mb-4 leading-relaxed text-justify">
        Sebelum adanya BISINDO, pemerintah memperkenalkan <strong>SIBI (Sistem Isyarat Bahasa Indonesia)</strong> sebagai sistem isyarat berbasis bahasa lisan Indonesia. Namun, SIBI dinilai tidak berkembang secara alami dan sulit diterima oleh komunitas Tuli karena tidak mencerminkan struktur alami komunikasi visual mereka. Oleh karena itu, BISINDO lebih diterima luas karena berasal dari dan untuk komunitas itu sendiri.
      </p>

      <figure className="mb-6 text-center">
        <img
          src={bersamaImg}
          alt="Sesi belajar BISINDO bersama Ce Lucia, CEO & Founder IBIC"
          className="rounded-lg w-full max-w-xl mx-auto shadow-md"
        />
        <figcaption className="text-sm mt-2 text-gray-700">
          📸 Sesi belajar BISINDO bersama Ce Lucia – CEO & Founder IBIC
        </figcaption>
      </figure>

      <h3 className="text-2xl font-semibold mb-3">👥 Fungsi dan Peran BISINDO</h3>
      <p className="mb-4 leading-relaxed text-justify">
        BISINDO bukan hanya alat komunikasi, tetapi juga alat penyampaian emosi, ekspresi diri, dan pendidikan. Bahasa ini digunakan dalam kehidupan sehari-hari, baik dalam lingkungan rumah tangga, komunitas, hingga dunia kerja. Keberadaan BISINDO membantu Tuli mengakses pendidikan, pelayanan publik, dan informasi secara lebih inklusif.
      </p>

      <h3 className="text-2xl font-semibold mb-3">⚖️ Hak Komunikasi & Inklusi</h3>
      <p className="mb-4 leading-relaxed text-justify">
        Komunitas Tuli di Indonesia memiliki hak untuk berkomunikasi dalam bahasa mereka sendiri. Pengakuan dan penggunaan BISINDO di ranah publik merupakan bagian dari hak asasi manusia. Pengembangan teknologi seperti aplikasi ini diharapkan dapat menjadi jembatan bagi masyarakat umum untuk lebih mengenal dan menghargai bahasa dan budaya Tuli.
      </p>

      <h3 className="text-2xl font-semibold mb-3">🌏 Harapan ke Depan</h3>
      <p className="mb-6 leading-relaxed text-justify">
        Dengan semakin dikenalnya BISINDO dan dukungan teknologi seperti penerjemah otomatis, diharapkan masyarakat luas lebih sadar akan keberagaman cara berkomunikasi. Harapan kami, aplikasi ini dapat membantu memperkenalkan BISINDO kepada lebih banyak orang dan mendukung inklusi sosial yang setara bagi semua.
      </p>

      <p className="text-lg font-medium text-center mb-2">
        🙏 Terima kasih kepada IBIC dan semua komunitas Tuli yang telah menjadi inspirasi dalam pengembangan aplikasi ini.
      </p>

      <footer className="mt-8 text-center text-xs text-gray-400">
        <p>© 2025 TelingaKita — Penerjemah BISINDO berbasis AI</p>
      </footer>
    </section>
  );
};

export default TentangBISINDO;
