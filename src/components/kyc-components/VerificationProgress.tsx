
import React from "react";

interface VerificationProgressProps {
  currentStep: number;
  faceLiveness: boolean;
}

const VerificationProgress: React.FC<VerificationProgressProps> = ({ currentStep, faceLiveness }) => {
  const steps = [
    { id: 0, name: "Início" },
    { id: 1, name: faceLiveness ? "Verificação Facial" : "Dados Pessoais" },
    { id: 2, name: "Documento" },
    { id: 3, name: "Processando" },
    { id: 4, name: "Resultado" }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col items-center ${step.id <= currentStep ? "text-primary" : "text-gray-400"}`}
          >
            <div className={`relative flex h-6 w-6 items-center justify-center rounded-full border ${step.id <= currentStep ? "border-primary bg-primary" : "border-gray-300 bg-white"}`}>
              <span className={`text-xs ${step.id <= currentStep ? "text-white" : "text-gray-500"}`}>
                {step.id + 1}
              </span>
            </div>
            <span className="text-xs mt-1 hidden sm:block">{step.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4">
        {steps.slice(0, -1).map((step, i) => (
          <div 
            key={step.id} 
            className={`h-1 ${step.id < currentStep ? "bg-primary" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VerificationProgress;
