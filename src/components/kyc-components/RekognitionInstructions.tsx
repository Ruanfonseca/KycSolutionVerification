
import React, { useState, useEffect } from "react";

interface RekognitionInstructionsProps {
  onCapture: (imageData: string) => void;
  isActive: boolean;
}

const RekognitionInstructions: React.FC<RekognitionInstructionsProps> = ({ 
  onCapture, 
  isActive 
}) => {
  const [rekognitionState, setRekognitionState] = useState<"idle" | "align" | "complete">("idle");
  const [instructions, setInstructions] = useState("Prepare para verificação");
  
  // Sequência de desafio para reconhecimento facial com Rekognition
  useEffect(() => {
    if (!isActive) return;
    
    if (rekognitionState === "idle") {
      setInstructions("Posicione seu rosto no centro do quadro");
      
      const timer = setTimeout(() => {
        setRekognitionState("align");
        setInstructions("Mantenha seu rosto alinhado e imóvel");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    if (rekognitionState === "align") {
      const timer = setTimeout(() => {
        setRekognitionState("complete");
        setInstructions("Verificação concluída! Capturando imagem...");
        startCountdown();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [rekognitionState, isActive]);
  
  // Inicia contagem regressiva para foto
  const startCountdown = () => {
    let count = 3;
    
    const timer = setInterval(() => {
      count -= 1;
      
      if (count <= 0) {
        clearInterval(timer);
        captureImageForRekognition();
      }
    }, 1000);
  };
  
  // Captura a imagem após as instruções de rekognition
  const captureImageForRekognition = () => {
    const video = document.querySelector('video');
    if (!video) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      onCapture(imageData);
    }
  };
  
  return (
    <div className="bg-primary text-white p-3 rounded-md mb-4 text-center font-medium">
      {instructions}
    </div>
  );
};

export default RekognitionInstructions;
