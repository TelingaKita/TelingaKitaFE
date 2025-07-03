import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const socket = io("http://127.0.0.1:5000");

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];

function segmentHandsToCanvasBlack(landmarksArray, outputSize = 224, padding = 20) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = outputSize;
  canvas.height = outputSize;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, outputSize, outputSize);

  let allX = [], allY = [];
  for (const landmarks of landmarksArray) {
    for (const lm of landmarks) {
      allX.push(lm.x);
      allY.push(lm.y);
    }
  }

  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const yMin = Math.min(...allY);
  const yMax = Math.max(...allY);

  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  const boxSize = Math.max(xMax - xMin, yMax - yMin) + padding / outputSize;
  const scale = outputSize / boxSize;
  const offsetX = outputSize / 2;
  const offsetY = outputSize / 2;

  for (const landmarks of landmarksArray) {
    for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];
      const x1 = (start.x - centerX) * scale + offsetX;
      const y1 = (start.y - centerY) * scale + offsetY;
      const x2 = (end.x - centerX) * scale + offsetX;
      const y2 = (end.y - centerY) * scale + offsetY;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    for (const lm of landmarks) {
      const x = (lm.x - centerX) * scale + offsetX;
      const y = (lm.y - centerY) * scale + offsetY;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "lime";
      ctx.fill();
    }
  }

  return canvas;
}

const Detection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const streamRef = useRef(null);
  const [displayedPrediction, setDisplayedPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [framePreview, setFramePreview] = useState(null);
  const lastSpokenRef = useRef(null);
  const FRAME_INTERVAL = 3000;
  let lastSentTime = 0;

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
    setCameraActive(false);
    setDisplayedPrediction(null);
    setConfidence(null);
  };

  const toggleCamera = () => {
    cameraActive ? stopCamera() : (startCamera(facingMode), setCameraActive(true));
  };

  const speak = (text) => {
    if (window.speechSynthesis && text !== lastSpokenRef.current) {
      const utter = new SpeechSynthesisUtterance("Huruf " + text);
      utter.lang = "id-ID";
      window.speechSynthesis.speak(utter);
      lastSpokenRef.current = text;
    }
  };

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas || !results.image) return;

      const ctx = canvas.getContext("2d");
      canvas.width = results.image.width;
      canvas.height = results.image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0);

      if (results.multiHandLandmarks?.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 2 });
          drawLandmarks(ctx, landmarks, { color: "#FF0000", radius: 3 });
        }

        const now = Date.now();
        if (now - lastSentTime >= FRAME_INTERVAL) {
          const blackCanvas = segmentHandsToCanvasBlack(results.multiHandLandmarks);
          const frame = blackCanvas.toDataURL("image/jpeg");
          setFramePreview(frame);
          socket.emit("process_frame", frame);
          lastSentTime = now;
        }
      }
    });

    handsRef.current = hands;
    return () => {
      hands.close();
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!cameraActive) return;
    const interval = setInterval(() => {
      const video = videoRef.current;
      const hands = handsRef.current;
      if (video && hands && video.readyState >= 2) {
        hands.send({ image: video });
      }
    }, 200);
    return () => clearInterval(interval);
  }, [cameraActive]);

  useEffect(() => {
    socket.on("prediction", (data) => {
      if (data?.label && /^[A-Z]$/.test(data.label)) {
        const conf = parseFloat(data.confidence).toFixed(1);
        setConfidence(conf);

        // Tampilkan label apapun confidence-nya
        setDisplayedPrediction(data.label);

        if (conf >= 85) {
          speak(data.label);
        }
      } else {
        setDisplayedPrediction(null);
        setConfidence(null);
      }
    });

    return () => socket.off("prediction");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Deteksi Huruf BISINDO</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={toggleCamera} className="bg-green-600 text-white px-4 py-2 rounded">
          {cameraActive ? "Matikan Kamera" : "Aktifkan Kamera"}
        </button>
        <button
          onClick={() => {
            const next = facingMode === "user" ? "environment" : "user";
            stopCamera();
            setFacingMode(next);
            setTimeout(() => {
              startCamera(next);
              setCameraActive(true);
            }, 500);
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Flip Kamera
        </button>
      </div>

      {!cameraActive && (
        <div className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded shadow mb-4 max-w-md w-full">
          <strong className="block mb-2">
            {cameraError ? "🚫 Kamera tidak terdeteksi." : "ℹ️ Petunjuk Penggunaan Kamera"}
          </strong>
          <ul className="list-disc ml-5 space-y-1">
            <li>Pastikan Anda memberikan izin akses kamera</li>
            <li>Refresh halaman</li>
            <li>Coba browser lain (Chrome/Edge/Firefox)</li>
            <li>Gunakan tombol untuk memulai atau mengganti kamera</li>
          </ul>
        </div>
      )}

      <video ref={videoRef} className="hidden" playsInline />
      <canvas ref={canvasRef} className="w-full max-w-lg border" />

      {displayedPrediction && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-1">Hasil Deteksi Huruf:</p>
          <h2 className="text-3xl font-bold text-green-700">{displayedPrediction}</h2>
        </div>
      )}

      {confidence && confidence < 80 && (
        <div className="mt-2 text-center">
          <p className="text-red-600 font-semibold italic animate-pulse">
            ⚠️ Posisikan tangan Anda dengan tepat
          </p>
        </div>
      )}

    
    </div>
  );
};

export default Detection;
