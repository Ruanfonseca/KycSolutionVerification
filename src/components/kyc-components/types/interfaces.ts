import { Theme } from "@aws-amplify/ui-react";
import { LivenessDisplayText } from "node_modules/@aws-amplify/ui-react-liveness/dist/types/components/FaceLivenessDetector/displayText";

export const faceLesstheme: Theme = {
  name: "Face Liveness Example Theme",
  tokens: {
    components: {
      liveness: {
        cameraModule: { backgroundColor: "hsl(var(--background))" },
      },
    },
    colors: {
      primary: {
        "10": "#000000",
        "20": "#111111",
        "40": "#222222",
        "60": "#333333",
        "80": "#444444",
        "90": "#555555",
        "100": "#666666",
      },
    },
  },
};


export const defaultErrorDisplayText = {
  timeoutHeaderText: "Tempo esgotado",
  timeoutMessageText:
    "O rosto não se encaixou dentro da oval no limite de tempo. Tente novamente e preencha completamente a oval com o rosto.",
  faceDistanceHeaderText: "Movimento para frente detectado",
  faceDistanceMessageText: "Evite se aproximar ao conectar.",
  multipleFacesHeaderText: "Múltiplos rostos detectados",
  multipleFacesMessageText:
    "Certifique-se de que apenas um rosto esteja presente em frente à câmera ao conectar.",
  clientHeaderText: "Erro do cliente",
  clientMessageText: "Falha na verificação devido a problema no cliente",
  serverHeaderText: "Problema no servidor",
  serverMessageText:
    "Não é possível concluir a verificação devido a problema no servidor",
  landscapeHeaderText: "Orientação paisagem não suportada",
  landscapeMessageText:
    "Gire seu dispositivo para a orientação retrato (vertical).",
  portraitMessageText:
    "Certifique-se de que seu dispositivo permaneça na orientação retrato (vertical) durante a verificação.",
  tryAgainText: "Tentar novamente",
};

export type ErrorDisplayTextFoo = typeof defaultErrorDisplayText;
export type ErrorDisplayText = Partial<ErrorDisplayTextFoo>;

export const defaultLivenessDisplayText: LivenessDisplayText = {
  cameraMinSpecificationsHeadingText: "Câmera não atende às especificações mínimas",
  cameraMinSpecificationsMessageText:
    "A câmera deve suportar pelo menos 320*240 de resolução e 15 quadros por segundo.",
  cameraNotFoundHeadingText: "Câmera não está acessível.",
  cameraNotFoundMessageText:
    "Verifique se uma câmera está conectada e se não há outra aplicação usando a câmera. Talvez seja necessário acessar as configurações para conceder permissões de câmera e fechar todas as instâncias do navegador e tentar novamente.",
  a11yVideoLabelText: "Webcam para verificação de autenticidade",
  cancelLivenessCheckText: "Cancelar verificação de autenticidade",
  goodFitCaptionText: "Encaixe bom",
  goodFitAltText: "Ilustração do rosto de uma pessoa, encaixando perfeitamente dentro de uma oval.",
  hintCenterFaceText: "Centralize o seu rosto",
  hintMoveFaceFrontOfCameraText: "Mova o rosto diante da câmera",
  hintTooManyFacesText: "Certifique-se de que apenas um rosto esteja na frente da câmera",
  hintFaceDetectedText: "Rosto detectado",
  hintCanNotIdentifyText: "Mova o rosto diante da câmera",
  hintTooCloseText: "Afaste-se",
  hintTooFarText: "Aproxime-se",
  hintConnectingText: "Conectando...",
  hintVerifyingText: "Verificando...",
  hintIlluminationTooBrightText: "Mova-se para uma área mais escura",
  hintIlluminationTooDarkText: "Mova-se para uma área mais iluminada",
  hintIlluminationNormalText: "Condições de iluminação normais",
  hintHoldFaceForFreshnessText: "Permaneça imóvel",
  photosensitivityWarningBodyText:
    "Esta verificação emite luzes de cores diferentes. Tenha cuidado se você for fotossensível.",
  photosensitivityWarningHeadingText: "Aviso de fotossensibilidade",
  photosensitivityWarningInfoText:
    "Algumas pessoas podem ter convulsões epilépticas quando expostas a luzes coloridas. Tenha cuidado se você, ou alguém de sua família, tiver condição epiléptica.",
  photosensitivityWarningLabelText: "Mais informações sobre fotossensibilidade",
  retryCameraPermissionsText: "Tentar novamente",
  recordingIndicatorText: "Gravando",
  startScreenBeginCheckText: "Iniciar verificação de vídeo",
  tooFarCaptionText: "Muito longe",
  tooFarAltText:
    "Ilustração do rosto de uma pessoa dentro de uma oval; há um espaço entre o perímetro do rosto e os limites da oval.",
  waitingCameraPermissionText: "Aguardando sua permissão para a câmera.",
  ...defaultErrorDisplayText,
};

