import { GetFaceLivenessSessionResultsCommandOutput } from "@aws-sdk/client-rekognition";
import axios from "axios";

class FaceLivenessService {
  async getFaceLivenessSessionId(): Promise<string> {
    const { data } = await axios.get<{ sessionId: string }>(
      "https://q0v41cucni.execute-api.sa-east-1.amazonaws.com/dev/liveness-session"
    );
    return data.sessionId;
  }

  async getFaceLivenessResult(
    sessionId: string
  ): Promise<GetFaceLivenessSessionResultsCommandOutput> {
    const response = await axios.get(
      `https://q0v41cucni.execute-api.sa-east-1.amazonaws.com/dev/liveness-result?sessionId=${sessionId}`
    );
    const result: GetFaceLivenessSessionResultsCommandOutput = response.data;

    return result;
  }
}

export const faceLivenessService = new FaceLivenessService();
