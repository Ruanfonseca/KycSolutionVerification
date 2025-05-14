
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import CameraViewfinder from "@/components/kyc-components/CameraViewfinder";
import FacialLivenessInstructions from "@/components/kyc-components/FacialLivenessInstructions";
import RekognitionInstructions from "@/components/kyc-components/RekognitionInstructions";
import { useCameraStream } from "@/hooks/useCameraStream";

interface CameraProps {
  onCapture: (imageData: string) => void;
  faceLiveness?: boolean;
  rekognition?: boolean;
}

const Camera: React.FC<CameraProps> = ({ onCapture, faceLiveness = false, rekognition = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  const { 
    isActive, 
    facingMode, 
    switchCamera 
  } = useCameraStream(videoRef);
  
  // Capture the image from the video
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
      }
    }
  };
  
  // Start countdown for photo capture
  const startCountdown = () => {
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount !== null && prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(timer);
          captureImage();
          return null;
        }
      });
    }, 1000);
  };
  
  return (
    <div className="relative">
      <Card className="overflow-hidden mb-4 relative">
        {countdown !== null && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
            <span className="text-6xl text-white font-bold">{countdown}</span>
          </div>
        )}
        
        <CameraViewfinder rekognition={rekognition} />
        
        <video 
          ref={videoRef}
          className="w-full h-auto"
          autoPlay
          playsInline
          muted
        />
      </Card>
      
      {/* Instructions based on verification mode */}
      {faceLiveness && <FacialLivenessInstructions onCapture={onCapture} isActive={isActive} />}
      {rekognition && <RekognitionInstructions onCapture={onCapture} isActive={isActive} />}
      
      {/* Camera controls */}
      <div className="flex flex-col space-y-3">
        <Button 
          onClick={faceLiveness || rekognition ? undefined : startCountdown}
          disabled={!isActive || faceLiveness || rekognition}
          variant="default"
        >
          Capturar foto
        </Button>
        
        <Button 
          onClick={switchCamera} 
          variant="outline"
          disabled={!isActive}
        >
          Alternar câmera
        </Button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Camera;
