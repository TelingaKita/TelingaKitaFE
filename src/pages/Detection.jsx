import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const socket = io("http://52.65.78.89:5000"); // Ganti sesuai servermu

const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [0, 17],
];

const Detection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const handsRef = useRef(null);
  const streamRef = useRef(null);

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
    // Initialize MediaPipe Hands
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
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
          const handedness = results.multiHandedness[i].label; // 'Left' atau 'Right'

          const displayHandedness =
            facingMode === "user"
              ? handedness === "Right"
                ? "Left"
                : "Right"
              : handedness;

          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          drawLandmarks(ctx, landmarks, {
            color: "#FF0000",
            lineWidth: 2,
            radius: 4,
          });
        }
      }
    });

    handsRef.current = hands;
    startCamera(facingMode);

    return () => {
      if (handsRef.current) {
        handsRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || !handsRef.current) return;

      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Process with MediaPipe
      handsRef.current.send({ image: canvas });

      // Send to Flask for prediction
      const frame = canvas.toDataURL("image/jpeg");
      socket.emit("process_frame", frame);
    }, 1000); // Ambil frame tiap 1 detik

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("prediction", (data) => {
      setPrediction(data.label);
      setConfidence(data.confidence);

      // TTS otomatis
      if (data.label) {
        const utter = new SpeechSynthesisUtterance(`Huruf ${data.label}`);
        utter.lang = "id-ID";
        window.speechSynthesis.speak(utter);
      }
    });

    return () => socket.off("prediction");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-4">
        Deteksi Huruf Bahasa Isyarat BISINDO dfadsfa
      </h1>

      <button
        onClick={() =>
          setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
        }
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        Flip Camera
      </button>

      <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg w-full max-w-[1000px]">
        <video ref={videoRef} className="hidden" playsInline />
        <canvas ref={canvasRef} className="w-full h-auto" />
      </div>

      {prediction && (
        <div className="mt-6 text-center">
          <h2 className="text-green-400 text-4xl font-bold">
            Huruf Terdeteksi: {prediction}
          </h2>
          <p className="text-sm mt-2">Confidence: {confidence?.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
};

export default Detection;
