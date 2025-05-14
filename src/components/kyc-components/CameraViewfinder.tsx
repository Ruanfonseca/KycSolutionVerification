
import React from "react";

interface CameraViewfinderProps {
  rekognition?: boolean;
}

const CameraViewfinder: React.FC<CameraViewfinderProps> = ({ rekognition }) => {
  return (
    <>
      {/* Guia de contorno facial */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <div className="border-2 border-kyc-accent rounded-full w-64 h-64 relative">
            {/* Ponto central */}
            <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-kyc-accent -translate-x-1/2 -translate-y-1/2" />
            
            {/* Guias dos quatro cantos */}
            <div className="absolute left-0 top-0 w-4 h-4 border-l-2 border-t-2 border-kyc-accent rounded-tl-lg" />
            <div className="absolute right-0 top-0 w-4 h-4 border-r-2 border-t-2 border-kyc-accent rounded-tr-lg" />
            <div className="absolute left-0 bottom-0 w-4 h-4 border-l-2 border-b-2 border-kyc-accent rounded-bl-lg" />
            <div className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-kyc-accent rounded-br-lg" />
          </div>
        </div>
      </div>
      
      {rekognition && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full flex items-center justify-center">
            {/* Guias adicionais para rekognition */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-kyc-accent px-4 py-1 rounded-md text-white text-sm">
              Posicione seu rosto
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CameraViewfinder;
