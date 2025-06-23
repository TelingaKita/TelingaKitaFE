import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

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
  const [lastSpoken, setLastSpoken] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [cameraError, setCameraError] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const handsRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const startCamera = (mode) => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480, facingMode: mode } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          streamRef.current = stream;
          setCameraError(false);
        }
      })
      .catch((err) => {
        console.error("Webcam error:", err);
        setCameraError(true);
      });
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCameraActive(false);
    setPrediction(null);
    setConfidence(null);
    window.speechSynthesis.cancel();
  };

  const toggleCamera = () => {
    cameraActive ? stopCamera() : (startCamera(facingMode), setCameraActive(true));
  };

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas || !results.image) return;

      const ctx = canvas.getContext("2d");
      canvas.width = results.image.width;
      canvas.height = results.image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks) {
        for (let landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00", lineWidth: 4,
          });
          drawLandmarks(ctx, landmarks, {
            color: "#FF0000", radius: 3,
          });
        }
      }
    });

    handsRef.current = hands;
    return () => {
      if (handsRef.current) handsRef.current.close();
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!cameraActive) return;

    intervalRef.current = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const hands = handsRef.current;

      if (
        !video || !canvas || !hands ||
        video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0
      ) return;

      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Process with MediaPipe
        hands.send({ image: canvas });

        // Send full frame to server
        const frame = canvas.toDataURL("image/jpeg");
        socket.emit("process_frame", frame);
      } catch (err) {
        console.error("⚠️ Processing error:", err);
      }
    }, 1000); // Ambil frame tiap 1 detik

    return () => clearInterval(intervalRef.current);
  }, [cameraActive]);

  useEffect(() => {
    socket.on("prediction", (data) => {
      setPrediction(data.label);
      setConfidence(data.confidence);

      if (data.label && data.label !== lastSpoken) {
        const utter = new SpeechSynthesisUtterance(`Huruf ${data.label}`);
        utter.lang = "id-ID";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        setLastSpoken(data.label);
      }
    });

    return () => socket.off("prediction");
  }, [lastSpoken]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white text-black p-5">
      {(!cameraActive || cameraError) && (
        <div
          className={`p-4 mb-6 rounded max-w-xl w-full text-sm border ${
            cameraError
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-yellow-50 text-yellow-800 border-yellow-300"
          }`}
        >
          <strong className="block mb-2">
            {cameraError
              ? "🚫 Kamera tidak terdeteksi."
              : "ℹ️ Petunjuk Penggunaan Kamera"}
          </strong>
          <ul className="list-disc ml-5 space-y-1">
            <li>Pastikan Anda memberikan izin akses kamera</li>
            <li>Refresh halaman</li>
            <li>Coba browser lain (Chrome/Edge/Firefox)</li>
            <li>Periksa koneksi internet</li>
            <li>Gunakan tombol untuk memulai atau mengganti kamera</li>
          </ul>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center">
        Deteksi Huruf Bahasa Isyarat <span className="text-yellow-600">BISINDO</span>
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={toggleCamera}
          className={`px-4 py-2 font-bold rounded text-white ${
            cameraActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {cameraActive ? "Matikan Kamera" : "Mulai Kamera"}
        </button>
        <button
          onClick={() => {
            setFacingMode((prev) =>
              prev === "user" ? "environment" : "user"
            );
            if (cameraActive) {
              stopCamera();
              setTimeout(() => {
                startCamera(facingMode === "user" ? "environment" : "user");
                setCameraActive(true);
              }, 500);
            }
          }}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded"
        >
          Flip Kamera
        </button>
      </div>

      <div className="relative border-4 border-gray-300 rounded-lg overflow-hidden shadow-md w-full max-w-[1000px] bg-white">
        <video ref={videoRef} className="hidden" playsInline />
        <canvas ref={canvasRef} className="w-full h-auto" />
      </div>

      {prediction && (
        <div className="mt-6 text-center">
          <h2 className="text-green-700 text-4xl font-bold">
            Huruf Terdeteksi: {prediction}
          </h2>
          <p className="text-sm mt-2 text-gray-600">
            Confidence: {confidence?.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Detection;
