
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PrivacyTermsProps {
  accepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
}

const PrivacyTerms: React.FC<PrivacyTermsProps> = ({ accepted, onAcceptChange }) => {
  return (
    <div className="flex items-start space-x-2 mt-4 pb-2">
      <Checkbox 
        id="terms" 
        checked={accepted} 
        onCheckedChange={(checked) => onAcceptChange(checked as boolean)} 
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceito os{" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-primary underline">
                termos de privacidade
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Termos de Privacidade</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto text-sm">
                <p>Ao utilizar este serviço de verificação KYC (Conheça seu Cliente), você concorda com os seguintes termos:</p>
                
                <h3 className="font-semibold">1. Coleta de Dados</h3>
                <p>Coletamos informações pessoais como nome completo, CPF, data de nascimento e imagens do seu documento e face para fins de verificação de identidade.</p>
                
                <h3 className="font-semibold">2. Uso dos Dados</h3>
                <p>Os dados coletados serão utilizados exclusivamente para:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Verificar sua identidade</li>
                  <li>Prevenir fraudes</li>
                  <li>Cumprir com obrigações legais</li>
                </ul>
                
                <h3 className="font-semibold">3. Armazenamento</h3>
                <p>Seus dados são armazenados de forma segura e criptografada, seguindo os padrões de segurança da indústria.</p>
                
                <h3 className="font-semibold">4. Compartilhamento</h3>
                <p>Podemos compartilhar seus dados com:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Serviços de verificação de terceiros (como Regula Forensics)</li>
                  <li>Autoridades públicas quando legalmente exigido</li>
                </ul>
                
                <h3 className="font-semibold">5. Seus Direitos</h3>
                <p>Você tem direito a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Acessar seus dados pessoais</li>
                  <li>Solicitar correções</li>
                  <li>Solicitar exclusão (sujeito a obrigações legais)</li>
                </ul>
                
                <p className="text-muted-foreground mt-4">Última atualização: 29 de abril de 2025</p>
              </div>
            </DialogContent>
          </Dialog>
        </Label>
        <p className="text-sm text-muted-foreground">
          Entendo que meus documentos e dados serão verificados por serviços especializados.
        </p>
      </div>
    </div>
  );
};

export default PrivacyTerms;
