import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@aws-amplify/ui-react/styles.css";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import ProcessingVerification from "@/components/kyc-components/ProcessingVerification";
import UserInfoCard from "@/components/kyc-components/UserInfoCard";
import VerificationResult from "@/components/kyc-components/VerificationResult";
import {
 
  KycVerificationContainerProps,
  ResponseWebService,

} from "@/types/kyc";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFaceLivenessSessionId } from "@/services/faceLiveness/hooks/useFaceLivenessSessionId";
import { useFaceLivenessResult } from "@/services/faceLiveness/hooks/useFaceLivenessResult";
import { Loader, ThemeProvider } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { toast } from "sonner";
import "@aws-amplify/ui-react/styles.css";
import { verifyindatabase } from "@/services/api";
import DocumentVerificationForm from "./DocumentVerificationForm";
import {  defaultLivenessDisplayText, faceLesstheme } from "./types/interfaces";
import { useUserData } from "@/context/UserDataContext";

const KycVerificationContainer: React.FC<KycVerificationContainerProps> = ({
  step,
  isLoading,
  onStepChange,
  onImageCapture,
  onRetry
}) => {
  const [startDetection, setStartDetection] = useState(false);
  const { data: sessionId, isLoading: loadingSession } = useFaceLivenessSessionId(startDetection);
  const [responseWebService, setResponseWebService] = useState<ResponseWebService>({} as ResponseWebService);
  const mutation = useFaceLivenessResult();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userData, setUserData, resetUserData } = useUserData();
  const [buttonText, setButtonText] = useState("Iniciar Verificação Facial");
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [stepSelected, setStepSelected] = useState<Number>()

  useEffect(() => {
    if (sessionId && step === 1) setDialogOpen(true);
  }, [sessionId, step]);

 
   useEffect(() => {
      if (userData?.pepApproved === true || userData?.pepApproved === null) {
        onStepChange(stepSelected);
      }
    }, [userData])


      const handleClose = () => {
        setDialogOpen(false);
        setStartDetection(false);
      };
    
    const handleAnalysisComplete = async () => {
      if (step !== 1) return;

      const result = await mutation.mutateAsync(sessionId!);
      const confidence = Number(result.Confidence?.toFixed(2));
      const minConfidence = Number(import.meta.env.VITE_FACELIVENESS_CONFIDENCE || 85);

      if (confidence < minConfidence) {
        toast.error(`Confiança insuficiente (${confidence}%). Tente novamente.`);
        handleClose();
        return;
      }

      try {
        const video = document.querySelector("video");
        if (video) {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

          const base64Image = canvas.toDataURL("image/jpeg", 0.95);
          setUserData({ referenceImg: base64Image });

          const byteString = atob(base64Image.split(',')[1]);
          const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const file = new File([blob], "captured.jpg", { type: mimeString });

          const response = await verifyindatabase({
            cpf: userData.cpf,
            referenceImage: file,
            userName:userData.cpf
          });

          //se não existir no banco de dados ("Não existe no banco")
          if (response.error == true || !response.data.approved) {
             setStepSelected(2);
   
          } //Existe no banco
          else if (response.error == false || response.data.approved) {
            setUserData({ 
              pepApproved:response.data.approved,
              pepMessage:response.data.message,
              pepFunctions:response.data.functions
            });
            setStepSelected(4);

          }else if(response.data.approved == null){
            
              setUserData({ 
              pepApproved:response.data.approved,
              pepMessage:response.data.message,
              pepFunctions:response.data.functions
            });
            setStepSelected(4);
          }
        }

      } catch (error) {
        console.error("Erro ao capturar imagem:", error);
        toast.error("Erro ao capturar imagem.");
      } finally {
        handleClose();
      }
    };

  
  
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
          return (
            <>
                  {!startDetection && (
                    <Card>
                      <CardHeader className="bg-primary/5">
                        <CardTitle>Verificação Facial</CardTitle>
                        <CardDescription>
                          Clique abaixo para iniciar a verificação de prova de vida.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 flex justify-center">
                       <Button
                            disabled={buttonDisabled}
                            onClick={() => {
                              setButtonText("Aguardando servidor...");
                              setButtonDisabled(true);
                              setTimeout(() => {
                                setStartDetection(true);
                                setButtonText("Iniciar Verificação Facial");
                                setButtonDisabled(false);
                              }, 3000);
                            }}
                          >
                            {buttonText}
                          </Button>


                      </CardContent>
                    </Card>
                  )}

                     {startDetection && dialogOpen && (
                            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-x-hidden overflow-y-auto px-4 sm:px-6 md:px-8">
                              <Card className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] mx-auto p-4 sm:p-6 md:p-8 shadow-xl rounded-2xl">
                                <CardContent className="p-0">
                                  {loadingSession ? (
                                    <Loader className="w-20 mx-auto" />
                                  ) : (
                                    <ThemeProvider theme={faceLesstheme}>
                                      <FaceLivenessDetector
                                        displayText={defaultLivenessDisplayText}
                                        sessionId={sessionId}
                                        disableStartScreen={true}
                                        region="us-east-1"
                                        onAnalysisComplete={handleAnalysisComplete}
                                        onUserCancel={handleClose}
                                        onError={(err) => {
                                          console.error("Erro no detector:", err);
                                          toast.error("Erro na verificação facial");
                                          handleClose();
                                        }}
                                      />
                                    </ThemeProvider>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                      )}
                    </>
                  );

                case 2:
                  const handleDocumentVerify = () => {
                    onStepChange(4);
                  };

                  return (
                    <Card>
                      <CardHeader className="bg-primary/5">
                        <CardTitle>Verificação de Identidade</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                      <DocumentVerificationForm 
                            isLoading={isLoading} 
                            onImageCapture={(imageData, side) => {
                              if (side === "front" || side === "back") {
                                onImageCapture(imageData);
                              }
                            }} 
                            onVerify={handleDocumentVerify}
                            onStepChange={onStepChange}
                          />


                      </CardContent>
                      
                    </Card>
                  );

  
          case 3:
              return (
                <>
                  <UserInfoCard userData={userData} />
                  <ProcessingVerification
                    userData={userData}
                    onStepChange={onStepChange}
                    setResponseWebService={setResponseWebService}
                  />

                </>
              );
    
            case 4:
                return (
                  <>
                    <VerificationResult
                      finished={true}
                      originUrl={userData.fatherUrl}
                      onClose={handleClose} 
                    />
                  </>
                );

            
    
          default:
            return null;
        }
  };

  return (
    <div className="max-w-md mx-auto relative min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
  
};

export default KycVerificationContainer;
