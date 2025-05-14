
import React, { useState, useEffect } from "react";
import { Smile, Eye, ScanFace } from "lucide-react";

interface FacialLivenessInstructionsProps {
  onCapture: (imageData: string) => void;
  isActive: boolean;
}

const FacialLivenessInstructions: React.FC<FacialLivenessInstructionsProps> = ({ 
  onCapture, 
  isActive 
}) => {
  const [livenessState, setLivenessState] = useState<"idle" | "smile" | "blink" | "turnHead" | "complete">("idle");
  const [instructions, setInstructions] = useState("Prepare para verificação");
  
  // Sequência de desafio para verificação de vivacidade facial
  useEffect(() => {
    if (!isActive) return;
    
    if (livenessState === "idle") {
      setInstructions("Por favor, olhe diretamente para a câmera");
      
      const timer = setTimeout(() => {
        setLivenessState("smile");
        setInstructions("Agora, sorria para a câmera");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (livenessState === "smile") {
      const timer = setTimeout(() => {
        setLivenessState("blink");
        setInstructions("Pisque algumas vezes");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (livenessState === "blink") {
      const timer = setTimeout(() => {
        setLivenessState("turnHead");
        setInstructions("Vire a cabeça levemente para a direita e esquerda");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (livenessState === "turnHead") {
      const timer = setTimeout(() => {
        setLivenessState("complete");
        setInstructions("Verificação concluída! Capturando imagem...");
        startCountdown();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [livenessState, isActive]);
  
  // Inicia contagem regressiva para foto
  const startCountdown = () => {
    let count = 3;
    
    const timer = setInterval(() => {
      count -= 1;
      
      if (count <= 0) {
        clearInterval(timer);
        captureImageForLiveness();
      }
    }, 1000);
  };
  
  // Captura a imagem após as instruções de liveness
  const captureImageForLiveness = () => {
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

export default FacialLivenessInstructions;
