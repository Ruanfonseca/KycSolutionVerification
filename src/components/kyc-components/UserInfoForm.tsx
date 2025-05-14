
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PrivacyTerms from "@/components/kyc-components/PrivacyTerms";
import { UserData } from "@/types/kyc";
import { validateUserData } from "@/utils/validations";

interface UserInfoFormProps {
  userData: UserData;
  termsAccepted: boolean;
  onUserDataChange: (data: UserData) => void;
  onTermsAcceptedChange: (accepted: boolean) => void;
  onContinue: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  userData,
  termsAccepted,
  onUserDataChange,
  onTermsAcceptedChange,
  onContinue,
}) => {
  const { toast } = useToast();

  const handleContinue = () => {
    if (validateUserData(userData)) {
      if (!termsAccepted) {
        toast({
          title: "Termos de privacidade",
          description: "Você precisa aceitar os termos de privacidade para continuar.",
          variant: "destructive"
        });
        return;
      }
      onContinue();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          placeholder="Digite seu nome completo"
          value={userData.fullName}
          onChange={(e) => onUserDataChange({ ...userData, fullName: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          CPF
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-input px-3 py-2"
          placeholder="000.000.000-00"
          value={userData.cpf}
          onChange={(e) => onUserDataChange({ ...userData, cpf: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Data de Nascimento
        </label>
        <input
          type="date"
          className="w-full rounded-md border border-input px-3 py-2"
          placeholder="DD/MM/AAAA"
          value={userData.birthDate}
          onChange={(e) => onUserDataChange({ ...userData, birthDate: e.target.value })}
        />
      </div>
      
      <PrivacyTerms 
        accepted={termsAccepted} 
        onAcceptChange={onTermsAcceptedChange}
      />
      
      <Button 
        className="w-full mt-2"
        onClick={handleContinue}
      >
        Continuar
      </Button>
    </div>
  );
};

export default UserInfoForm;
