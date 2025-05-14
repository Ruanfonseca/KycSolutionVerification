import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserData } from "@/context/UserDataContext";

const DocumentVerificationForm: React.FC<{
  isLoading: boolean;
  onImageCapture: (imageData: string, side: "front" | "back") => void;
  onStepChange: (step: number) => void;
  onVerify:()=>void;
}> = ({ isLoading,onVerify, onImageCapture,onStepChange}) => {

  const { userData, setUserData } = useUserData();

  const [previewImages, setPreviewImages] = useState<{ front: string | null; back: string | null }>({
    front: typeof userData.front === "string" ? userData.front : null,
    back: typeof userData.back === "string" ? userData.back : null,
  });

  const [selectedFiles, setSelectedFiles] = useState<{ front: File | null; back: File | null }>({
    front: null,
    back: null,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectURL = URL.createObjectURL(file);
        setPreviewImages((prev) => ({ ...prev, [side]: objectURL }));
        setSelectedFiles((prev) => ({ ...prev, [side]: file }));
      };


  const handleRemoveImage = (side: "front" | "back") => {
    setPreviewImages((prev) => ({
      ...prev,
      [side]: null,
    }));
  };

  const handleVerify = async () => {
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  try {
    const frontBase64 = selectedFiles.front ? await toBase64(selectedFiles.front) : null;
    const backBase64 = selectedFiles.back ? await toBase64(selectedFiles.back) : null;

    setUserData({ front: frontBase64, back: backBase64 });
    onVerify();
  } catch (error) {
    console.error("Erro ao converter arquivos para base64:", error);
  }
};

  return (
    <div className="space-y-4">
      {/* Frente */}
      <div>
        <Label htmlFor="front-document" className="block font-medium mb-2">
          Frente do documento
        </Label>
        <div className="flex flex-col space-y-2">
          <input
            id="front-document"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "front")}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
          />
          {previewImages.front && (
              <div className="relative mt-2 border rounded-md overflow-hidden">
                <img
                  src={previewImages.front}
                  alt="Frente do documento"
                  className="w-full h-auto max-h-48 object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 text-white bg-black/50 hover:bg-black/70"
                  onClick={() => handleRemoveImage("front")}
                >
                  ✕
                </Button>
              </div>
            )}

        </div>
      </div>

      {/* Verso */}
      <div>
        <Label htmlFor="back-document" className="block font-medium mb-2">
          Verso do documento
        </Label>
        <div className="flex flex-col space-y-2">
          <input
            id="back-document"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "back")}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
          />
            {previewImages.back && (
              <div className="relative mt-2 border rounded-md overflow-hidden">
                <img
                  src={previewImages.back}
                  alt="Frente do documento"
                  className="w-full h-auto max-h-48 object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 text-white bg-black/50 hover:bg-black/70"
                  onClick={() => handleRemoveImage("back")}
                >
                  ✕
                </Button>
              </div>
            )}

        </div>
      </div>

      {/* Termos */}
      <div className="flex items-start space-x-2 pt-4">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          Eu concordo com os{" "}
          <span
            className="underline cursor-pointer text-primary"
            onClick={() => setShowDialog(true)}
          >
            termos de privacidade e de verificação de identidade
          </span>
        </Label>
      </div>

      {/* Botão */}
      <Button
        onClick={handleVerify}
        disabled={!selectedFiles.front || !selectedFiles.back || !termsAccepted || isLoading}
        className="w-full mt-4"
      >
        {isLoading ? "Processando..." : "Verificar identidade"}
      </Button>

      {/* Dialog LGPD */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Termos de Privacidade - LGPD</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Ao prosseguir, você autoriza o uso dos seus dados pessoais e imagens exclusivamente
              para fins de verificação de identidade, conforme previsto na Lei Geral de Proteção de Dados (LGPD).
            </p>
            <p>
              Seus dados não serão compartilhados com terceiros sem o seu consentimento e serão
              armazenados de forma segura.
            </p>
            <p>
              Você pode solicitar a exclusão dos seus dados a qualquer momento conforme o artigo 18 da LGPD.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentVerificationForm;
