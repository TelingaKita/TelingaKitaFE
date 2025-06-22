import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { FiRotateCw, FiCamera } from "react-icons/fi";

const socket = io("http://52.65.78.89:5000");

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];

const Detection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const startCamera = (mode) => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480, facingMode: mode } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => console.error("Webcam error: ", err));
  };

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas || !results.image) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandedness) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
          drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2, radius: 4 });
        }
      }
    });

    startCamera(facingMode);
    const handsRef = { current: hands };

    return () => {
      if (handsRef.current) handsRef.current.close();
    };
  }, [facingMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = canvas.toDataURL("image/jpeg");
      socket.emit("process_frame", frame);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("prediction", (data) => {
      setPrediction(data.label);
      setConfidence(data.confidence);
      if (data.label) {
        const utter = new SpeechSynthesisUtterance(`Huruf ${data.label}`);
        utter.lang = "id-ID";
        window.speechSynthesis.speak(utter);
      }
    });

    return () => socket.off("prediction");
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-950 text-white">
        <img src="/TelingaKita.PNG" alt="Logo" className="w-32 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-yellow-400 p-6 rounded-r-3xl shadow-xl">
        <img src="/TelingaKita.PNG" alt="Logo" className="w-32 mb-4 rounded-xl" />
        <nav className="space-y-4">
          <button className="w-full text-left font-semibold text-black hover:bg-yellow-300 p-2 rounded-lg">📷 Deteksi Huruf</button>
          <button className="w-full text-left text-black hover:bg-yellow-300 p-2 rounded-lg">📘 Tentang BISINDO</button>
          <button className="w-full text-left text-black hover:bg-yellow-300 p-2 rounded-lg">👨‍💻 Tentang Pengembang</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">🖐️ Deteksi Bahasa Isyarat BISINDO</h1>

        <button
          onClick={() => setFacingMode((prev) => (prev === "user" ? "environment" : "user"))}
          className="flex items-center gap-2 px-5 py-2 mb-6 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
        >
          <FiRotateCw /> Flip Kamera
        </button>

        <div className="relative border-4 border-gray-600 rounded-lg overflow-hidden w-full max-w-[720px] aspect-video">
          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {prediction && (
          <div className="mt-6 text-center">
            <h2 className="text-green-400 text-4xl font-bold">
              Huruf: {prediction}
            </h2>
            <p className="text-sm text-gray-300 mt-1">Confidence: {confidence?.toFixed(1)}%</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Detection;
