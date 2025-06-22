import React from "react";

const TentangBISINDO = () => {
  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">📘 Tentang BISINDO</h2>
      <p className="mb-4">
        <strong>Bahasa Isyarat Indonesia (BISINDO)</strong> adalah bahasa
        isyarat yang digunakan oleh komunitas Tuli di berbagai daerah di
        Indonesia. BISINDO merupakan bentuk komunikasi visual yang menggunakan
        gerakan tangan, ekspresi wajah, dan posisi tubuh untuk menyampaikan
        makna.
      </p>
      <h3 className="text-xl font-semibold mb-2">🕰️ Sejarah Singkat BISINDO</h3>
      <p className="mb-4">
        Bahasa isyarat telah digunakan sejak lama, dan BISINDO dikenal luas
        sejak awal 2000-an. Komunitas Tuli memperjuangkan pengakuan BISINDO
        sebagai bahasa yang mencerminkan budaya dan identitas mereka.
      </p>
      <p className="mb-4">
        Sebelum BISINDO, sistem seperti SIBI digunakan dalam pendidikan, namun
        tidak berkembang secara alami dalam komunitas. Kini, BISINDO menjadi
        simbol hak, budaya, dan komunikasi komunitas Tuli.
      </p>
      <div className="mb-4">
        <img
          src="/Bersama.PNG"
          alt="Sesi belajar bersama Ce Lucia"
          className="rounded-lg w-full max-w-xl mx-auto"
        />
        <p className="text-center text-sm mt-2">
          📸 Sesi belajar BISINDO bersama Ce Lucia – CEO & Founder IBIC
        </p>
      </div>
      <p>🙏 Terima kasih kepada IBIC atas kontribusinya!</p>
    </div>
  );
};

export default TentangBISINDO;
