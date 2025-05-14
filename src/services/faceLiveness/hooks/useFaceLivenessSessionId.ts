import { useQuery } from "@tanstack/react-query";
import { faceLivenessService } from "..";
import { AxiosResponse, isAxiosError } from "axios";
import { ErrorResponse } from "@/lib/axios";
import { toast } from "sonner";

export const useFaceLivenessSessionId = (enabled: unknown) => {
  return useQuery({
    queryKey: ["fetchFaceLivenessSessionId", enabled],
    queryFn: async () => {
      const res = await faceLivenessService.getFaceLivenessSessionId();
      return res;
    },
    throwOnError: (err: AxiosResponse<ErrorResponse>) => {
      if (isAxiosError(err) && err.response) {
        toast.error(err.response.data.message);
        return false;
      }
      toast.error(err.data.message);
      return false;
    },
    refetchOnWindowFocus: false,
    enabled: !!enabled
  });
};
