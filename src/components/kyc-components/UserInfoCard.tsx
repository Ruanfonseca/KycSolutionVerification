import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { UserData } from "@/types/kyc";

interface UserInfoCardProps {
  userData: UserData;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userData }) => {
  return (
    <Card className="mb-6">
      <Accordion type="single" collapsible defaultValue="personal-info">
        <AccordionItem value="personal-info">
          <AccordionTrigger className="bg-primary/5 px-4 py-3 text-left text-lg font-semibold rounded-t-md hover:no-underline">
            Informações Pessoais
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="pt-4">
              <div className="grid gap-2">
                <div>
                  <p className="font-medium">Nome completo:</p>
                  <p className="text-muted-foreground">{userData.fullName}</p>
                </div>
                <div>
                  <p className="font-medium">CPF:</p>
                  <p className="text-muted-foreground">{userData.cpf}</p>
                </div>
                <div>
                  <p className="font-medium">Data de nascimento:</p>
                  <p className="text-muted-foreground">{userData.birthDate}</p>
                </div>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default UserInfoCard;
