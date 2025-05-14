import React, { useState, useEffect } from "react";
import { useUserData } from "@/context/UserDataContext";
import { isValidCpf, isValidDate, isValidFullName, isValidUrl, parseURLParams } from "@/utils/formatters";
import VerificationProgress from "@/components/kyc-components/VerificationProgress";
import KycVerificationContainer from "@/components/kyc-components/KycVerificationContainer";
import { Progress } from "@/components/ui/progress";
import UserInfoCard from "@/components/kyc-components/UserInfoCard";
import ErrorScreen from "@/components/kyc-components/ErrorScreen";
import ErrorDialog from "@/components/kyc-components/ErrorScreen";

const Index = () => {
  const { userData, setUserData, resetUserData } = useUserData();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 1. Inicia carregamento e simula progresso
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((old) => {
      if (old >= 100) {
        clearInterval(interval);
        return 100;
      }
      return old + 5;
    });
  }, 150);

  return () => clearInterval(interval);
}, []);


 useEffect(() => {
    resetUserData();

      const params = parseURLParams();

      const fullName = decodeURIComponent(params.name || "");
        const cpf = decodeURIComponent(params.cpf || "");
        const birthDate = decodeURIComponent(params.birthDate || "");
        const fatherUrl = decodeURIComponent(params.fatherUrl || "");

        const isValid =
          isValidFullName(fullName) &&
          isValidCpf(cpf) &&
          isValidDate(birthDate) &&
          isValidUrl(fatherUrl);

        if (isValid) {
          setUserData({
            fullName,
            cpf,
            birthDate,
            fatherUrl,
          });
        } else {
          setError("Os dados fornecidos são inválidos. Verifique as informações e tente novamente.");
          setShowError(true);
        }

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);


 useEffect(() => {
    const allUserDataLoaded =
      userData.fullName && userData.cpf && userData.birthDate && userData.fatherUrl;

    if (progress === 100 && allUserDataLoaded) {
      const timeout = setTimeout(() => {
        setIsReady(true);
        setStep(1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);


 return (
  <div className="min-h-screen bg-kyc-background p-4 sm:p-6">
    {error && (
      <ErrorDialog
        message={error}
        title="Erro de Validação"
        errorType="generic"
        open={showError}
        onClose={() => setShowError(false)}
      />
    )}

    {!isReady ? (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-lg font-medium text-muted-foreground">
          Preparando ambiente de verificação...
        </h2>
        <Progress value={progress} className="w-1/2 max-w-sm" />
      </div>
    ) : (
      <>
        <VerificationProgress currentStep={step} faceLiveness />
        <UserInfoCard userData={userData} />
        <KycVerificationContainer step={step} onStepChange={setStep} />
      </>
    )}
  </div>
)

};

export default Index;
