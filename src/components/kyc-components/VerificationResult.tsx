import React, { useEffect, useState, useRef } from "react";
import { ResponseWebService } from "@/types/kyc";
import gif from "@/assets/Confirmed.gif";
import { registerUser } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useUserData } from "@/context/UserDataContext";

interface VerificationResultProps {
  finished?: boolean;
  originUrl: string;
  onClose: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  finished,
  originUrl,
  onClose,
}) => {
  const [response, setResponse] = useState<Boolean>({} as Boolean);
  const { userData, setUserData } = useUserData();

  const sendOnce = useRef(false);
  const approveOnce = useRef(false);
  const pepOnce = useRef(false);

  // Se não existir no banco, crie um registro (executa uma vez)
  useEffect(() => {
    if (!userData.pepApproved && !sendOnce.current) {
      sendOnce.current = true;
      const sendData = async () => {
        try {
          const result = await registerUser(userData);
          setResponse(result);
          setUserData({
            pepApproved: result.approved,
            pepMessage: result.message,
            pepFunctions: result.functions,
          });
        } catch (error) {
          console.error("Erro ao registrar usuário:", error);
        }
      };
      sendData();
    }
  }, [userData]);

  
  useEffect(() => {
    if (userData.pepApproved && !approveOnce.current) {
      approveOnce.current = true;
      setResponse(true);
    }
  }, [userData.pepApproved]);

  
  useEffect(() => {
    if (userData.pepApproved === null && !pepOnce.current) {
      pepOnce.current = true;
      setResponse(true);
    }
  }, [userData.pepApproved]);

  const sendInformation = () => {
    window.parent.postMessage(
      {
        status: `${userData.pepApproved}`,
        message: `${userData.pepMessage}`,
        functions: `${userData.pepFunctions}`,
      },
      new URL(originUrl.toString()).origin
    );
    onClose();
  };

  if (!finished) return null;

  if (!response) {
    return (
      <Card>
        <CardHeader className="bg-primary/5">
          <CardTitle>Registrando Dados</CardTitle>
        </CardHeader>
        <CardContent className="py-10">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            </div>
            <p className="mt-6 text-center text-gray-600">
              Estamos finalizando sua verificação. Por favor, aguarde...
            </p>
            <ul className="mt-4 text-sm text-gray-500 space-y-2 max-w-md mx-auto">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Registrando seus dados com segurança</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Confirmando identidade facial</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Preparando os próximos passos</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-white rounded-2xl shadow-md relative">
      <img
        src={gif}
        alt="Verificação concluída"
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="text-xl font-semibold text-gray-700 text-center mb-6">
        Verificação concluída com sucesso!
      </p>

      <button
        onClick={sendInformation}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Retornar
      </button>
    </div>
  );
};

export default VerificationResult;
