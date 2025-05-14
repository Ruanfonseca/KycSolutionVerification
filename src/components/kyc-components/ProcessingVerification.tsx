import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { verifyFacialLivenessMock } from "@/services/api";
import { ResponseWebService, UserData } from "@/types/kyc";

interface ProcessingVerificationProps {
  userData: UserData;
  onStepChange: (step: number) => void;
  setResponseWebService: (response: ResponseWebService) => void;
}


const ProcessingVerification: React.FC<ProcessingVerificationProps> = ({
  userData,
  onStepChange,
  setResponseWebService
}) => {
  useEffect(() => {
    const processVerification = async () => {
      try {
        
        const result = await verifyFacialLivenessMock(userData);

        setResponseWebService(result);

        if (result.approved) {
          onStepChange(4);
        } else {
          onStepChange(2); 
        }
        
      } catch (error) {
        console.error("Erro na verificação facial:", error);
        onStepChange(2); 
      }
    };

    processVerification();
  }, [userData, onStepChange, setResponseWebService]);

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle>Processando Verificação</CardTitle>
      </CardHeader>
      <CardContent className="py-10">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Estamos processando sua verificação. Por favor, aguarde um momento...
          </p>
          <ul className="mt-4 text-sm text-gray-500 space-y-2 max-w-md mx-auto">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>Analisando documentação</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>Verificando biometria facial</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>Realizando consultas PEP</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingVerification;
