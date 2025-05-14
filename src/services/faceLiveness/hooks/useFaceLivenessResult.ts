import { useMutation } from "@tanstack/react-query";
import { faceLivenessService } from "..";
import { AxiosResponse, isAxiosError } from "axios";
import { ErrorResponse } from "@/lib/axios";
import { toast } from "sonner";

export const useFaceLivenessResult = () => {
  return useMutation({
    mutationKey: ["fetchFaceLivenessResult"],
    mutationFn: async (sessionId: string) => {
      return await faceLivenessService.getFaceLivenessResult(sessionId);
    },
    onError: (err: AxiosResponse<ErrorResponse>) => {
      if (isAxiosError(err) && err.response) {
        return toast.error(err.response.data.message);
      }
      toast.error(err.data.message);
    },
  });
};
