
import { useState, useEffect, RefObject } from "react";

export const useCameraStream = (videoRef: RefObject<HTMLVideoElement>) => {
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          
          setIsActive(true);
        }
      } catch (error) {
        console.error('Erro ao acessar câmera:', error);
      }
    };
    
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode, videoRef]);
  
  // Alterna câmera frontal/traseira
  const switchCamera = async () => {
    // Para a transmissão atual
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Alterna o modo de câmera
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
  };
  
  return {
    isActive,
    facingMode,
    switchCamera
  };
};
