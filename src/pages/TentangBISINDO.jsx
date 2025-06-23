import React from "react";
import bersamaImg from "../Bersama.png"; // Ubah path sesuai lokasi

const TentangBISINDO = () => {
  return (
    <section className="p-6 text-black max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📘 Tentang BISINDO</h2>

      <p className="mb-4 leading-relaxed">
        <strong>Bahasa Isyarat Indonesia (BISINDO)</strong> adalah bahasa isyarat yang digunakan oleh komunitas Tuli di berbagai daerah di Indonesia. BISINDO merupakan bentuk komunikasi visual yang mengandalkan gerakan tangan, ekspresi wajah, dan posisi tubuh untuk menyampaikan makna.
      </p>

      <h3 className="text-2xl font-semibold mb-3">🕰️ Sejarah Singkat BISINDO</h3>

      <p className="mb-4 leading-relaxed">
        Bahasa isyarat telah digunakan sejak lama, dan BISINDO dikenal luas sejak awal tahun 2000-an. Komunitas Tuli memperjuangkan pengakuan BISINDO sebagai bahasa yang mencerminkan budaya dan identitas mereka.
      </p>

      <p className="mb-4 leading-relaxed">
        Sebelum BISINDO, sistem seperti SIBI (Sistem Isyarat Bahasa Indonesia) digunakan dalam pendidikan, namun tidak berkembang secara alami dalam komunitas. Kini, BISINDO menjadi simbol hak, budaya, dan komunikasi komunitas Tuli.
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

      <p className="text-lg font-medium">
        🙏 Terima kasih kepada IBIC atas kontribusinya dalam mengembangkan BISINDO di Indonesia!
      </p>
    </section>
  );
};

export default TentangBISINDO;
