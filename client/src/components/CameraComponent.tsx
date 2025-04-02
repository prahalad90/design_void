import { useRef, useState, useEffect, useCallback } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const CameraComponent = ({ backendUrl }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);

  const blinkDetectedRef = useRef(false);
  const frameCounterRef = useRef(0);
  const skipFrames = 15;


  // ✅ Function to send image to backend
  const sendImageToBackend = async (blob) => {
    if (!backendUrl) {
      console.error("Backend URL is not provided");
      return;
    }
    const formData = new FormData();
    const userid = localStorage.getItem('id')
    
    formData.append("image", blob, "blink_capture.jpg");
    formData.append("id", userid);
    try {
      const response = await fetch(`${backendUrl}`, {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      window.alert(result.message);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // ✅ Function to capture a frame from video
  const captureFrame = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) sendImageToBackend(blob);
    }, "image/jpeg");
  };

  // ✅ Function to detect blinks using face landmarks
  const checkBlink = useCallback((landmarks) => {
    const getEyeAspectRatio = (eyeTop, eyeBottom, eyeLeft, eyeRight) => {
      const verticalDist = Math.abs(eyeTop.y - eyeBottom.y);
      const horizontalDist = Math.abs(eyeLeft.x - eyeRight.x);
      return verticalDist / horizontalDist;
    };

    const leftEyeEAR = getEyeAspectRatio(landmarks[159], landmarks[145], landmarks[33], landmarks[133]);
    const rightEyeEAR = getEyeAspectRatio(landmarks[386], landmarks[374], landmarks[362], landmarks[263]);

    const avgEAR = (leftEyeEAR + rightEyeEAR) / 2;
    console.log("EAR:", avgEAR); // ✅ Debugging

    if (avgEAR < 0.2) {
      blinkDetectedRef.current = true;
      frameCounterRef.current = 0;
    }

    if (blinkDetectedRef.current) {
      frameCounterRef.current++;
      if (frameCounterRef.current >= skipFrames) {
        blinkDetectedRef.current = false; // Reset detection
        captureFrame(); // Capture frame after skipping frames
        stopCamera();
      }
    }
  }, []);

  // ✅ Initialize FaceMesh
  useEffect(() => {
    faceMeshRef.current = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMeshRef.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshRef.current.onResults((results) => {
      if (results.multiFaceLandmarks.length > 0) {
        checkBlink(results.multiFaceLandmarks[0]); 
      }
    });

    return () => {
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
        faceMeshRef.current = null;
      }
    };
  }, [checkBlink]);

  // ✅ Start Camera
  const startCamera = async () => {
    if (isCameraOn) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };

        cameraRef.current = new Camera(videoRef.current, {
          onFrame: async () => {
            await faceMeshRef.current.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });

        cameraRef.current.start();
      }

      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Please allow camera access.");
    }
  };

  // ✅ Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    setIsCameraOn(false);
  };

  return (
    <div>
      <button className="rounded-[5px] bg-blue-300 px-5 py-2" onClick={isCameraOn ? stopCamera : startCamera}>
        {isCameraOn ? "Turn Off Camera" : "Punch In"}
      </button>
      <div id="camera">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            display: isCameraOn ? "block" : "none",
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            background: "black",
          }}
        />
      </div>
    </div>
  );
};

export default CameraComponent;
