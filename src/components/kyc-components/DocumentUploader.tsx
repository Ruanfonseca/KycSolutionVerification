
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DocumentOptions from "@/components/kyc-components/DocumentOptions";
import { Upload, Camera, Smartphone } from "lucide-react";

interface DocumentUploaderProps {
  onImageSelected: (imageData: string) => void;
  documentType: "cnh" | "document";
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onImageSelected, documentType }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"options" | "upload" | "camera" | "mobile">("options");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        onImageSelected(result);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOptionSelected = (option: "mobile" | "camera" | "upload") => {
    if (option === "upload") {
      setUploadMethod("upload");
      setTimeout(() => {
        triggerFileInput();
      }, 100);
    } else if (option === "camera") {
      setUploadMethod("camera");
    } else if (option === "mobile") {
      setUploadMethod("mobile");
      // Aqui poderia implementar a lógica para gerar um QR code ou link para o celular
    }
  };
  
  const renderUploadContent = () => {
    if (uploadMethod === "options") {
      return <DocumentOptions onOptionSelected={handleOptionSelected} />;
    }

    if (uploadMethod === "mobile") {
      return (
        <div className="text-center py-10">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Usar seu celular
          </h3>
          <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center mb-4">
            <p className="text-xs text-gray-500">QR Code aqui</p>
          </div>
          <p className="text-sm text-gray-500">
            Escaneie o código QR com seu smartphone para continuar o processo
          </p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => setUploadMethod("options")}
          >
            Voltar às opções
          </Button>
        </div>
      );
    }

    if (uploadMethod === "camera") {
      return (
        <div className="text-center py-10">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Usar câmera do dispositivo
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Permita o acesso à câmera para capturar a imagem do seu documento
          </p>
          <div className="bg-gray-200 w-full h-48 mb-4 flex items-center justify-center">
            <p className="text-gray-500">Preview da câmera</p>
          </div>
          <div className="flex space-x-2 justify-center">
            <Button variant="outline" onClick={() => setUploadMethod("options")}>
              Voltar
            </Button>
            <Button>Capturar</Button>
          </div>
        </div>
      );
    }

    return (
      <>
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Documento selecionado" 
            className="max-w-full h-auto max-h-64 mb-3" 
          />
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">
              {documentType === "cnh" 
                ? "Enviar CNH Digital" 
                : "Enviar documento com foto"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Clique para selecionar uma imagem nos formatos JPG, JPEG ou PNG
            </p>
          </div>
        )}
        
        <div className="mt-4 flex space-x-2">
          {!previewUrl && (
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => setUploadMethod("options")}
            >
              Voltar
            </Button>
          )}
          <Button 
            onClick={triggerFileInput}
            variant={previewUrl ? "outline" : "default"}
            className={previewUrl ? "flex-1" : "flex-1"}
          >
            {previewUrl ? "Trocar imagem" : "Selecionar arquivo"}
          </Button>
        </div>
      </>
    );
  };
  
  return (
    <div className="mb-4">
      <Card className={`border-dashed border-2 hover:bg-gray-50 transition-colors ${uploadMethod !== "options" ? "cursor-pointer" : ""}`}>
        <CardContent className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          {renderUploadContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploader;
